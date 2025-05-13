import React from "react";
import { Card, CardContent } from "../ui/card";
import { LandPlot, School, Users } from "lucide-react";

const impacts = [
  {
    icon: <LandPlot className="h-10 w-10 text-primary-clr" />,
    value: "120+",
    label: "Youth Players Supported",
  },
  {
    icon: <School className="h-10 w-10 text-primary-clr" />,
    value: "85%",
    label: " Academy Graduates in Education",
  },
  {
    icon: <LandPlot className="h-10 w-10 text-primary-clr" />,
    value: "3",
    label: "Community Pitches Built",
  },
  {
    icon: <Users className="h-10 w-10 text-primary-clr" />,
    value: "2500+",
    label: " Community Members Impacted",
  },
];

export default function DonateImpact() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Your Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how your donations are making a difference in our club and
            community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact) => (
            <Card
              key={impact.label}
              className="border-none shadow-lg bg-gradient-to-br from-background to-muted dark:bg-background p-0"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  {impact.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{impact.value}</div>
                <p className="text-muted-foreground">{impact.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
