"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Newspaper, Package, ShoppingCart, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type RevenueResponse = {
  shopRevenue: number;
  products: number;
  donations: number;
  sponsorships: number;
  openTickets: number;
};

const fetchRevenue = async () => {
  const { data } = await axios.get<RevenueResponse>("/api/admin/revenue");
  return data;
};

const quickActions = [
  {
    title: "Matches",
    icon: <Trophy className="h-5 w-5 mb-1" />,
    link: "/admin/matches",
  },
  {
    title: "Players",
    icon: <Users className="h-5 w-5 mb-1" />,
    link: "/admin/players",
  },
  {
    title: "News",
    icon: <Newspaper className="h-5 w-5 mb-1" />,
    link: "/admin/news",
  },
  {
    title: "Products",
    icon: <Package className="h-5 w-5 mb-1" />,
    link: "/admin/products",
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="h-5 w-5 mb-1" />,
    link: "/admin/orders",
  },
];

const QuickActions = () => {
  const { data: revenue } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: fetchRevenue,
  });

  const financials = [
    {
      title: "Shop Sales",
      value: (revenue?.shopRevenue ?? 0).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
      unit: "USD",
      color: "bg-blue-500",
      progressColor: "[&>div]:bg-blue-500",
    },
    {
      title: "Products",
      value: String(revenue?.products ?? 0),
      unit: "",
      color: "bg-purple-500",
      progressColor: "[&>div]:bg-purple-500",
    },
    {
      title: "Donations",
      value: (revenue?.donations ?? 0).toLocaleString(),
      unit: "LRD",
      color: "bg-red-500",
      progressColor: "[&>div]:bg-red-500",
    },
    {
      title: "Sponsorships",
      value: (revenue?.sponsorships ?? 0).toLocaleString(),
      unit: "LRD",
      color: "bg-amber-500",
      progressColor: "[&>div]:bg-amber-500",
    },
    {
      title: "Open Tickets",
      value: String(revenue?.openTickets ?? 0),
      unit: "",
      color: "bg-green-500",
      progressColor: "[&>div]:bg-green-500",
    },
  ];

  const maxForRevenue = Math.max(
    revenue?.shopRevenue ?? 0,
    revenue?.donations ?? 0,
    revenue?.sponsorships ?? 0,
    revenue?.openTickets ?? 0,
    1
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
      <Card className="lg:col-span-2 h-fit">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin actions</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              asChild
              key={action.title}
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 "
            >
              <Link href={action.link}>
                {action.icon}
                <span>{action.title}</span>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Revenue recorded in the database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {financials.map((item) => (
            <div className="space-y-2" key={item.title}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm">{item.title}</span>
                </div>
                <span className="text-sm font-medium">
                  {item.value} {item.unit}
                </span>
              </div>
              <Progress
                value={(() => {
                  const numericValue = typeof item.value === 'string' 
                    ? Number(item.value.replace(/,/g, "")) 
                    : Number(item.value);
                  if (item.title === "Products") {
                    return Math.min(100, Math.round((numericValue / Math.max(revenue?.products ?? 1, 1)) * 100));
                  }
                  return Math.min(100, Math.round((numericValue / maxForRevenue) * 100));
                })()}
                className={`h-2 bg-muted ${item.progressColor}`}
              />
            </div>
          ))}

          <div className="pt-2 flex items-center justify-between text-sm font-medium">
            <span>Donations + Sponsorships</span>
            <span>
              LRD{" "}
              {(
                (revenue?.donations ?? 0) + (revenue?.sponsorships ?? 0)
              ).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;