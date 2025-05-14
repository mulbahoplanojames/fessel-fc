import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { CalendarDays, Trophy, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const mangement = [
  {
    name: "Cassel Kuoh",
    position: "Club President",
    image: "/players/upload/ceo.jpeg",
  },
  {
    name: "Richard Mulbah",
    position: "Chief Executive Officer",
    image: "/placeholder.svg",
  },
  {
    name: "Robert Johnson",
    position: "Sporting Director",
    image: "/placeholder.svg",
  },
  {
    name: "Emmanuel Flomo",
    position: "Head of Youth Development",
    image: "/coach/coah4.jpg",
  },
];

const ClubInfo = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center mb-16 bg-pattern">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            The Pride of Liberia
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            FC Fassell is one of Liberia&apos;s most prestigious football clubs,
            competing in the Liberian Premier League. Founded in 2010, we have
            quickly established ourselves as a dominant force in Liberian
            football, with a commitment to excellence both on and off the pitch.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Our mission is to develop local talent, promote the beautiful game
            throughout Liberia, and represent our nation with pride on the
            international stage. We strive to play attractive, attacking
            football that entertains our fans while achieving competitive
            success.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-primar-clry/10 mr-3">
                <Trophy className="h-5 w-5 text-primary-clr" />
              </div>
              <div>
                <h3 className="font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Striving for the highest standards in everything we do
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-primary-clr/10 mr-3">
                <Users className="h-5 w-5 text-primary-clr" />
              </div>
              <div>
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Serving and engaging with our local community
                </p>
              </div>
            </div>
          </div>
          <Button
            className="rounded-full bg-primary-clr hover:bg-primary-clr/90"
            asChild
          >
            <Link href="/fan-zone">Join Our Community</Link>
          </Button>
        </div>
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/hero-placeholder.jpg"
            alt="FC Fassell Team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
          Club Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from our
                performances on the pitch to our interactions with fans and the
                community. We set high standards and work tirelessly to meet
                them.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of football to bring people together.
                Our club is deeply rooted in the Kigali community, and we are
                committed to giving back through various initiatives and
                programs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Development</h3>
              <p className="text-muted-foreground">
                We are dedicated to developing young talent and providing
                pathways for local players to reach their full potential. Our
                youth academy is at the heart of our long-term vision for the
                club.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
          Club Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mangement.map((person, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image
                  src={person.image || "/placeholder.svg"}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
              <p className="text-muted-foreground">{person.position}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-pattern rounded-2xl p-8 mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Our Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re proud to work with these organizations who support our
            vision
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-background rounded-lg p-6 flex items-center justify-center h-32"
            >
              <Image
                src={`/placeholder.svg?height=80&width=160&text=Partner+${
                  i + 1
                }`}
                alt={`Partner ${i + 1}`}
                width={160}
                height={80}
                className="max-h-full max-w-full object-contain sponsor-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClubInfo;
