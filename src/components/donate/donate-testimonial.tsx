import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function DonateTestimonial() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Donor Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from those who have already made a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg dark:bg-background">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=JM"
                    alt="Jean Mugisha"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">Jean Mugisha</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Monthly Donor since 2022
                </p>
                <p className="italic">
                  &apos;As a lifelong fan, supporting Kigali Lonestar is my way
                  of giving back to the club that has brought so much joy to our
                  community. Seeing the youth academy flourish makes me proud of
                  my contribution.&apos;
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg dark:bg-background">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=RB"
                    alt="Rwanda Bank"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">Rwanda Bank Ltd.</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Corporate Partner since 2021
                </p>
                <p className="italic">
                  &apos;Our partnership with Kigali Lonestar FC aligns perfectly
                  with our commitment to community development. The club&apos;s
                  focus on youth education and sports has created real impact
                  across Kigali.&apos;
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg dark:bg-background p-0">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=MU"
                    alt="Marie Uwase"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">Marie Uwase</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Annual Donor since 2020
                </p>
                <p className="italic">
                  &apos;I donate because I&apos;ve seen firsthand how the
                  club&apos;s community programs transform lives. My son
                  participated in their youth clinic, and the experience built
                  not just his football skills but his confidence.&apos;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
