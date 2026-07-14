import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  ShieldAlert,
  UserPlus,
  UsersRound
} from "lucide-react";
import Link from "next/link";
import { hasCompleteStudentDocumentation } from "@/lib/admin-data";
import {
  buildAdminDashboardStats,
  buildAdminGroupSummaries,
  getAdminCourses,
  getAdminStudents,
  getRegistrationRequests
} from "@/lib/supabase/admin-queries";

export default async function AdminDashboardPage() {
  const [courses, students, registrationRequests] = await Promise.all([
    getAdminCourses(),
    getAdminStudents(),
    getRegistrationRequests()
  ]);

  const adminDashboardStats = buildAdminDashboardStats(
    students,
    registrationRequests
  );
  const adminGroupSummaries = buildAdminGroupSummaries(courses, students);

  const statCards = [
    {
      label: "Alumnos apuntados",
      value: adminDashboardStats.activeStudents,
      text: "Alumnos activos en el club",
      href: "/admin/alumnos",
      icon: UsersRound
    },
    {
      label: "Inscripciones nuevas",
      value: adminDashboardStats.pendingRequests,
      text: "Personas pendientes de revisar",
      href: "/admin/solicitudes",
      icon: ClipboardList
    },
    {
      label: "Pendientes de autorización",
      value: adminDashboardStats.pendingAuthorizations,
      text: "Alumnos con documentos incompletos",
      href: "/admin/documentos",
      icon: ShieldAlert
    },
    {
      label: "Alumnos en prueba",
      value: adminDashboardStats.studentsInTrial,
      text: "Alumnos sin confirmar como activos",
      href: "/admin/alumnos",
      icon: UserPlus
    }
  ];

  const alerts = [
    {
      label: "Sin condiciones aceptadas",
      value: students.filter((student) => !student.condicionesAceptadas).length,
      href: "/admin/documentos"
    },
    {
      label: "Sin autorización de imagen",
      value: students.filter((student) => !student.derechosImagen).length,
      href: "/admin/documentos"
    },
    {
      label: "Documentos pendientes",
      value: students.filter(
        (student) => !hasCompleteStudentDocumentation(student)
      ).length,
      href: "/admin/documentos"
    },
    {
      label: "Sin teléfono de tutor",
      value: students.filter((student) => !student.phone.trim()).length,
      href: "/admin/alumnos"
    },
    {
      label: "Sin grupo asignado",
      value: students.filter((student) => !student.course.trim()).length,
      href: "/admin/alumnos"
    },
    {
      label: "Inscripciones sin revisar",
      value: registrationRequests.filter(
        (request) => request.status === "Pendiente"
      ).length,
      href: "/admin/solicitudes"
    }
  ];

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-[16px] border border-[#D8E0E6] bg-white p-5 shadow-[0_22px_64px_rgba(10,37,64,0.055)] transition-[border-color,box-shadow,transform] hover:-translate-y-1 hover:border-[#C8102E]/26 hover:shadow-[0_28px_80px_rgba(10,37,64,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6] focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-[12px] border border-[#D8E0E6] bg-[#F4F7FA] text-[#C8102E]">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  className="mt-2 text-[#9AA5B1] transition-[color,transform] group-hover:translate-x-1 group-hover:text-[#C8102E]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-7 text-sm font-semibold text-[#687586]">
                {card.label}
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[#0A2540]">
                {card.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#687586]">
                {card.text}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[16px] border border-[#D8E0E6] bg-white p-5 shadow-[0_22px_64px_rgba(10,37,64,0.055)] sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#E1E7ED] pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
                Pendientes importantes
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
                Lo que Leo debe revisar
              </h2>
            </div>
            <AlertTriangle
              size={22}
              strokeWidth={1.8}
              className="mt-1 text-[#E6A500]"
              aria-hidden="true"
            />
          </div>

          <div className="mt-5 grid gap-3">
            {alerts.map((alert) => (
              <Link
                key={alert.label}
                href={alert.href}
                className="group flex items-center justify-between gap-4 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] px-4 py-3 transition-[background-color,border-color] hover:border-[#C8102E]/28 hover:bg-white"
              >
                <span className="text-sm font-semibold text-[#0A2540]">
                  {alert.label}
                </span>
                <span
                  className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-full border px-2 text-sm font-semibold ${
                    alert.value > 0
                      ? "border-[#E6A500]/24 bg-[#FFF7DF] text-[#805A00]"
                      : "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]"
                  }`}
                >
                  {alert.value}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[16px] border border-[#D8E0E6] bg-white p-5 shadow-[0_22px_64px_rgba(10,37,64,0.055)] sm:p-6">
          <div className="flex flex-col gap-4 border-b border-[#E1E7ED] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
                Alumnos por grupo
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
                Organización del alumnado
              </h2>
            </div>
            <Link
              href="/admin/cursos"
              className="inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
            >
              Ver grupos
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {adminGroupSummaries.map((group) => (
              <article
                key={group.id}
                className="rounded-[14px] border border-[#E1E7ED] bg-[#F8FAFB] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#0A2540]">
                      {group.name}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[#687586]">
                      {group.schedule}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#0A2540]">
                    {group.total} alumnos
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                  <span className="rounded-[8px] bg-white px-2 py-2 text-[#1E6E35]">
                    {group.active} activos
                  </span>
                  <span className="rounded-[8px] bg-white px-2 py-2 text-[#174EA6]">
                    {group.trial} prueba
                  </span>
                  <span className="rounded-[8px] bg-white px-2 py-2 text-[#805A00]">
                    {group.pendingDocuments} docs
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
