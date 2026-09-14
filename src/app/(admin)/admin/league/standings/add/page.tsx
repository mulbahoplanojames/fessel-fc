import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import StandingForm from "@/components/admin/league/standing-form";
import prisma from "../../../../../../../prisma";

export default async function AddStandingPage() {
  await requireAdmin();

  async function createStanding(formData: FormData) {
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

    await prisma.leagueStanding.create({
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
        <h1 className="text-3xl font-bold tracking-tight">Add Team Standing</h1>
        <p className="text-muted-foreground mt-1">
          Add a new team to the league table
        </p>
      </div>
      <StandingForm action={createStanding} />
    </div>
  );
}
