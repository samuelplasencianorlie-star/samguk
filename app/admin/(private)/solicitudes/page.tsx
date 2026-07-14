import { RegistrationRequestsPanel } from "@/components/admin/registration-requests-panel";
import { getRegistrationRequests } from "@/lib/supabase/admin-queries";

export default async function AdminRequestsPage() {
  const registrationRequests = await getRegistrationRequests();

  return <RegistrationRequestsPanel initialRequests={registrationRequests} />;
}
