import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function StadiumInfo() {
  return (
    <section className="py-20 bg-pattern">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Our Home: Antoinette Tubman Stadium
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Located in the heart of Monrovia, Antoinette Tubman Stadium is
              where we create unforgettable memories with our fans. With a
              capacity of 10,000, the atmosphere on match days is electric.
            </p>
            <div className="flex items-center mb-6">
              <MapPin className="h-5 w-5 text-primary mr-3" />
              <span>Monrovia, Liberia</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>10,000 seating capacity</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Modern facilities and amenities</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Excellent public transport connections</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Family-friendly environment</span>
              </li>
            </ul>
            <Button
              className="rounded-full bg-primary-clr hover:bg-primary-clr/90"
              asChild
            >
              <Link href="/stadium">Stadium Information</Link>
            </Button>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/liberia-africa-staduim.webp"
              alt="Antoinette Tubman Stadium"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
