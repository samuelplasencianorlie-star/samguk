import type { Student } from "@/lib/admin-types";

export function hasEssentialStudentData(student: Student) {
  const isKnownMinor = student.age > 0 && student.age < 18;

  return Boolean(
    student.fullName.trim() &&
      student.birthDate &&
      student.phone.trim() &&
      (!isKnownMinor || student.guardian.trim())
  );
}
