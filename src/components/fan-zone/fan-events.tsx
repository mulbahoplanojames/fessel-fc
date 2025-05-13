import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { initialEvents } from "@/data/fanzone-data";

export default function FanEvents() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialEvents.map((event, i) => (
          <Card
            key={i}
            className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all dark:bg-background p-0"
          >
            <div className="relative h-48">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={`Event ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary-clr text-black">
                  {i % 2 === 0 ? "Upcoming" : "Fan Club Only"}
                </Badge>
              </div>
            </div>
            <CardContent className="px-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>{event.date}</span>
              </div>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="flex items-center text-sm mb-4">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span>{event.attendese || "50 fans attending"}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full rounded-full bg-primary-clr text-black hover:bg-primary-clr/90"
                asChild
              >
                <Link href={`/fan-zone/events/${i + 1}`}>
                  {i % 2 === 0 ? "Register" : "Join Fan Club to Register"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
          Suggest an Event
        </h2>
        <Card className="border-none shadow-lg max-w-2xl mx-auto dark:bg-background p-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="event-name"
                  className="block text-sm font-medium mb-1"
                >
                  Event Name
                </label>
                <Input id="event-name" placeholder="Enter event name" />
              </div>
              <div>
                <label
                  htmlFor="event-description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <Textarea
                  id="event-description"
                  placeholder="Describe your event idea"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="event-date"
                    className="block text-sm font-medium mb-1"
                  >
                    Suggested Date
                  </label>
                  <Input id="event-date" type="date" />
                </div>
                <div>
                  <label
                    htmlFor="event-location"
                    className="block text-sm font-medium mb-1"
                  >
                    Location
                  </label>
                  <Input id="event-location" placeholder="Enter location" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="rounded-full bg-primary-clr text-black hover:bg-primary-clr/90">
                  Submit Suggestion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
