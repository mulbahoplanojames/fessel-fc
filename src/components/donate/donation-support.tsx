import React from "react";
import { Card, CardContent } from "../ui/card";
import { LandPlot, Star, Users } from "lucide-react";

export default function DonationSupport() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Your Donation Supports
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your generosity helps us build a stronger club and community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg dark:bg-background">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-clr/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Youth Development</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Support our academy that nurtures young talent from across
                Rwanda, providing coaching, equipment, and opportunities to
                develop their skills.
              </p>
              <div className="w-full bg-muted h-2 rounded-full">
                <div className="bg-primary-clr h-full rounded-full w-[75%]"></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Current: 15M LRD</span>
                <span>Goal: 20M LRD</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg dark:bg-background">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-clr/10 rounded-full flex items-center justify-center">
                  <LandPlot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Facility Improvements</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Help us upgrade our training facilities, including new pitches,
                equipment, and a state-of-the-art performance center for our
                players.
              </p>
              <div className="w-full bg-muted h-2 rounded-full">
                <div className="bg-primary-clr h-full rounded-full w-[40%]"></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Current: 12M LRD</span>
                <span>Goal: 30M LRD</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg dark:bg-background p-0">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-clr/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community Programs</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Fund our community initiatives that use football as a tool for
                social change, including school programs, health education, and
                grassroots football.
              </p>
              <div className="w-full bg-muted h-2 rounded-full">
                <div className="bg-primary-clr h-full rounded-full w-[60%]"></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Current: 9M LRD</span>
                <span>Goal: 15M LRD</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
