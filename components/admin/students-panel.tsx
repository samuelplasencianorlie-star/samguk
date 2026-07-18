"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Pencil,
  Search,
  UserPlus,
  X
} from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import type {
  AdminCourse,
  DocumentStatus,
  Student,
  StudentStatus
} from "@/lib/admin-types";
import {
  LEGAL_CONSENT_VERSION,
  legalConsentSections
} from "@/lib/legal-consent";

type StudentsPanelProps = {
  initialStudents: Student[];
  courses: AdminCourse[];
};

type StudentFormState = {
  fullName: string;
  age: string;
  birthDate: string;
  guardian: string;
  address: string;
  postalCode: string;
  dniNie: string;
  course: string;
  schedule: string;
  phone: string;
  phone2: string;
  email: string;
  status: StudentStatus;
  enrollmentDate: string;
  condicionesAceptadas: boolean;
  proteccionDatosAceptada: boolean;
  tutorConfirmado: boolean;
  responsabilidadAceptada: boolean;
  derechosImagen: boolean | null;
  fechaAceptacionLegal: string;
  textoLegalVersion: string;
  notes: string;
  acceptanceName: string;
  acceptanceRelation: string;
  presencialConfirmado: boolean;
};

type StudentTab = "Resumen" | "Progreso" | "Asistencia" | "Notas" | "Historial" | "Datos";

const emptyStudentForm: StudentFormState = {
  fullName: "",
  age: "",
  birthDate: "",
  guardian: "",
  address: "",
  postalCode: "",
  dniNie: "",
  course: "",
  schedule: "",
  phone: "",
  phone2: "",
  email: "",
  status: "Pendiente",
  enrollmentDate: "",
  condicionesAceptadas: false,
  proteccionDatosAceptada: false,
  tutorConfirmado: false,
  responsabilidadAceptada: false,
  derechosImagen: null,
  fechaAceptacionLegal: "",
  textoLegalVersion: LEGAL_CONSENT_VERSION,
  notes: "",
  acceptanceName: "",
  acceptanceRelation: "",
  presencialConfirmado: false
};

const studentStatusOptions: StudentStatus[] = [
  "Activo",
  "En prueba",
  "Pendiente",
  "Baja"
];

const studentTabs: StudentTab[] = [
  "Resumen",
  "Progreso",
  "Asistencia",
  "Notas",
  "Historial",
  "Datos"
];

const inputClass =
  "mt-2 min-h-11 w-full rounded-[10px] border border-[#D8E0E6] bg-white px-3 text-sm outline-none transition-colors focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/15";

function hasCompleteDocumentation(student: Student) {
  return (
    student.condicionesAceptadas &&
    student.proteccionDatosAceptada &&
    student.tutorConfirmado &&
    student.responsabilidadAceptada &&
    Boolean(student.fechaAceptacionLegal) &&
    Boolean(student.textoLegalVersion) &&
    student.documentationComplete
  );
}

function conditionsStatus(student: Student): DocumentStatus {
  return student.condicionesAceptadas ? "Aceptadas" : "Pendientes";
}

function imageRightsStatus(student: Student): DocumentStatus {
  if (student.derechosImagen === null) {
    return "Pendiente";
  }

  return student.derechosImagen ? "Autorizado" : "No autorizado";
}

function documentsStatus(student: Student): DocumentStatus {
  if (hasCompleteDocumentation(student)) {
    return "Completo";
  }

  if (
    !student.condicionesAceptadas ||
    !student.proteccionDatosAceptada ||
    !student.tutorConfirmado ||
    !student.responsabilidadAceptada
  ) {
    return "Falta información";
  }

  return "Pendiente";
}

function formatDate(value: string) {
  if (!value) {
    return "Pendiente";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium"
  }).format(new Date(value));
}

function pluralizeStudents(count: number) {
  return count === 1 ? "1 alumno" : `${count} alumnos`;
}

function StatusCell({
  label,
  status
}: {
  label: string;
  status: DocumentStatus | StudentStatus;
}) {
  return (
    <div className="grid gap-1.5 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] p-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7B8794]">
        {label}
      </span>
      <StatusBadge status={status} />
    </div>
  );
}

function EmptySection({ text }: { text: string }) {
  return (
    <div className="rounded-[14px] border border-dashed border-[#CAD4DE] bg-[#F8FAFB] p-5 text-sm leading-6 text-[#687586]">
      {text}
    </div>
  );
}

export function StudentsPanel({ initialStudents, courses }: StudentsPanelProps) {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("Todos");
  const [isGroupsOpen, setIsGroupsOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<StudentTab>("Resumen");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StudentFormState>(emptyStudentForm);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState("");

  const courseOptions = useMemo(
    () =>
      courses
        .filter((course) => course.id !== "tecnificacion-combate")
        .map((course) => ({
          group: course.ageRange,
          schedule: `${course.days} · ${course.time}`
        })),
    [courses]
  );

  const groupOptions = useMemo(
    () => ["Todos", ...Array.from(new Set(courseOptions.map((course) => course.group)))],
    [courseOptions]
  );

  const groupSummaries = useMemo(
    () =>
      courseOptions.map((course) => {
        const groupStudents = students.filter(
          (student) => student.course === course.group
        );

        return {
          ...course,
          total: groupStudents.length,
          active: groupStudents.filter((student) => student.status === "Activo")
            .length
        };
      }),
    [courseOptions, students]
  );

  const activeGroups = groupSummaries.filter((group) => group.total > 0).length;

  useEffect(() => {
    function openStudentFormFromHash() {
      if (window.location.hash !== "#nuevo-alumno") {
        return;
      }

      const storedRequest = window.sessionStorage.getItem(
        "samguk-registration-to-student"
      );

      if (storedRequest) {
        const request = JSON.parse(storedRequest) as {
          fullName?: string;
          age?: number;
          birthDate?: string;
          guardian?: string;
          address?: string;
          postalCode?: string;
          dniNie?: string;
          phone?: string;
          phone2?: string;
          email?: string;
          message?: string;
          condicionesAceptadas?: boolean;
          proteccionDatosAceptada?: boolean;
          tutorConfirmado?: boolean;
          responsabilidadAceptada?: boolean;
          derechosImagen?: boolean;
          fechaAceptacionLegal?: string;
          textoLegalVersion?: string;
        };

        setForm({
          ...emptyStudentForm,
          fullName: request.fullName ?? "",
          age: request.age ? String(request.age) : "",
          birthDate: request.birthDate ?? "",
          guardian: request.guardian ?? "",
          address: request.address ?? "",
          postalCode: request.postalCode ?? "",
          dniNie: request.dniNie ?? "",
          course: "",
          schedule: "",
          phone: request.phone ?? "",
          phone2: request.phone2 ?? "",
          email: request.email ?? "",
          status: "Pendiente",
          enrollmentDate: new Date().toISOString().slice(0, 10),
          condicionesAceptadas: Boolean(request.condicionesAceptadas),
          proteccionDatosAceptada: Boolean(request.proteccionDatosAceptada),
          tutorConfirmado: Boolean(request.tutorConfirmado),
          responsabilidadAceptada: Boolean(request.responsabilidadAceptada),
          derechosImagen:
            typeof request.derechosImagen === "boolean"
              ? request.derechosImagen
              : null,
          fechaAceptacionLegal: request.fechaAceptacionLegal ?? "",
          textoLegalVersion: request.textoLegalVersion ?? LEGAL_CONSENT_VERSION,
          notes: request.message ?? "",
          acceptanceName: request.guardian || request.fullName || "",
          acceptanceRelation:
            request.age && request.age < 18 ? "Padre, madre o tutor legal" : "",
          presencialConfirmado: false
        });
        window.sessionStorage.removeItem("samguk-registration-to-student");
      } else {
        setForm({
          ...emptyStudentForm,
          enrollmentDate: new Date().toISOString().slice(0, 10)
        });
      }

      setEditingId(null);
      setSelectedStudent(null);
      setIsFormOpen(true);
    }

    const queryParams = new URLSearchParams(window.location.search);
    const group = queryParams.get("grupo");

    if (group && groupOptions.includes(group)) {
      setGroupFilter(group);
    }

    openStudentFormFromHash();
    window.addEventListener("hashchange", openStudentFormFromHash);

    return () =>
      window.removeEventListener("hashchange", openStudentFormFromHash);
  }, [groupOptions]);

  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return students
      .filter((student) => {
        const matchesQuery = normalizedQuery
          ? [student.fullName, student.course, student.status]
              .join(" ")
              .toLowerCase()
              .includes(normalizedQuery)
          : true;

        const matchesGroup =
          groupFilter === "Todos" || student.course === groupFilter;
        return matchesQuery && matchesGroup;
      })
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [groupFilter, query, students]);

  function updateForm<TField extends keyof StudentFormState>(
    field: TField,
    value: StudentFormState[TField]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError("");
    setFormSuccess("");
  }

  function openEmptyForm(status: StudentStatus = "Pendiente") {
    setEditingId(null);
    setSelectedStudent(null);
    setFormError("");
    setFormSuccess("");
    setActionError("");
    setForm({
      ...emptyStudentForm,
      status,
      enrollmentDate: new Date().toISOString().slice(0, 10)
    });
    setIsFormOpen(true);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyStudentForm);
    setFormError("");
    setFormSuccess("");
    setIsSaving(false);
    setActionError("");
    setIsFormOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const age = Number(form.age);
    const isMinor = Number.isFinite(age) && age < 18;
    const documentationComplete =
      form.condicionesAceptadas &&
      form.proteccionDatosAceptada &&
      (isMinor ? form.tutorConfirmado : true) &&
      form.responsabilidadAceptada &&
      form.presencialConfirmado;

    if (!documentationComplete) {
      setFormError("Completa las autorizaciones obligatorias antes de guardar.");
      return;
    }

    setIsSaving(true);
    setFormError("");
    setFormSuccess("");

    let response: Response;

    try {
      response = await fetch("/api/admin/students", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          ...form
        })
      });
    } catch {
      setFormError("No se ha podido conectar con Supabase.");
      setIsSaving(false);
      return;
    }

    const body = (await response.json().catch(() => null)) as {
      message?: string;
      student?: Student;
    } | null;

    if (!response.ok || !body?.student) {
      setFormError(body?.message || "No se ha podido guardar el alumno.");
      setIsSaving(false);
      return;
    }

    const nextStudent = body.student;

    setStudents((currentStudents) =>
      editingId
        ? currentStudents.map((student) =>
            student.id === editingId ? nextStudent : student
          )
        : [nextStudent, ...currentStudents]
    );
    setSelectedStudent(nextStudent);
    setActionError("");
    setFormSuccess("Alumno guardado correctamente.");
    setIsSaving(false);
    resetForm();
  }

  function editStudent(student: Student) {
    setEditingId(student.id);
    setSelectedStudent(null);
    setForm({
      fullName: student.fullName,
      age: String(student.age),
      birthDate: student.birthDate,
      guardian: student.guardian,
      address: student.address,
      postalCode: student.postalCode,
      dniNie: student.dniNie,
      course: student.course,
      schedule: student.schedule,
      phone: student.phone,
      phone2: student.phone2,
      email: student.email,
      status: student.status,
      enrollmentDate: student.enrollmentDate,
      condicionesAceptadas: student.condicionesAceptadas,
      proteccionDatosAceptada: student.proteccionDatosAceptada,
      tutorConfirmado: student.tutorConfirmado,
      responsabilidadAceptada: student.responsabilidadAceptada,
      derechosImagen: student.derechosImagen,
      fechaAceptacionLegal: student.fechaAceptacionLegal,
      textoLegalVersion: student.textoLegalVersion,
      notes: student.notes,
      acceptanceName: student.guardian || student.fullName,
      acceptanceRelation: student.age < 18 ? "Padre, madre o tutor legal" : "",
      presencialConfirmado: Boolean(student.fechaAceptacionLegal)
    });
    setFormError("");
    setFormSuccess("");
    setActionError("");
    setIsFormOpen(true);
  }

  function openStudent(student: Student) {
    setActiveTab("Resumen");
    setActionError("");
    setSelectedStudent(student);
  }

  async function markStudentAsInactive(student: Student) {
    let response: Response;

    try {
      response = await fetch("/api/admin/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: student.id,
          deactivate: true
        })
      });
    } catch {
      setActionError("No se ha podido conectar con Supabase.");
      return;
    }

    const body = (await response.json().catch(() => null)) as {
      message?: string;
      student?: Student;
    } | null;

    if (!response.ok || !body?.student) {
      setActionError(body?.message || "No se ha podido dar de baja el alumno.");
      return;
    }

    const nextStudent = body.student;

    setStudents((currentStudents) =>
      currentStudents.map((currentStudent) =>
        currentStudent.id === student.id ? nextStudent : currentStudent
      )
    );
    setActionError("");
    setSelectedStudent(nextStudent);
  }

  return (
    <div className="grid gap-5">
      <section className="overflow-hidden rounded-[24px] border border-[#D8E0E6] bg-white shadow-[0_24px_80px_rgba(10,37,64,0.06)]">
        <button
          type="button"
          onClick={() => setIsGroupsOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F8FAFB] sm:px-6"
          aria-expanded={isGroupsOpen}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
              Grupos
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#0A2540]">
              {groupSummaries.length} grupos · {activeGroups} activos
            </h2>
            <p className="mt-1 text-sm text-[#687586]">
              Selecciona un grupo para filtrar alumnos.
            </p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D8E0E6] bg-[#F8FAFB] text-[#0A2540]">
            <ChevronDown
              size={18}
              strokeWidth={1.8}
              className={`transition-transform duration-300 ${
                isGroupsOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            isGroupsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#E1E7ED] p-4 sm:p-5">
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                <GroupButton
                  title="Todos los alumnos"
                  meta={pluralizeStudents(students.length)}
                  schedule="Vista completa"
                  isActive={groupFilter === "Todos"}
                  onClick={() => setGroupFilter("Todos")}
                />
                {groupSummaries.map((group) => (
                  <GroupButton
                    key={group.group}
                    title={group.group}
                    meta={`${pluralizeStudents(group.total)} · ${
                      group.active === 1 ? "1 activo" : `${group.active} activos`
                    }`}
                    schedule={group.schedule}
                    isActive={groupFilter === group.group}
                    onClick={() => setGroupFilter(group.group)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_80px_rgba(10,37,64,0.06)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
              Alumnos
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#0A2540] sm:text-4xl">
              Encuentra un alumno rápido.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687586]">
              La información completa está dentro de cada ficha para mantener
              esta vista ligera.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openEmptyForm()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(200,16,46,0.22)] transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[#A50D25] hover:shadow-[0_22px_54px_rgba(200,16,46,0.28)]"
          >
            <UserPlus size={18} strokeWidth={1.8} aria-hidden="true" />
            Añadir alumno
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_240px]">
          <label className="relative">
            <span className="sr-only">Buscar alumno</span>
            <Search
              size={17}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8794]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre"
              className="min-h-12 w-full rounded-full border border-[#D8E0E6] bg-[#F8FAFB] pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#174EA6] focus:bg-white focus:ring-2 focus:ring-[#174EA6]/15"
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por grupo</span>
            <select
              value={groupFilter}
              onChange={(event) => setGroupFilter(event.target.value)}
              className="min-h-12 w-full rounded-full border border-[#D8E0E6] bg-[#F8FAFB] px-4 text-sm font-semibold text-[#0A2540] outline-none transition-colors focus:border-[#174EA6] focus:bg-white focus:ring-2 focus:ring-[#174EA6]/15"
            >
              {groupOptions.map((group) => (
                <option key={group} value={group}>
                  {group === "Todos" ? "Todos los grupos" : group}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#687586]">
          <span className="rounded-full border border-[#D8E0E6] bg-[#F8FAFB] px-3 py-1.5 font-semibold text-[#0A2540]">
            {pluralizeStudents(filteredStudents.length)}
          </span>
          <span>
            {groupFilter === "Todos" ? "Todos los grupos" : groupFilter}
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.length ? (
            filteredStudents.map((student) => (
              <article
                key={student.id}
                className="group rounded-[20px] border border-[#E1E7ED] bg-[#FCFDFE] p-4 transition-[border-color,box-shadow,transform,background-color] hover:-translate-y-0.5 hover:border-[#C8102E]/24 hover:bg-white hover:shadow-[0_22px_60px_rgba(10,37,64,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#0A2540]">
                      {student.fullName}
                    </h3>
                    <p className="mt-1 text-sm text-[#687586]">
                      {student.course || "Sin grupo"}
                    </p>
                  </div>
                  <StatusBadge status={student.status} />
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-[#687586]">
                  <Clock3 size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span>Alta: {formatDate(student.enrollmentDate)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => openStudent(student)}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#D8E0E6] bg-white px-4 text-sm font-semibold text-[#0A2540] transition-[border-color,color,background-color] hover:border-[#174EA6] hover:bg-[#F4F7FA] hover:text-[#174EA6]"
                >
                  Ver alumno
                </button>
              </article>
            ))
          ) : (
            <div className="rounded-[18px] border border-dashed border-[#CAD4DE] bg-[#F8FAFB] p-8 text-center text-sm leading-6 text-[#687586] md:col-span-2 xl:col-span-3">
              Todavía no hay alumnos registrados.
            </div>
          )}
        </div>
      </section>

      {selectedStudent ? (
        <StudentDetail
          student={selectedStudent}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => setSelectedStudent(null)}
          onEdit={() => editStudent(selectedStudent)}
          onDeactivate={() => markStudentAsInactive(selectedStudent)}
          error={actionError}
        />
      ) : null}

      {isFormOpen ? (
        <StudentFormModal
          form={form}
          editingId={editingId}
          courseOptions={courseOptions}
          onCancel={resetForm}
          onSubmit={handleSubmit}
          onUpdate={updateForm}
          error={formError}
          success={formSuccess}
          isSaving={isSaving}
          onDeactivate={() => {
            const selected = students.find((student) => student.id === editingId);
            if (selected) {
              markStudentAsInactive(selected);
            }
            resetForm();
          }}
        />
      ) : null}
    </div>
  );
}

function GroupButton({
  title,
  meta,
  schedule,
  isActive,
  onClick
}: {
  title: string;
  meta: string;
  schedule: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[18px] border p-4 text-left transition-[border-color,background-color,box-shadow,transform] hover:-translate-y-0.5 ${
        isActive
          ? "border-[#174EA6]/30 bg-[#F2F7FF] shadow-[0_18px_50px_rgba(23,78,166,0.1)]"
          : "border-[#E1E7ED] bg-[#FCFDFE] hover:border-[#D8E0E6] hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[#0A2540]">{title}</h3>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isActive ? "bg-white text-[#174EA6]" : "bg-[#F4F7FA] text-[#687586]"
          }`}
        >
          {meta}
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#687586]">{schedule}</p>
    </button>
  );
}

function StudentDetail({
  student,
  activeTab,
  onTabChange,
  onClose,
  onEdit,
  onDeactivate,
  error
}: {
  student: Student;
  activeTab: StudentTab;
  onTabChange: (tab: StudentTab) => void;
  onClose: () => void;
  onEdit: () => void;
  onDeactivate: () => void;
  error: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#061727]/50 px-4 py-6 backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-detail-title"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#D8E0E6] bg-white shadow-[0_34px_120px_rgba(0,0,0,0.22)]">
        <div className="border-b border-[#E1E7ED] bg-[#F8FAFB] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#D8E0E6] bg-white px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
              >
                <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
                Volver
              </button>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
                Ficha del alumno
              </p>
              <h2
                id="student-detail-title"
                className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#0A2540] sm:text-4xl"
              >
                {student.fullName}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#687586]">
                {student.course || "Sin grupo"} · Alta:{" "}
                {formatDate(student.enrollmentDate)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D8E0E6] bg-white px-4 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
              >
                <Pencil size={16} strokeWidth={1.8} aria-hidden="true" />
                Editar datos
              </button>
              <button
                type="button"
                onClick={onDeactivate}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#EEF2F5] px-4 text-sm font-semibold text-[#52606E] transition-colors hover:bg-[#FFE7EC] hover:text-[#A50D25]"
              >
                Dar de baja
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {studentTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "border-[#0A2540] bg-[#0A2540] text-white"
                    : "border-[#D8E0E6] bg-white text-[#0A2540] hover:border-[#174EA6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {error ? (
            <div className="mb-5 flex gap-3 rounded-[14px] border border-[#C8102E]/25 bg-[#FFF1F4] p-4 text-sm font-semibold text-[#A50D25]">
              <AlertCircle size={18} strokeWidth={1.8} aria-hidden="true" />
              {error}
            </div>
          ) : null}

          {activeTab === "Resumen" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatusCell label="Estado" status={student.status} />
              <StatusCell label="Condiciones" status={conditionsStatus(student)} />
              <StatusCell label="Imagen" status={imageRightsStatus(student)} />
              <StatusCell label="Documentos" status={documentsStatus(student)} />
            </div>
          ) : null}

          {activeTab === "Progreso" ? (
            <EmptySection text="Sin datos de progreso registrados todavía." />
          ) : null}

          {activeTab === "Asistencia" ? (
            <EmptySection text="Sin registros de asistencia todavía." />
          ) : null}

          {activeTab === "Notas" ? (
            student.notes ? (
              <div className="rounded-[16px] border border-[#E1E7ED] bg-[#F8FAFB] p-5 text-sm leading-7 text-[#4F5F70]">
                {student.notes}
              </div>
            ) : (
              <EmptySection text="Sin notas privadas registradas." />
            )
          ) : null}

          {activeTab === "Historial" ? (
            <EmptySection text="Sin historial de cambios registrado todavía." />
          ) : null}

          {activeTab === "Datos" ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <InfoBlock
                title="Alumno"
                items={[
                  ["Nombre", student.fullName],
                  ["Edad", `${student.age}`],
                  ["Fecha de nacimiento", formatDate(student.birthDate)],
                  ["DNI / NIE", student.dniNie || "Sin DNI/NIE"],
                  ["Dirección", student.address || "Sin dirección"],
                  ["Código postal", student.postalCode || "Sin código postal"],
                  ["Grupo", student.course || "Sin grupo"],
                  ["Horario", student.schedule || "Sin horario asignado"],
                  ["Estado", student.status]
                ]}
              />
              <InfoBlock
                title="Tutor"
                items={[
                  ["Tutor", student.guardian],
                  ["Teléfono", student.phone || "Sin teléfono"],
                  ["Teléfono 2", student.phone2 || "Sin segundo teléfono"],
                  ["Email", student.email || "Sin email"]
                ]}
              />
              <InfoBlock
                title="Autorizaciones"
                items={[
                  ["Condiciones", conditionsStatus(student)],
                  [
                    "Protección de datos",
                    student.proteccionDatosAceptada ? "Aceptada" : "Pendiente"
                  ],
                  ["Tutor confirmado", student.tutorConfirmado ? "Sí" : "No"],
                  [
                    "Responsabilidad deportiva",
                    student.responsabilidadAceptada ? "Aceptada" : "Pendiente"
                  ],
                  ["Derechos de imagen", imageRightsStatus(student)],
                  ["Documentación", documentsStatus(student)]
                ]}
              />
              <InfoBlock
                title="Legal"
                items={[
                  [
                    "Fecha de aceptación legal",
                    formatDate(student.fechaAceptacionLegal)
                  ],
                  [
                    "Versión del texto legal aceptado",
                    student.textoLegalVersion || LEGAL_CONSENT_VERSION
                  ]
                ]}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  title,
  items
}: {
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <section className="rounded-[16px] border border-[#E1E7ED] bg-[#F8FAFB] p-5">
      <h3 className="font-semibold text-[#0A2540]">{title}</h3>
      <dl className="mt-4 grid gap-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-1 border-b border-[#E1E7ED] pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7B8794]">
              {label}
            </dt>
            <dd className="text-sm font-semibold text-[#0A2540] sm:text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function LegalAcceptanceCard({
  title,
  summary,
  fullText,
  checked,
  onChange
}: {
  title: string;
  summary: string;
  fullText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <section className="rounded-[16px] border border-[#E1E7ED] bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-semibold text-[#0A2540]">{title}</h4>
          <p className="mt-2 text-sm leading-6 text-[#687586]">{summary}</p>
        </div>
        <label className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#D8E0E6] px-4 text-sm font-semibold text-[#0A2540]">
          <input
            required
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
          />
          Acepto
        </label>
      </div>
      <details className="mt-4 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] p-3 text-sm leading-6 text-[#5B6877]">
        <summary className="cursor-pointer font-semibold text-[#0A2540]">
          Ver texto completo
        </summary>
        <p className="mt-3 whitespace-pre-line">{fullText}</p>
      </details>
    </section>
  );
}

function StudentFormModal({
  form,
  editingId,
  courseOptions,
  onCancel,
  onSubmit,
  onUpdate,
  error,
  success,
  isSaving,
  onDeactivate
}: {
  form: StudentFormState;
  editingId: string | null;
  courseOptions: Array<{ group: string; schedule: string }>;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdate: <TField extends keyof StudentFormState>(
    field: TField,
    value: StudentFormState[TField]
  ) => void;
  error: string;
  success: string;
  isSaving: boolean;
  onDeactivate: () => void;
}) {
  const age = Number(form.age);
  const isMinor = Number.isFinite(age) && age < 18;
  const hasHistoricConsent = Boolean(form.fechaAceptacionLegal);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#061727]/58 px-4 py-6 backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-form-title"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#D8E0E6] bg-white shadow-[0_34px_120px_rgba(0,0,0,0.24)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E1E7ED] bg-[#F8FAFB] px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
              {editingId ? "Editar alumno" : "Nuevo alumno"}
            </p>
            <h2
              id="student-form-title"
              className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]"
            >
              {editingId ? form.fullName || "Editar alumno" : "Añadir alumno"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#687586]">
              Completa la ficha y registra la aceptación presencial de las
              condiciones antes de guardar.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D8E0E6] bg-white text-[#0A2540] transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
            aria-label="Cerrar ficha del alumno"
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 p-5 sm:p-6">
          <div className="grid gap-3 md:grid-cols-4">
            <StatusCell label="Estado alumno" status={form.status} />
            <StatusCell
              label="Condiciones"
              status={form.condicionesAceptadas ? "Aceptadas" : "Pendientes"}
            />
            <StatusCell
              label="Imagen"
              status={
                form.derechosImagen === null
                  ? "Pendiente"
                  : form.derechosImagen
                    ? "Autorizado"
                    : "No autorizado"
              }
            />
            <StatusCell
              label="Documentos"
              status={
                form.condicionesAceptadas &&
                form.proteccionDatosAceptada &&
                (isMinor ? form.tutorConfirmado : true) &&
                form.responsabilidadAceptada &&
                form.presencialConfirmado
                  ? "Completo"
                  : "Pendiente"
              }
            />
          </div>

          <fieldset className="grid gap-4 rounded-[18px] border border-[#E1E7ED] p-4 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold text-[#0A2540]">
              Datos del alumno
            </legend>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-[#0A2540]">
                Nombre y apellidos
              </span>
              <input
                required
                type="text"
                value={form.fullName}
                onChange={(event) => onUpdate("fullName", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">Edad</span>
              <input
                required
                type="number"
                min="3"
                value={form.age}
                onChange={(event) => onUpdate("age", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Fecha de nacimiento
              </span>
              <input
                required
                type="date"
                value={form.birthDate}
                onChange={(event) => onUpdate("birthDate", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                DNI / NIE
              </span>
              <input
                required
                type="text"
                value={form.dniNie}
                onChange={(event) => onUpdate("dniNie", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Código postal
              </span>
              <input
                required
                type="text"
                inputMode="numeric"
                value={form.postalCode}
                onChange={(event) => onUpdate("postalCode", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-[#0A2540]">
                Dirección
              </span>
              <input
                required
                type="text"
                value={form.address}
                onChange={(event) => onUpdate("address", event.target.value)}
                className={inputClass}
              />
            </label>
          </fieldset>

          <fieldset className="grid gap-4 rounded-[18px] border border-[#E1E7ED] p-4 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold text-[#0A2540]">
              {isMinor ? "Datos del tutor" : "Contacto"}
            </legend>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-[#0A2540]">
                {isMinor
                  ? "Padre, madre, tutor legal o persona responsable"
                  : "Persona de contacto"}
              </span>
              <input
                required={isMinor}
                type="text"
                value={form.guardian}
                onChange={(event) => onUpdate("guardian", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Teléfono principal
              </span>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => onUpdate("phone", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Teléfono 2
              </span>
              <input
                type="tel"
                value={form.phone2}
                onChange={(event) => onUpdate("phone2", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => onUpdate("email", event.target.value)}
                className={inputClass}
              />
            </label>
          </fieldset>

          <fieldset className="grid gap-4 rounded-[18px] border border-[#E1E7ED] p-4 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold text-[#0A2540]">
              Grupo y estado
            </legend>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">Grupo</span>
              <select
                required
                value={form.course}
                onChange={(event) => {
                  const selectedCourse = courseOptions.find(
                    (course) => course.group === event.target.value
                  );

                  onUpdate("course", event.target.value);
                  onUpdate("schedule", selectedCourse?.schedule ?? "");
                }}
                className={inputClass}
              >
                <option value="">Seleccionar grupo</option>
                {courseOptions.map((course) => (
                  <option key={course.group} value={course.group}>
                    {course.group}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Estado
              </span>
              <select
                value={form.status}
                onChange={(event) =>
                  onUpdate("status", event.target.value as StudentStatus)
                }
                className={inputClass}
              >
                {studentStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-[#0A2540]">
                Horario
              </span>
              <input
                type="text"
                value={form.schedule}
                onChange={(event) => onUpdate("schedule", event.target.value)}
                className={inputClass}
              />
            </label>
          </fieldset>

          <fieldset className="grid gap-4 rounded-[18px] border border-[#E1E7ED] p-4 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold text-[#0A2540]">
              Aceptación presencial
            </legend>
            <div className="sm:col-span-2 rounded-[16px] border border-[#E1E7ED] bg-[#F8FAFB] p-4">
              <p className="text-sm font-semibold text-[#0A2540]">
                {isMinor
                  ? "Alumno menor de edad: debe aceptar el tutor legal."
                  : "Alumno mayor de edad: puede aceptar personalmente."}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#687586]">
                El alumno o tutor revisa estas condiciones delante de Leo y
                confirma su aceptación en este dispositivo.
              </p>
            </div>

            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Nombre completo de quien acepta
              </span>
              <input
                required
                type="text"
                value={form.acceptanceName}
                onChange={(event) =>
                  onUpdate("acceptanceName", event.target.value)
                }
                className={inputClass}
              />
            </label>
            {isMinor ? (
              <label>
                <span className="text-sm font-semibold text-[#0A2540]">
                  Relación con el alumno
                </span>
                <input
                  required
                  type="text"
                  value={form.acceptanceRelation}
                  onChange={(event) =>
                    onUpdate("acceptanceRelation", event.target.value)
                  }
                  placeholder="Padre, madre o tutor legal"
                  className={inputClass}
                />
              </label>
            ) : null}

            <div className="sm:col-span-2 grid gap-3">
              <LegalAcceptanceCard
                title="Condiciones generales del club"
                summary="La persona que acepta confirma que los datos son correctos y que conoce las condiciones generales de participación en el club."
                fullText={legalConsentSections[0]?.paragraphs.join("\n\n") ?? ""}
                checked={form.condicionesAceptadas}
                onChange={(checked) =>
                  onUpdate("condicionesAceptadas", checked)
                }
              />
              <LegalAcceptanceCard
                title="Protección de datos"
                summary="Los datos personales se usarán para la gestión interna del club, la comunicación y la organización de los grupos."
                fullText={legalConsentSections[1]?.paragraphs.join("\n\n") ?? ""}
                checked={form.proteccionDatosAceptada}
                onChange={(checked) =>
                  onUpdate("proteccionDatosAceptada", checked)
                }
              />
              {isMinor ? (
                <LegalAcceptanceCard
                  title="Alumno menor de edad"
                  summary="El padre, madre o tutor legal confirma que autoriza la inscripción presencial del menor."
                  fullText={legalConsentSections[2]?.paragraphs.join("\n\n") ?? ""}
                  checked={form.tutorConfirmado}
                  onChange={(checked) => onUpdate("tutorConfirmado", checked)}
                />
              ) : null}
              <LegalAcceptanceCard
                title="Responsabilidad y condiciones deportivas"
                summary="La persona que acepta entiende la responsabilidad asociada a la práctica deportiva y se compromete a informar de cualquier circunstancia relevante."
                fullText={legalConsentSections[3]?.paragraphs.join("\n\n") ?? ""}
                checked={form.responsabilidadAceptada}
                onChange={(checked) =>
                  onUpdate("responsabilidadAceptada", checked)
                }
              />
            </div>

            <div className="sm:col-span-2 rounded-[16px] border border-[#E1E7ED] bg-white p-4">
              <p className="text-sm font-semibold text-[#0A2540]">
                Derecho de imagen
              </p>
              <p className="mt-2 text-sm leading-6 text-[#687586]">
                Autorización independiente y opcional para fotografías o vídeos
                del club. Puede quedar pendiente si todavía no se decide.
              </p>
              <details className="mt-3 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] p-3 text-sm leading-6 text-[#5B6877]">
                <summary className="cursor-pointer font-semibold text-[#0A2540]">
                  Ver texto completo
                </summary>
                <p className="mt-3 whitespace-pre-line">
                  {legalConsentSections[4]?.paragraphs.join("\n\n")}
                </p>
              </details>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  ["true", "Autorizado"],
                  ["false", "No autorizado"],
                  ["", "Pendiente"]
                ].map(([value, label]) => (
                  <label
                    key={value || "pending"}
                    className="flex min-h-11 items-center gap-2 rounded-[12px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540]"
                  >
                    <input
                      type="radio"
                      name="derechosImagen"
                      checked={
                        value === ""
                          ? form.derechosImagen === null
                          : String(form.derechosImagen) === value
                      }
                      onChange={() =>
                        onUpdate(
                          "derechosImagen",
                          value === "" ? null : value === "true"
                        )
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <label className="sm:col-span-2 flex gap-3 rounded-[16px] border border-[#C8102E]/18 bg-[#FFF7F8] p-4 text-sm leading-6 text-[#4F5F70]">
              <input
                required
                type="checkbox"
                checked={form.presencialConfirmado}
                onChange={(event) =>
                  onUpdate("presencialConfirmado", event.target.checked)
                }
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-[#0A2540]">
                  Confirmación presencial.
                </span>{" "}
                Confirmo que la persona indicada ha leído y aceptado las
                condiciones obligatorias en el dispositivo del club.
              </span>
            </label>

            <div className="sm:col-span-2 rounded-[14px] border border-[#E1E7ED] bg-[#F8FAFB] p-3 text-sm leading-6 text-[#5B6877]">
              <p>
                <span className="font-semibold text-[#0A2540]">
                  Fecha de aceptación legal:
                </span>{" "}
                {form.fechaAceptacionLegal
                  ? formatDate(form.fechaAceptacionLegal)
                  : "Pendiente"}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-[#0A2540]">
                  Versión del texto legal aceptado:
                </span>{" "}
                {form.textoLegalVersion || LEGAL_CONSENT_VERSION}
              </p>
              {hasHistoricConsent ? (
                <p className="mt-1 text-[#687586]">
                  La aceptación histórica se conserva al editar otros datos.
                </p>
              ) : null}
            </div>
          </fieldset>

          {error ? (
            <div className="flex gap-3 rounded-[14px] border border-[#C8102E]/25 bg-[#FFF1F4] p-4 text-sm font-semibold text-[#A50D25]">
              <AlertCircle size={18} strokeWidth={1.8} aria-hidden="true" />
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="flex gap-3 rounded-[14px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
              <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
              {success}
            </div>
          ) : null}

          <fieldset className="grid gap-4 rounded-[18px] border border-[#E1E7ED] p-4">
            <legend className="px-1 text-sm font-semibold text-[#0A2540]">
              Observaciones
            </legend>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Fecha de alta
              </span>
              <input
                required
                type="date"
                value={form.enrollmentDate}
                onChange={(event) =>
                  onUpdate("enrollmentDate", event.target.value)
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#0A2540]">
                Observaciones
              </span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(event) => onUpdate("notes", event.target.value)}
                className="mt-2 w-full resize-y rounded-[10px] border border-[#CAD4DE] px-3 py-3 text-sm outline-none focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/15"
              />
            </label>
          </fieldset>

          <div className="flex flex-col gap-3 border-t border-[#E1E7ED] pt-5 sm:flex-row sm:justify-end">
            {editingId ? (
              <button
                type="button"
                onClick={onDeactivate}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D8E0E6] px-4 text-sm font-semibold text-[#52606E] transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
              >
                Dar de baja
              </button>
            ) : null}
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D8E0E6] px-4 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#C8102E] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25] disabled:cursor-not-allowed disabled:bg-[#8B95A1]"
            >
              {isSaving ? "Guardando..." : "Guardar alumno"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
