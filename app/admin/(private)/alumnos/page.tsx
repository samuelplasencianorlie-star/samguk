import { StudentsPanel } from "@/components/admin/students-panel";
import {
  getAdminCourses,
  getAdminStudents
} from "@/lib/supabase/admin-queries";

export default async function AdminStudentsPage() {
  const [adminCourses, students] = await Promise.all([
    getAdminCourses(),
    getAdminStudents()
  ]);

  return <StudentsPanel courses={adminCourses} initialStudents={students} />;
}
