import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

const RevenueOverview = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-6 mt-8">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </div>
            <div>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end gap-2">
              {[40, 25, 55, 32, 80, 45, 60, 75, 62, 45, 90, 48].map(
                (height, i) => (
                  <div key={i} className="relative flex-1 group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height} RWF
                    </div>
                    <div
                      className="bg-gradient-to-t from-red-600 to-red-300/60 rounded-t-md w-full hover:opacity-80 transition-opacity"
                      style={{ height: `${height * 3}px` }}
                    ></div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 h-fit">
          <CardHeader>
            <CardTitle>Ticket Sales</CardTitle>
            <CardDescription>Current match ticket sales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>General Admission</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Premium Seats</span>
                <span className="font-medium">48%</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>VIP Boxes</span>
                <span className="font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="pt-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin/tickets">
                  <Ticket className="mr-2 h-4 w-4" />
                  Manage Tickets
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RevenueOverview;
