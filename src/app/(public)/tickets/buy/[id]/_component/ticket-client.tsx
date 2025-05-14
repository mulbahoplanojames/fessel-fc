"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, MapPin, Minus, Plus } from "lucide-react";
// import matches from "@/data/matches.json";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { PrismaMatchType } from "@/types/match-type";
import { handleMatchFetch } from "@/utils/helpers/handle-fetch";

const TicketClient = ({ ticketId }: { ticketId: string }) => {
  const [selectedSection, setSelectedSection] = useState("general");
  const [quantities, setQuantities] = useState({
    adult: 1,
    child: 0,
    senior: 0,
  });

  const { data: matches } = useQuery({
    queryKey: ["match", ticketId],
    queryFn: handleMatchFetch,
  });

  const match = matches?.find(
    (match: PrismaMatchType) => match.id === ticketId
  );

  const prices = {
    general: { adult: 5000, child: 2000, senior: 3000 },
    premium: { adult: 10000, child: 5000, senior: 7000 },
    vip: { adult: 20000, child: 10000, senior: 15000 },
  };

  const updateQuantity = (type: keyof typeof quantities, value: number) => {
    if (quantities[type] + value >= 0) {
      setQuantities({
        ...quantities,
        [type]: quantities[type] + value,
      });
    }
  };

  const calculateTotal = () => {
    const sectionPrices = prices[selectedSection as keyof typeof prices];
    return (
      quantities.adult * sectionPrices.adult +
      quantities.child * sectionPrices.child +
      quantities.senior * sectionPrices.senior
    );
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <Link href="/tickets" className="text-primary hover:underline">
          &larr; Back to Tickets
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-6">
            Select Tickets
          </h1>

          <div className="mb-8">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4 grid grid-cols-2">
              <Image
                src={
                  match?.homeTeamLogo
                    ? match.homeTeamLogo
                    : "/placeholder.svg?height=200&width=600&text=Match"
                }
                alt="Match"
                fill
                className="object-cover col-start-1"
              />
              <Image
                src={
                  match?.awayTeamLogo
                    ? match.awayTeamLogo
                    : "/placeholder.svg?height=200&width=600&text=Match"
                }
                alt="Match"
                fill
                className="object-cover col-start-2"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {match?.homeTeam} vs {match?.awayTeam}
            </h2>
            <div className="text-muted-foreground space-y-1">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>{match?.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{match?.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{match?.venue} Liberia</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Section</h3>
            <RadioGroup
              value={selectedSection}
              onValueChange={setSelectedSection}
              className="grid gap-4 md:grid-cols-3"
            >
              <Label
                htmlFor="general"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="general"
                  id="general"
                  className="sr-only"
                />
                <div className="text-center">
                  <h4 className="font-medium">General</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard seating
                  </p>
                  <p className="mt-1 font-medium">5,000 LRD</p>
                </div>
              </Label>
              <Label
                htmlFor="premium"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="premium"
                  id="premium"
                  className="sr-only"
                />
                <div className="text-center">
                  <h4 className="font-medium">Premium</h4>
                  <p className="text-sm text-muted-foreground">Better view</p>
                  <p className="mt-1 font-medium">10,000 LRD</p>
                </div>
              </Label>
              <Label
                htmlFor="vip"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="vip" id="vip" className="sr-only" />
                <div className="text-center">
                  <h4 className="font-medium">VIP</h4>
                  <p className="text-sm text-muted-foreground">
                    Best experience
                  </p>
                  <p className="mt-1 font-medium">20,000 LRD</p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Select Quantity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Adult</h4>
                  <p className="text-sm text-muted-foreground">Ages 18+</p>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-center font-medium">
                    {prices[
                      selectedSection as keyof typeof prices
                    ].adult.toLocaleString()}
                    LRD
                  </span>
                  <div className="flex items-center ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity("adult", -1)}
                      disabled={quantities.adult <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantities.adult}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity("adult", 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Child</h4>
                  <p className="text-sm text-muted-foreground">Ages 5-17</p>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-center font-medium">
                    {prices[
                      selectedSection as keyof typeof prices
                    ].child.toLocaleString()}{" "}
                    LRD
                  </span>
                  <div className="flex items-center ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity("child", -1)}
                      disabled={quantities.child <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantities.child}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity("child", 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Senior</h4>
                  <p className="text-sm text-muted-foreground">Ages 65+</p>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-center font-medium">
                    {prices[
                      selectedSection as keyof typeof prices
                    ].senior.toLocaleString()}{" "}
                    LRD
                  </span>
                  <div className="flex items-center ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity("senior", -1)}
                      disabled={quantities.senior <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantities.senior}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity("senior", 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="p-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {match?.homeTeam} vs {match?.awayTeam}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {match?.date} • {match?.time}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tickets</h4>
                  {quantities.adult > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Adult x {quantities.adult}</span>
                      <span>
                        {(
                          quantities.adult *
                          prices[selectedSection as keyof typeof prices].adult
                        ).toLocaleString()}{" "}
                        LRD
                      </span>
                    </div>
                  )}
                  {quantities.child > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Child x {quantities.child}</span>
                      <span>
                        {(
                          quantities.child *
                          prices[selectedSection as keyof typeof prices].child
                        ).toLocaleString()}{" "}
                        LRD
                      </span>
                    </div>
                  )}
                  {quantities.senior > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Senior x {quantities.senior}</span>
                      <span>
                        {(
                          quantities.senior *
                          prices[selectedSection as keyof typeof prices].senior
                        ).toLocaleString()}{" "}
                        LRD
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{calculateTotal().toLocaleString()} LRD</span>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="#">Proceed to Checkout</Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By proceeding, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketClient;
