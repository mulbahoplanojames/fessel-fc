import React from "react";
import NewsClient from "./news-client";
import { auth } from "@/lib/auth";
import prisma from "../../../../../prisma";
import { redirect } from "next/navigation";

const AdminNewsPage = async () => {
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
  return <NewsClient />;
};

export default AdminNewsPage;
