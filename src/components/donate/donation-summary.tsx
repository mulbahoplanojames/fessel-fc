import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckCircle2, HandHeart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-separator";

export default function DonationSummary({
  donationType,
  getActualAmount,
}: {
  donationType: string;
  getActualAmount: () => number;
}) {
  return (
    <div>
      <div className="space-y-8 lg:sticky lg:top-24">
        <Card className="border-none shadow-lg dark:bg-background">
          <CardHeader className="pb-2">
            <CardTitle>Donation Summary</CardTitle>
          </CardHeader>
          <CardContent>
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
                      {" "}
                      / {donationType === "monthly" ? "month" : "year"}
                    </span>
                  )}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{getActualAmount().toLocaleString()} RWF</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg dark:bg-background p-0">
          <CardHeader className="pb-2">
            <CardTitle>Your Impact</CardTitle>
            <CardDescription>
              Here&apos;s what your donation can help us achieve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-clr mr-2 mt-0.5 flex-shrink-0" />
                <span>Support youth academy development</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-clr mr-2 mt-0.5 flex-shrink-0" />
                <span>Improve training facilities and equipment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-clr mr-2 mt-0.5 flex-shrink-0" />
                <span>Fund community outreach programs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-clr mr-2 mt-0.5 flex-shrink-0" />
                <span>Provide educational support for players</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-primary-clr text-primary-foreground p-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <HandHeart className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Need Help?</h3>
            </div>
            <p className="mb-4">
              If you have any questions about donations or would like to discuss
              other ways to support the club, please contact our team.
            </p>
            <Button variant="secondary" className="w-full rounded-full" asChild>
              <Link href="/about">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
