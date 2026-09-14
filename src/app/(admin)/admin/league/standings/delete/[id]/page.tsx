import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import prisma from "../../../../../../../../prisma";

export default async function DeleteStandingPage({
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

  async function deleteStanding() {
    "use server";
    await prisma.leagueStanding.delete({
      where: { id },
    });
    redirect("/admin/league/standings");
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/league/standings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Standings
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Team Standing
          </CardTitle>
          <CardDescription>
            Are you sure you want to remove &ldquo;{standing.teamName}&rdquo; from the league table? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted">
              <h3 className="font-medium mb-2">Team Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Team:</span> {standing.teamName}</p>
                <p><span className="font-medium">Position:</span> {standing.position}</p>
                <p><span className="font-medium">Points:</span> {standing.points}</p>
                <p><span className="font-medium">Season:</span> {standing.season}</p>
              </div>
            </div>

            <form action={deleteStanding}>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href="/admin/league/standings">Cancel</Link>
                </Button>
                <Button type="submit" variant="destructive">
                  Delete Standing
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
