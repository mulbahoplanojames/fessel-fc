import { notFound } from "next/navigation";
import prisma from "../../../../../../../prisma";
import EditPlayerForm from "@/components/admin/players/edit-player-form";
import { Player } from "@/types/players-type";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id },
  });

  if (!player) {
    notFound();
  }

  return <EditPlayerForm id={id} initial={player as unknown as Player} />;
}