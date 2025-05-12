import CallToAction from "@/components/call-to-action";
import ClubStats from "@/components/home/club-stats";
import FeaturedPlayers from "@/components/home/featured-players";
import HomeHero from "@/components/home/home-hero";
import LatestNewsUpdate from "@/components/home/latest-news-update";
import { LiveScoreTracker } from "@/components/home/live-score-tracker";
import { NewsTicker } from "@/components/home/news-ticker";
import QuickLinks from "@/components/home/quick-links";
import StadiumInfo from "@/components/home/stadium-info";
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
      <FeaturedPlayers />
      <StadiumInfo />
      <CallToAction />
    </>
  );
}
