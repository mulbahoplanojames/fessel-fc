import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const CallToAction = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-r from-primary-clr/90 to-primary-clr text-primary-foreground dark:text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Join the Kigali Lonestar Family
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg">
            Be part of our journey by purchasing tickets to our next home game,
            following us on social media, or joining our fan club for exclusive
            content and special offers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full"
              asChild
            >
              <Link href="/tickets">Buy Tickets</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/fan-zone">Join Fan Club</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
