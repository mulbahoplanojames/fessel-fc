import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const data = [
  {
    label: "Live Matches",
    description: "Get real-time updates on all FC Fassell matches",
    path: "/matches",
    linkValue: "Watch Live",
    icon: <Clock className="h-8 w-8 text-primary-clr" />,
  },
  {
    label: "Match Schedule",
    description: " View upcoming matches and add them to your calendar",
    path: "#",
    linkValue: "View schedule",
    icon: <CalendarDays className="h-8 w-8 text-primary-clr" />,
  },
  {
    label: "  Player Profiles",
    description: "Learn more about your favorite FC Fassell players",
    path: "/players",
    linkValue: "Meet the Team",
    icon: <Star className="h-8 w-8 text-primary-clr" />,
  },
  {
    label: "Shop",
    description: "Get the latest FC Fassell merchandise and memorabilia",
    path: "/shop",
    linkValue: "Visit Shop",
    icon: <ShoppingCart className="h-8 w-8 text-primary-clr" />,
  },
];

const QuickLinks = () => {
  return (
    <>
      <section className="py-14 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <Card
                className="transition-all hover:shadow-lg border-none bg-gradient-to-br from-background to-muted p-0"
                key={item.label}
              >
                <CardContent className="px-4 py-2 flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-primary-clr/10  mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.label}</h3>
                  <p className="text-muted-foreground mb-6">
                    {item.description}
                  </p>
                  <Button
                    variant="link"
                    className="mt-auto group text-primary-clr"
                    asChild
                  >
                    <Link href={item.path} className="flex items-center ">
                      {item.linkValue}
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuickLinks;
