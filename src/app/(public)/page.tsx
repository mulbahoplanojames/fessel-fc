import ClubStats from "@/components/home/club-stats";
import HomeHero from "@/components/home/home-hero";
import LatestNewsUpdate from "@/components/home/latest-news-update";
import { LiveScoreTracker } from "@/components/home/live-score-tracker";
import { NewsTicker } from "@/components/home/news-ticker";
import QuickLinks from "@/components/home/quick-links";
import UpcommingMatches from "@/components/home/upcomming-matches";
import React from "react";

export default function Home() {
  return (
    <>
      <HomeHero />
      <NewsTicker />
      <LiveScoreTracker />
      <QuickLinks />
      <ClubStats />
      <UpcommingMatches />
      <LatestNewsUpdate />
    </>
  );
}
