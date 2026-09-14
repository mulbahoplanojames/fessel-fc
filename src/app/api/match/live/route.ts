import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

function toScore(match: {
  matchResult: unknown;
  isLive: boolean | null;
  isFeatured: boolean | null;
  upcoming: boolean | null;
}) {
  const r = match.matchResult as {
    homeTeamScore?: number;
    awayTeamScore?: number;
    status?: string;
  } | null;

  if (match.isLive === true && !r) {
    return { status: "live" as const, minute: 0, homeScore: 0, awayScore: 0 };
  }

  if (r) {
    const fullTime = r.status === "FT" || r.status === "fulltime";
    const halftime = r.status === "HT" || r.status === "halftime";
    return {
      status: (fullTime
        ? "fulltime"
        : halftime
          ? "halftime"
          : match.isLive === true
            ? "live"
            : "fulltime") as "live" | "halftime" | "fulltime",
      minute: fullTime || halftime ? 90 : 0,
      homeScore: r.homeTeamScore ?? 0,
      awayScore: r.awayTeamScore ?? 0,
    };
  }

  return { status: "upcoming" as const, minute: 0, homeScore: 0, awayScore: 0 };
}

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: { date: "desc" },
    take: 80,
  });

  const liveMatches = matches.filter((m) => m.isLive === true);
  const featuredMatches = matches.filter(
    (m) => m.upcoming === true || m.isFeatured === true
  );

  const alreadyIncluded = new Set(liveMatches.map((m) => m.id));
  const list = [
    ...liveMatches,
    ...featuredMatches.filter((m) => !alreadyIncluded.has(m.id)),
  ];

  return NextResponse.json({
    isLive: liveMatches.length > 0,
    liveCount: liveMatches.length,
    matches: list.map((m) => {
      const score = toScore(m);
      return {
        id: m.id,
        homeTeam: m.homeTeam,
        awayTeam: m.awayTeam,
        homeTeamLogo: m.homeTeamLogo || null,
        awayTeamLogo: m.awayTeamLogo || null,
        date: m.date,
        time: m.time,
        competition: m.competition || null,
        status: score.status,
        minute: score.minute,
        homeScore: score.homeScore,
        awayScore: score.awayScore,
        fullTime: score.status === "fulltime",
      };
    }),
  });
}