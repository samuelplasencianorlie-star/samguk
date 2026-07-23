import { NextRequest, NextResponse } from "next/server";
import { checkAdminAccess } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getPaymentMonthKey,
  paymentMonthKeyToDate
} from "@/lib/payment-utils";
import type { MonthlyPaymentStatus, StudentPayment } from "@/lib/admin-types";

export const runtime = "nodejs";

type PaymentPayload = {
  status?: unknown;
  studentId?: unknown;
};

type PaymentRow = {
  id: string;
  paid_at: string | null;
  payment_month: string;
  recorded_by: string | null;
  status: string | null;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function paymentRowToPayment(payment: PaymentRow): StudentPayment {
  return {
    id: payment.id,
    month: payment.payment_month.slice(0, 7),
    paidAt: payment.paid_at ?? "",
    recordedBy: payment.recorded_by ?? "",
    status: payment.status === "Pagado" ? "Pagado" : "Pendiente"
  };
}

async function requireAdmin() {
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;

  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return {
      error: "Supabase no está configurado.",
      status: 503 as const,
      supabase: null,
      user: null
    };
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "No autorizado.", status: 401 as const, supabase, user };
  }

  const { allowed } = await checkAdminAccess(supabase);

  if (!allowed) {
    return { error: "No autorizado.", status: 403 as const, supabase, user };
  }

  return { supabase, user };
}

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

async function getPaymentHistory(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  studentId: string
) {
  const { data, error } = await supabase
    .from("student_monthly_payments")
    .select("id,payment_month,status,paid_at,recorded_by")
    .eq("student_id", studentId)
    .order("payment_month", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as unknown as PaymentRow[]).map(paymentRowToPayment);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if ("error" in auth) {
    return errorResponse(auth.error || "No autorizado.", auth.status);
  }

  const payload = (await request.json().catch(() => ({}))) as PaymentPayload;
  const studentId = text(payload.studentId);
  const status = text(payload.status) as MonthlyPaymentStatus;

  if (!studentId) {
    return errorResponse("No se ha encontrado el alumno.");
  }

  if (status !== "Pagado" && status !== "Pendiente") {
    return errorResponse("Estado de pago no válido.");
  }

  const currentPaymentMonth = getPaymentMonthKey();
  const paymentMonthDate = paymentMonthKeyToDate(currentPaymentMonth);

  const { data: studentExists, error: studentError } = await auth.supabase
    .from("students")
    .select("id")
    .eq("id", studentId)
    .single();

  if (studentError || !studentExists) {
    return errorResponse("No se ha encontrado el alumno.", 404);
  }

  if (status === "Pagado") {
    const { error } = await auth.supabase
      .from("student_monthly_payments")
      .upsert(
        {
          paid_at: new Date().toISOString(),
          payment_month: paymentMonthDate,
          recorded_by: auth.user.id,
          status: "Pagado",
          student_id: studentId
        },
        { onConflict: "student_id,payment_month" }
      );

    if (error) {
      return errorResponse("No se ha podido guardar el pago.", 500);
    }
  } else {
    const { error } = await auth.supabase
      .from("student_monthly_payments")
      .delete()
      .eq("student_id", studentId)
      .eq("payment_month", paymentMonthDate);

    if (error) {
      return errorResponse("No se ha podido actualizar el pago.", 500);
    }
  }

  try {
    const paymentHistory = await getPaymentHistory(auth.supabase, studentId);

    return NextResponse.json({
      currentPaymentMonth,
      paymentHistory,
      paymentStatus: status
    });
  } catch {
    return errorResponse("No se ha podido leer el historial de pagos.", 500);
  }
}
