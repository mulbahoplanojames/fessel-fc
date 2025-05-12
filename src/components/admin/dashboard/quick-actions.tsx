import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Newspaper, Ticket, Trophy, Users } from "lucide-react";
import Link from "next/link";

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
    title: "Tickets",
    icon: <Ticket className="h-5 w-5 mb-1" />,
    link: "/admin/tickets",
  },
];

const financialOverview = [
  {
    title: "Ticket Sales",
    value: "$45,000",
    percentage: 39,
    color: "bg-green-500",
    progressColor: "[&>div]:bg-green-500",
  },
  {
    title: "Merchandise ",
    value: "$23,500",
    percentage: 25,
    color: "bg-blue-500",
    progressColor: "[&>div]:bg-blue-500",
  },
  {
    title: "Sponsorships",
    value: "$89, 600",
    percentage: 45,
    color: "bg-amber-500",
    progressColor: "[&>div]:bg-amber-500",
  },
  {
    title: "Donations",
    value: "$67,000",
    percentage: 67,
    color: "bg-red-500",
    progressColor: "[&>div]:bg-red-500",
  },
];

const QuickActions = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
      <Card className="lg:col-span-2 h-fit">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin actions</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
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
          <CardDescription>Current month revenue breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {financialOverview.map((item) => (
            <div className="space-y-2" key={item.title}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm">{item.title}</span>
                </div>
                <span className="text-sm font-medium">{item.value} RWF</span>
              </div>
              <Progress
                value={item.percentage}
                className={`h-2 bg-muted ${item.progressColor}`}
              />
            </div>
          ))}

          <div className="pt-2 flex items-center justify-between text-sm font-medium">
            <span>Total Revenue</span>
            <span>$150,000 RWF</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
