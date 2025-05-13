import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const SeasonTickets = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden dark:bg-background p-0">
          <div className="bg-muted/50 p-6 text-center">
            <h3 className="text-xl font-semibold">Standard</h3>
          </div>
          <CardContent className="px-6  py-4 ">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">5,00 LRD</div>
              <span className="text-muted-foreground">/season</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>All home league matches</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Standard seating</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>10% discount on merchandise</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full rounded-full bg-primary-clr hover:bg-primary-clr/80"
              asChild
            >
              <Link href="#">Buy Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-lg hover:shadow-xl transition-all overflow-hidden relative dark:bg-background p-0">
          <div className="absolute top-0 right-0 bg-primary-clr text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
            Popular
          </div>
          <div className="bg-primary-clr/10 p-6 text-center">
            <h3 className="text-xl font-semibold">Premium</h3>
          </div>
          <CardContent className="px-6  py-4 ">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">1,000 LRD</div>
              <span className="text-muted-foreground">/season</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>All home matches (including cup games)</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Premium seating</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>20% discount on merchandise</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Exclusive events access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full rounded-full bg-primary-clr hover:bg-primary-clr/80"
              asChild
            >
              <Link href="#">Buy Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden dark:bg-background p-0">
          <div className="bg-muted/50 p-6 text-center">
            <h3 className="text-xl font-semibold">VIP</h3>
          </div>
          <CardContent className="px-6  py-4 ">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">1,500 LRD</div>
              <span className="text-muted-foreground">/season</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>All home and away matches</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>VIP lounge access</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>30% discount on merchandise</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Meet & greet with players</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Complimentary refreshments</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-6">
            <Button
              className="w-full rounded-full bg-primary-clr hover:bg-primary-clr/80"
              asChild
            >
              <Link href="#">Buy Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SeasonTickets;
