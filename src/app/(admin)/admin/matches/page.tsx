import MatcheClient from "./match-client";
import { requireAdmin } from "@/lib/session";

const AdminMatchPage = async () => {
  await requireAdmin();
  return <MatcheClient />;
};

export default AdminMatchPage;
