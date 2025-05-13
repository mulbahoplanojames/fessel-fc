import { ArrowRight, Gift } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function DonateCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-clr/90 to-primary-clr text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
          <Gift className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Join Us in Building the Future
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg">
          Your support, no matter the size, makes a meaningful difference in our
          club and community. Together, we can build a legacy that extends far
          beyond the football pitch.
        </p>
        <Button size="lg" variant="secondary" className="rounded-full" asChild>
          <a href="#donate-now">
            Donate Now <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
}
