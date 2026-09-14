import React from "react";
import NewsClient from "./news-client";
import { requireAdmin } from "@/lib/session";

const AdminNewsPage = async () => {
  await requireAdmin();
  return <NewsClient />;
};

export default AdminNewsPage;
