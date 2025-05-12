import { redirect } from "next/navigation";
import MatcheClient from "./match-client";
import prisma from "../../../../../prisma";
import { auth } from "@/lib/auth";

const AdminMatchPage = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail!,
    },
  });

  if (!session || user?.role !== "ADMIN") {
    return redirect("/");
  }
  return <MatcheClient />;
};

export default AdminMatchPage;
