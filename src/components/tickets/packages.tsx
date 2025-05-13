import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Packages = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden dark:bg-background p-0">
          <div className="bg-muted/50 p-6 text-center">
            <h3 className="text-xl font-semibold">Family Package</h3>
          </div>
          <CardContent className="p-6 pt-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">2,000 LRD</div>
              <p className="text-muted-foreground">
                Perfect for families attending matches together
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>2 Adult tickets + 2 Child tickets</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Family seating section</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Complimentary snacks</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full rounded-full bg-primary-clr hover:bg-primary-clr/80"
              asChild
            >
              <Link href="/tickets/Packages/family">Buy Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden dark:bg-background p-0">
          <div className="bg-muted/50 p-6 text-center">
            <h3 className="text-xl font-semibold">Group Package</h3>
          </div>
          <CardContent className="p-6 pt-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">5,000 LRD</div>
              <p className="text-muted-foreground">
                Ideal for groups of friends or corporate outings
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>10 tickets</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Reserved group seating</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Stadium tour</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Group photo opportunity</span>
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
      </div>
    </>
  );
};

export default Packages;
