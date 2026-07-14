import { DocumentsPanel } from "@/components/admin/documents-panel";
import { getAdminStudents } from "@/lib/supabase/admin-queries";

export default async function AdminDocumentsPage() {
  const students = await getAdminStudents();

  return <DocumentsPanel students={students} />;
}
