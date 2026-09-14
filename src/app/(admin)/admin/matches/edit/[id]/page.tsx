import { notFound } from "next/navigation";
import prisma from "../../../../../../../prisma";
import EditMatchForm from "@/components/admin/match/edit-match-form";
import { DBMatch } from "@/types/match-type";

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
  });

  if (!match) {
    notFound();
  }

  return <EditMatchForm id={id} initial={match as unknown as DBMatch} />;
}