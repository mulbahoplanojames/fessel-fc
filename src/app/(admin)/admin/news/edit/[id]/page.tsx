import { notFound } from "next/navigation";
import prisma from "../../../../../../../prisma";
import EditNewsForm from "@/components/admin/news/edit-news-form";
import { NewsItem } from "@/types/news-type";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const news = await prisma.news.findUnique({
    where: { id },
  });

  if (!news) {
    notFound();
  }

  return <EditNewsForm id={id} initial={news as unknown as NewsItem} />;
}