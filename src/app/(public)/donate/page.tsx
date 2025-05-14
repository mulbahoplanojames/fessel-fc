"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import DonateHero from "@/components/donate/donate-hero";
import DonateImpact from "@/components/donate/donate-impact";
import DonationSummary from "@/components/donate/donation-summary";
import DonationSupport from "@/components/donate/donation-support";
import DonateTestimonial from "@/components/donate/donate-testimonial";
import DonateFAQ from "@/components/donate/donate-faq";
import DonateCTA from "@/components/donate/donate-cta";
import DonateComfirmation from "@/components/donate/donate-comfirmation";

export default function DonatePage() {
  const [donationType, setDonationType] = useState("one-time");
  const [donationAmount, setDonationAmount] = useState("25000");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate donation processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      window.scrollTo(0, 0);
    }, 2000);
  };

  const handleAmountChange = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount("custom");
  };

  const getActualAmount = () => {
    if (donationAmount === "custom") {
      return Number.parseInt(customAmount) || 0;
    }
    return Number.parseInt(donationAmount);
  };

  return (
    <div>
      {!isComplete ? (
        <>
          <DonateHero />
          <DonateImpact />

          {/* Donation Form */}
          <section id="donate-now" className="py-20">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Make a Donation
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose how you&apos;d like to support FC Fassel
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <Card className="border-none shadow-lg dark:bg-background">
                    <CardContent className="p-8">
                      <Tabs defaultValue="individual" className="w-full mb-8">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="individual">
                            Individual
                          </TabsTrigger>
                          <TabsTrigger value="corporate">Corporate</TabsTrigger>
                        </TabsList>

                        <TabsContent value="individual">
                          <form
                            onSubmit={handleDonationSubmit}
                            className="space-y-6"
                          >
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Donation Type
                              </h3>
                              <RadioGroup
                                defaultValue="one-time"
                                value={donationType}
                                onValueChange={setDonationType}
                                className="flex flex-col sm:flex-row gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="one-time"
                                    id="one-time"
                                  />
                                  <Label htmlFor="one-time">
                                    One-time Donation
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="monthly"
                                    id="monthly"
                                  />
                                  <Label htmlFor="monthly">
                                    Monthly Donation
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="annual" id="annual" />
                                  <Label htmlFor="annual">
                                    Annual Donation
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Donation Amount (LRD)
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Button
                                  type="button"
                                  variant={
                                    donationAmount === "5000"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="rounded-full h-16"
                                  onClick={() => handleAmountChange("5000")}
                                >
                                  5,000
                                </Button>
                                <Button
                                  type="button"
                                  variant={
                                    donationAmount === "10000"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="rounded-full h-16"
                                  onClick={() => handleAmountChange("10000")}
                                >
                                  10,000
                                </Button>
                                <Button
                                  type="button"
                                  variant={
                                    donationAmount === "25000"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="rounded-full h-16"
                                  onClick={() => handleAmountChange("25000")}
                                >
                                  25,000
                                </Button>
                                <Button
                                  type="button"
                                  variant={
                                    donationAmount === "50000"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="rounded-full h-16"
                                  onClick={() => handleAmountChange("50000")}
                                >
                                  50,000
                                </Button>
                              </div>

                              <div className="relative">
                                <Input
                                  type="number"
                                  placeholder="Custom Amount"
                                  value={customAmount}
                                  onChange={handleCustomAmountChange}
                                  className="pl-16"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-muted-foreground">
                                  LRD
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Personal Information
                              </h3>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="first-name">First Name</Label>
                                  <Input
                                    id="first-name"
                                    placeholder="Enter your first name"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="last-name">Last Name</Label>
                                  <Input
                                    id="last-name"
                                    placeholder="Enter your last name"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Enter your email address"
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Payment Method
                              </h3>
                              <Tabs
                                defaultValue="card"
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="w-full"
                              >
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="card">
                                    Credit Card
                                  </TabsTrigger>
                                  <TabsTrigger value="mobile">
                                    Mobile Money
                                  </TabsTrigger>
                                  <TabsTrigger value="bank">
                                    Bank Transfer
                                  </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                  value="card"
                                  className="space-y-4 pt-4"
                                >
                                  <div className="space-y-2">
                                    <Label htmlFor="card-name">
                                      Name on Card
                                    </Label>
                                    <Input
                                      id="card-name"
                                      placeholder="Enter name as it appears on card"
                                      required
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="card-number">
                                      Card Number
                                    </Label>
                                    <Input
                                      id="card-number"
                                      placeholder="1234 5678 9012 3456"
                                      required
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="expiry">
                                        Expiry Date
                                      </Label>
                                      <Input
                                        id="expiry"
                                        placeholder="MM/YY"
                                        required
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="cvv">CVV</Label>
                                      <Input
                                        id="cvv"
                                        placeholder="123"
                                        required
                                      />
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent
                                  value="mobile"
                                  className="space-y-4 pt-4"
                                >
                                  <div className="space-y-2">
                                    <Label htmlFor="mobile-provider">
                                      Mobile Provider
                                    </Label>
                                    <RadioGroup
                                      defaultValue="mtn"
                                      className="pt-2"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mtn" id="mtn" />
                                        <Label htmlFor="mtn">
                                          MTN Mobile Money
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value="airtel"
                                          id="airtel"
                                        />
                                        <Label htmlFor="airtel">
                                          Airtel Money
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value="tigo"
                                          id="tigo"
                                        />
                                        <Label htmlFor="tigo">Tigo Cash</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="mobile-number">
                                      Mobile Number
                                    </Label>
                                    <Input
                                      id="mobile-number"
                                      placeholder="Enter your mobile money number"
                                      required
                                    />
                                  </div>
                                </TabsContent>

                                <TabsContent
                                  value="bank"
                                  className="space-y-4 pt-4"
                                >
                                  <div className="bg-muted/30 p-4 rounded-lg">
                                    <h3 className="font-medium mb-2">
                                      Bank Transfer Instructions
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Please transfer the donation amount to the
                                      following bank account:
                                    </p>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Bank Name:
                                        </span>
                                        <span>Bank of Liberia</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Account Name:
                                        </span>
                                        <span>Fassel FC Foundation</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Account Number:
                                        </span>
                                        <span>1234567890</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Reference:
                                        </span>
                                        <span>
                                          DONATE-
                                          {Math.floor(Math.random() * 10000)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="transfer-date">
                                      Transfer Date
                                    </Label>
                                    <Input
                                      id="transfer-date"
                                      type="date"
                                      required
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="transfer-reference">
                                      Transfer Reference
                                    </Label>
                                    <Input
                                      id="transfer-reference"
                                      placeholder="Enter your bank transfer reference"
                                      required
                                    />
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Additional Information
                              </h3>
                              <div className="space-y-2">
                                <Label htmlFor="message">
                                  Message (Optional)
                                </Label>
                                <Textarea
                                  id="message"
                                  placeholder="Share why you're supporting FC Fassel"
                                  rows={3}
                                />
                              </div>

                              <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input
                                    id="anonymous"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="anonymous"
                                    className="text-muted-foreground"
                                  >
                                    Make my donation anonymous
                                  </label>
                                </div>
                              </div>

                              <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input
                                    id="newsletter"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    defaultChecked
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="newsletter"
                                    className="text-muted-foreground"
                                  >
                                    Subscribe to our newsletter to stay updated
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4">
                              <Button
                                type="submit"
                                size="lg"
                                className="w-full rounded-full"
                                disabled={
                                  isSubmitting || getActualAmount() <= 0
                                }
                              >
                                {isSubmitting
                                  ? "Processing..."
                                  : `Complete ${
                                      donationType === "one-time"
                                        ? "Donation"
                                        : "Subscription"
                                    }`}
                              </Button>
                              <p className="text-xs text-muted-foreground text-center mt-2">
                                By donating, you agree to our{" "}
                                <Link
                                  href="/terms"
                                  className="text-primary hover:underline"
                                >
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                  href="/privacy"
                                  className="text-primary hover:underline"
                                >
                                  Privacy Policy
                                </Link>
                              </p>
                            </div>
                          </form>
                        </TabsContent>

                        <TabsContent value="corporate">
                          <form
                            onSubmit={handleDonationSubmit}
                            className="space-y-6"
                          >
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Corporate Information
                              </h3>
                              <div className="space-y-2">
                                <Label htmlFor="company-name">
                                  Company Name
                                </Label>
                                <Input
                                  id="company-name"
                                  placeholder="Enter your company name"
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="contact-name">
                                    Contact Person
                                  </Label>
                                  <Input
                                    id="contact-name"
                                    placeholder="Enter contact person's name"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="position">Position</Label>
                                  <Input
                                    id="position"
                                    placeholder="Enter position/title"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="company-email">
                                  Email Address
                                </Label>
                                <Input
                                  id="company-email"
                                  type="email"
                                  placeholder="Enter company email address"
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="company-phone">
                                  Phone Number
                                </Label>
                                <Input
                                  id="company-phone"
                                  placeholder="Enter company phone number"
                                  required
                                />
                              </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Sponsorship Level
                              </h3>
                              <RadioGroup
                                defaultValue="silver"
                                className="space-y-4"
                              >
                                <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="bronze"
                                      id="bronze"
                                    />
                                    <div>
                                      <Label
                                        htmlFor="bronze"
                                        className="text-base font-medium"
                                      >
                                        Bronze Partner
                                      </Label>
                                      <p className="text-sm text-muted-foreground">
                                        Logo on website, social media mention
                                      </p>
                                    </div>
                                  </div>
                                  <div className="font-semibold">
                                    500,000 LRD
                                  </div>
                                </div>

                                <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="silver"
                                      id="silver"
                                    />
                                    <div>
                                      <Label
                                        htmlFor="silver"
                                        className="text-base font-medium"
                                      >
                                        Silver Partner
                                      </Label>
                                      <p className="text-sm text-muted-foreground">
                                        Bronze benefits + stadium banner, match
                                        program ad
                                      </p>
                                    </div>
                                  </div>
                                  <div className="font-semibold">
                                    1,000,000 LRD
                                  </div>
                                </div>

                                <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="gold" id="gold" />
                                    <div>
                                      <Label
                                        htmlFor="gold"
                                        className="text-base font-medium"
                                      >
                                        Gold Partner
                                      </Label>
                                      <p className="text-sm text-muted-foreground">
                                        Silver benefits + jersey logo placement,
                                        VIP tickets
                                      </p>
                                    </div>
                                  </div>
                                  <div className="font-semibold">
                                    2,500,000 LRD
                                  </div>
                                </div>

                                <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="platinum"
                                      id="platinum"
                                    />
                                    <div>
                                      <Label
                                        htmlFor="platinum"
                                        className="text-base font-medium"
                                      >
                                        Platinum Partner
                                      </Label>
                                      <p className="text-sm text-muted-foreground">
                                        Gold benefits + naming rights, exclusive
                                        events
                                      </p>
                                    </div>
                                  </div>
                                  <div className="font-semibold">
                                    5,000,000 LRD
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">
                                Additional Information
                              </h3>
                              <div className="space-y-2">
                                <Label htmlFor="company-message">
                                  Message (Optional)
                                </Label>
                                <Textarea
                                  id="company-message"
                                  placeholder="Share any specific requirements or questions about the sponsorship"
                                  rows={3}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="logo-upload">
                                  Company Logo
                                </Label>
                                <Input
                                  id="logo-upload"
                                  type="file"
                                  accept="image/*"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Please upload a high-resolution logo (PNG or
                                  SVG preferred)
                                </p>
                              </div>
                            </div>

                            <div className="pt-4">
                              <Button
                                type="submit"
                                size="lg"
                                className="w-full rounded-full"
                                disabled={isSubmitting}
                              >
                                {isSubmitting
                                  ? "Processing..."
                                  : "Submit Sponsorship Request"}
                              </Button>
                              <p className="text-xs text-muted-foreground text-center mt-2">
                                Our team will contact you within 48 hours to
                                discuss your sponsorship
                              </p>
                            </div>
                          </form>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>

                <DonationSummary
                  donationType={donationType}
                  getActualAmount={getActualAmount}
                />
              </div>
            </div>
          </section>

          {/* What Your Donation Supports */}
          <DonationSupport />
          <DonateTestimonial />
          <DonateFAQ />
          <DonateCTA />
        </>
      ) : (
        // Thank You / Confirmation Page
        <DonateComfirmation
          donationType={donationType}
          getActualAmount={getActualAmount}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  );
}
