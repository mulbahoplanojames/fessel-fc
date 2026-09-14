import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../../../prisma";
import StandingForm from "@/components/admin/league/standing-form";
import { notFound } from "next/navigation";

export default async function EditStandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const standing = await prisma.leagueStanding.findUnique({
    where: { id },
  });

  if (!standing) {
    notFound();
  }

  async function updateStanding(formData: FormData) {
    "use server";
    
    const teamName = formData.get("teamName") as string;
    const season = formData.get("season") as string;
    const position = parseInt(formData.get("position") as string);
    const played = parseInt(formData.get("played") as string);
    const won = parseInt(formData.get("won") as string);
    const drawn = parseInt(formData.get("drawn") as string);
    const lost = parseInt(formData.get("lost") as string);
    const goalsFor = parseInt(formData.get("goalsFor") as string);
    const goalsAgainst = parseInt(formData.get("goalsAgainst") as string);
    const points = parseInt(formData.get("points") as string);
    const formText = formData.get("form") as string;
    const isActive = formData.get("isActive") === "on";

    const form = formText ? formText.split(",").map(f => f.trim().toUpperCase()) : null;
    const goalDiff = goalsFor - goalsAgainst;

    await prisma.leagueStanding.update({
      where: { id },
      data: {
        teamName,
        season,
        position,
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDiff,
        points,
        form,
        isActive,
      },
    });

    redirect("/admin/league/standings");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Team Standing</h1>
        <p className="text-muted-foreground mt-1">
          Update team standings
        </p>
      </div>
      <StandingForm
        action={updateStanding}
        initialData={{
          teamName: standing.teamName,
          season: standing.season,
          position: standing.position,
          played: standing.played,
          won: standing.won,
          drawn: standing.drawn,
          lost: standing.lost,
          goalsFor: standing.goalsFor,
          goalsAgainst: standing.goalsAgainst,
          points: standing.points,
          form: Array.isArray(standing.form) ? standing.form : [],
          isActive: standing.isActive,
        }}
      />
    </div>
  );
}
