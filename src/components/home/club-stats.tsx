import React from "react";
import { MapPin, Star, Trophy, Users } from "lucide-react";
import { StatsCard } from "../stats-card";

const stats = [
  {
    icon: <Trophy className="h-10 w-10 text-primary-clr" />,
    value: "10",
    label: "Trophies Won",
  },
  {
    icon: <Users className="h-10 w-10 text-primary-clr" />,
    value: "1500+",
    label: "Loyal Fans",
  },
  {
    icon: <Star className="h-10 w-10 text-primary-clr" />,
    value: "5",
    label: "National Teams",
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary-clr" />,
    value: "Liberia",
    label: "Home Country",
  },
];

const ClubStats = () => {
  return (
    <>
      <section className="py-16 bg-pattern">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Club Statistics
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kigali Lonestar FC has been a dominant force in Rwandan football
              since our founding
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubStats;
