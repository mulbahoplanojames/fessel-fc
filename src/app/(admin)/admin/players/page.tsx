import React from "react";
import PlayerClient from "./player-client";
import { redirect } from "next/navigation";
import prisma from "../../../../../prisma";
import { auth } from "@/lib/auth";

const PlayerAdminPage = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;
  // console.log("User Email", userEmail);
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail!,
    },
  });

  // console.log("User", user);

  if (!session || user?.role !== "ADMIN") {
    return redirect("/");
  }

  return <PlayerClient />;
};

export default PlayerAdminPage;
