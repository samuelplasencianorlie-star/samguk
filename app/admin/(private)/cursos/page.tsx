import { ArrowRight, Pencil, UserPlus } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  buildAdminGroupSummaries,
  getAdminCourses,
  getAdminStudents
} from "@/lib/supabase/admin-queries";

export default async function AdminCoursesPage() {
  const [courses, students] = await Promise.all([
    getAdminCourses(),
    getAdminStudents()
  ]);
  const adminGroupSummaries = buildAdminGroupSummaries(courses, students);

  return (
    <div className="grid gap-6">
      <section className="rounded-[14px] border border-[#D8E0E6] bg-white p-5 shadow-[0_22px_64px_rgba(10,37,64,0.055)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#E1E7ED] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
              Alumnos por grupo
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#0A2540]">
              Organización por grupos
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687586]">
              Revisa cuántos alumnos hay en cada grupo y quién tiene documentos
              pendientes.
            </p>
          </div>
          <Link
            href="/admin/alumnos#nuevo-alumno"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#C8102E] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25]"
          >
            <UserPlus size={17} strokeWidth={1.8} aria-hidden="true" />
            Añadir alumno
          </Link>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {adminGroupSummaries.map((group) => (
            <article
              key={group.id}
              className="rounded-[16px] border border-[#D8E0E6] bg-[#F8FAFB] p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
                    {group.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#687586]">
                    {group.schedule}
                  </p>
                </div>
                <div className="rounded-[12px] bg-white px-4 py-3 text-center shadow-[0_14px_34px_rgba(10,37,64,0.05)]">
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-[#0A2540]">
                    {group.total}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#687586]">
                    alumnos
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[12px] bg-white p-3">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[#1E6E35]">
                    {group.active}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#687586]">
                    activos
                  </p>
                </div>
                <div className="rounded-[12px] bg-white p-3">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[#174EA6]">
                    {group.trial}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#687586]">
                    en prueba
                  </p>
                </div>
                <div className="rounded-[12px] bg-white p-3">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[#805A00]">
                    {group.pendingDocuments}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#687586]">
                    documentos pendientes
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[12px] border border-[#E1E7ED] bg-white">
                {group.students.length ? (
                  <div className="divide-y divide-[#E1E7ED]">
                    {group.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-semibold text-[#0A2540]">
                            {student.fullName}
                          </p>
                          <p className="mt-1 text-sm text-[#687586]">
                            {student.guardian} · {student.phone}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge status={student.status} />
                          <StatusBadge
                            status={
                              student.documentationComplete
                                ? "Completo"
                                : "Falta"
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-5 text-sm text-[#687586]">
                    Todavía no hay alumnos en este grupo.
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/admin/alumnos?grupo=${encodeURIComponent(group.name)}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
                >
                  Ver alumnos del grupo
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/admin/alumnos#nuevo-alumno"
                  className="inline-flex min-h-10 items-center gap-2 rounded-[8px] bg-[#0A2540] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#174EA6]"
                >
                  Añadir alumno a este grupo
                  <UserPlus size={15} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="inline-flex min-h-10 items-center gap-2 rounded-[8px] bg-white px-3 text-sm font-semibold text-[#52606E] ring-1 ring-[#D8E0E6] transition-colors hover:text-[#0A2540]"
                >
                  Editar grupo
                  <Pencil size={15} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
