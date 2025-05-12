import HomeHero from "@/components/home/home-hero";
import { LiveScoreTracker } from "@/components/home/live-score-tracker";
import { NewsTicker } from "@/components/home/news-ticker";
import React from "react";

export default function Home() {
  return (
    <>
      <HomeHero />
      <NewsTicker />
      <LiveScoreTracker />
    </>
  );
}
