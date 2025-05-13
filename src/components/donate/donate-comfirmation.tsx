import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckCircle2, Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function DonateComfirmation({
  donationType,
  getActualAmount,
  paymentMethod,
}: {
  donationType: string;
  getActualAmount: () => number;
  paymentMethod: string;
}) {
  return (
    <div className="container px-4 py-20 mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary-clr/10 flex items-center justify-center">
            <Heart className="h-12 w-12 text-primary-clr" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Thank You for Your Donation!
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Your generosity helps us build a stronger club and create positive
          impact in our community.
        </p>

        <Card className="border-none shadow-lg mb-8 dark:bg-background p-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Donation Type:</span>
                <span className="font-medium capitalize">{donationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">
                  {getActualAmount().toLocaleString()} RWF
                  {donationType !== "one-time" && (
                    <span className="text-sm text-muted-foreground">
                      / {donationType === "monthly" ? "month" : "year"}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">
                  DON-{Math.floor(Math.random() * 100000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/30 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-3">What Happens Next?</h3>
          <ul className="space-y-2 text-left">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>
                A confirmation email has been sent to your email address
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>You&apos;ll receive a tax receipt for your donation</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>
                We&apos;ll keep you updated on the impact of your donation
              </span>
            </li>
            {donationType !== "one-time" && (
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Your {donationType} donation will be processed automatically
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="rounded-full" asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/fan-zone">Join Fan Club</Link>
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-muted-foreground">
            Have questions about your donation?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
