"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function JoinFanClubPage() {
  const [membershipType, setMembershipType] = useState("standard");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    dateOfBirth: "",
    agreeTerms: false,
    agreeMarketing: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast("Error", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast("Error", {
        description: "You must agree to the terms and conditions.",
      });
      return;
    }

    // Submit form (in future updates, this would send data to a server)
    toast("Success", {
      description: "Your fan club membership application has been submitted!",
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      dateOfBirth: "",
      agreeTerms: false,
      agreeMarketing: false,
    });
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <Button variant="ghost" className="group" asChild>
          <Link href="/fan-zone" className="flex items-center text-primary-clr">
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Fan Zone
          </Link>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Join the FC Fassell Fan Club
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Become an official member of the FC Fassell fan club and enjoy
            exclusive benefits, discounts, and access to special events.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="border-none shadow-lg dark:bg-background">
              <form onSubmit={handleSubmit}>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 my-3">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Address Information
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-3">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Membership Type
                      </h2>
                      <RadioGroup
                        value={membershipType}
                        onValueChange={setMembershipType}
                        className="grid gap-4 md:grid-cols-3"
                      >
                        <Label
                          htmlFor="standard"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary-clr"
                        >
                          <RadioGroupItem
                            value="standard"
                            id="standard"
                            className="sr-only"
                          />
                          <div className="text-center">
                            <h4 className="font-medium">Standard</h4>
                            <p className="text-sm text-muted-foreground">
                              Basic membership
                            </p>
                            <p className="mt-1 font-medium">5,000 LRD/year</p>
                          </div>
                        </Label>
                        <Label
                          htmlFor="premium"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary-clr"
                        >
                          <RadioGroupItem
                            value="premium"
                            id="premium"
                            className="sr-only"
                          />
                          <div className="text-center">
                            <h4 className="font-medium">Premium</h4>
                            <p className="text-sm text-muted-foreground">
                              Enhanced benefits
                            </p>
                            <p className="mt-1 font-medium">10,000 LRD/year</p>
                          </div>
                        </Label>
                        <Label
                          htmlFor="vip"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary-clr"
                        >
                          <RadioGroupItem
                            value="vip"
                            id="vip"
                            className="sr-only"
                          />
                          <div className="text-center">
                            <h4 className="font-medium">VIP</h4>
                            <p className="text-sm text-muted-foreground">
                              Ultimate experience
                            </p>
                            <p className="mt-1 font-medium">20,000 LRD/year</p>
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "agreeTerms",
                              checked as boolean
                            )
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="agreeTerms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the terms and conditions{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <p className="text-sm text-muted-foreground">
                            By checking this box, you agree to our{" "}
                            <Link
                              href="/terms"
                              className="text-primary-clr hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-primary-clr hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeMarketing"
                          checked={formData.agreeMarketing}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "agreeMarketing",
                              checked as boolean
                            )
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="agreeMarketing"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I want to receive marketing communications
                          </label>
                          <p className="text-sm text-muted-foreground">
                            We&apos;ll send you updates about FC Fassell,
                            including news, events, and special offers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    type="submit"
                    className="w-full rounded-full"
                    size="lg"
                  >
                    Join Fan Club
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg dark:bg-background">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Membership Benefits
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-clr mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Exclusive Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Access behind-the-scenes videos, interviews, and news
                        before anyone else.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-clr mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Ticket Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Get early access to match tickets before they go on
                        general sale.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-clr mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Merchandise Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Enjoy discounts on official FC Fassell merchandise and
                        apparel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-clr mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Special Events</h4>
                      <p className="text-sm text-muted-foreground">
                        Invitations to member-only events, including player
                        meet-and-greets.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=400&text=Fan+Club"
                alt="Fan Club"
                fill
                className="object-cover"
              />
            </div>

            <Card className="border-none shadow-lg bg-primary-clr text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Premium & VIP Benefits
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>All Standard benefits</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Exclusive member gift pack</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Higher merchandise discounts</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Stadium tours</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>VIP match day experiences</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
