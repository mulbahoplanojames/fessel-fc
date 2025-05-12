"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  handleMatchFetch,
  handleNewsFetch,
  handlePlayersFetch,
} from "@/utils/helpers/handle-fetch";

import { useQuery } from "@tanstack/react-query";
import { ArrowUp, Newspaper, Ticket, Trophy, User } from "lucide-react";
import { useEffect } from "react";

const StatsCards = () => {
  const { data: matches } = useQuery({
    queryKey: ["matches"],
    queryFn: handleMatchFetch,
  });

  const { data: news } = useQuery({
    queryKey: ["news"],
    queryFn: handleNewsFetch,
  });

  const { data: players } = useQuery({
    queryKey: ["players"],
    queryFn: handlePlayersFetch,
  });

  useEffect(() => {
    if (!matches) {
      return;
    }

    if (!news) {
      return;
    }

    if (!players) {
      return;
    }
    // console.log("Data", matches);
  }, [matches, news, players]);

  const avaliableMatchCount =
    matches && Array.isArray(matches) && matches.length > 0
      ? matches.length
      : 0;

  const avaliableNewsCount =
    news && Array.isArray(news) && news.length > 0 ? news.length + "+" : 0;

  const avaliablePlayersCount =
    players && Array.isArray(players) && players.length > 0
      ? players.length
      : 0;

  const data = [
    {
      title: "Matches",
      stats: avaliableMatchCount,
      icon: <Trophy className="size-4" />,
      style: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20",
    },
    {
      title: "Tickets",
      stats: "12+",
      icon: <Ticket className="size-4" />,
      style:
        "bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20",
    },
    {
      title: "News",
      stats: avaliableNewsCount,
      icon: <Newspaper className="size-4" />,
      style:
        "bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20",
    },
    {
      title: "Players",
      stats: avaliablePlayersCount,
      icon: <User className="size-4" />,
      style:
        "bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20",
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mt-6">
      {data.map((item) => (
        <Card key={item.title} className={`${item.style}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">{item.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.stats}</div>
            <div className="flex items-center pt-1 text-xs text-green-600 dark:text-green-400">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>+2 from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
