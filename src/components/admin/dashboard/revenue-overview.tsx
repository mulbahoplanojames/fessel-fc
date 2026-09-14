"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart3, HandCoins, Handshake, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type RevenueResponse = {
  month: string;
  shopRevenue: number;
  shopByMonth: { label: string; value: number }[];
  donations: number;
  donationByMonth: { label: string; value: number }[];
  sponsorships: number;
  sponsorshipByMonth: { label: string; value: number }[];
  openTickets: number;
};

const fetchRevenue = async () => {
  const { data } = await axios.get<RevenueResponse>("/api/admin/revenue");
  return data;
};

const fmtUsd = (value: number) =>
  `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const fmtLrd = (value: number) =>
  `LRD ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const RevenueOverview = () => {
  const { data: revenue } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: fetchRevenue,
  });

  const shopData = revenue?.shopByMonth ?? [];
  const maxShop = Math.max(...shopData.map((m) => m.value), 1);
  const maxNonShop = Math.max(revenue?.donations ?? 0, revenue?.sponsorships ?? 0, 1);

  const pctOf = (value: number) =>
    value > 0 ? Math.round((value / maxNonShop) * 100) : 0;

  const sourceRows = [
    {
      label: "Shop Sales (USD)",
      value: fmtUsd(revenue?.shopRevenue ?? 0),
      pct: pctOf(revenue?.shopRevenue ?? 0),
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      label: "Donations (LRD)",
      value: fmtLrd(revenue?.donations ?? 0),
      pct: pctOf(revenue?.donations ?? 0),
      icon: <HandCoins className="h-4 w-4" />,
    },
    {
      label: "Sponsorships (LRD)",
      value: fmtLrd(revenue?.sponsorships ?? 0),
      pct: pctOf(revenue?.sponsorships ?? 0),
      icon: <Handshake className="h-4 w-4" />,
    },
  ];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-6 mt-8">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Shop revenue by month (USD, current year)
              </CardDescription>
            </div>
            <div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Report
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {shopData.length > 0 ? (
              <>
                <div className="h-[300px] flex items-end gap-2">
                  {shopData.map((bar, i) => (
                    <div key={i} className="relative flex-1 group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${bar.value.toLocaleString()}
                      </div>
                      <div
                        className="bg-gradient-to-t from-blue-700 to-blue-300/60 rounded-t-md w-full hover:opacity-80 transition-opacity"
                        style={{
                          height: `${Math.max((bar.value / maxShop) * 260, 4)}px`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {shopData.map((bar) => (
                    <span key={bar.label}>{bar.label}</span>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No shop revenue yet. Orders will appear here once placed.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 h-fit">
          <CardHeader>
            <CardTitle>Revenue by Source</CardTitle>
            <CardDescription>Lifetime totals from the database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sourceRows.map((row) => (
              <div className="space-y-2" key={row.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    {row.icon}
                    {row.label}
                  </span>
                  <span className="font-medium">{row.value}</span>
                </div>
                <Progress value={row.pct} className="h-2" />
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Open support tickets
                </span>
                <span className="font-medium">{revenue?.openTickets ?? 0}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-sm font-medium">
                <span>Donations + Sponsorships</span>
                <span>
                  {fmtLrd(
                    (revenue?.donations ?? 0) + (revenue?.sponsorships ?? 0)
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RevenueOverview;