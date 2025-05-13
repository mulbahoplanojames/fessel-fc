"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Heart,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DonateHero from "@/components/donate/donate-hero";
import DonateImpact from "@/components/donate/donate-impact";
import DonationSummary from "@/components/donate/donation-summary";
import DonationSupport from "@/components/donate/donation-support";

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
                  Choose how you&apos;d like to support Kigali Lonestar FC
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
                                Donation Amount (RWF)
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
                                  RWF
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
                                        <span>Bank of Kigali</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Account Name:
                                        </span>
                                        <span>
                                          Kigali Lonestar FC Foundation
                                        </span>
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
                                  placeholder="Share why you're supporting Kigali Lonestar FC"
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
                                    500,000 RWF
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
                                    1,000,000 RWF
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
                                    2,500,000 RWF
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
                                    5,000,000 RWF
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

          {/* Testimonials */}
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
                      <h3 className="text-lg font-semibold mb-1">
                        Jean Mugisha
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Monthly Donor since 2022
                      </p>
                      <p className="italic">
                        &apos;As a lifelong fan, supporting Kigali Lonestar is
                        my way of giving back to the club that has brought so
                        much joy to our community. Seeing the youth academy
                        flourish makes me proud of my contribution.&apos;
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
                      <h3 className="text-lg font-semibold mb-1">
                        Rwanda Bank Ltd.
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Corporate Partner since 2021
                      </p>
                      <p className="italic">
                        &apos;Our partnership with Kigali Lonestar FC aligns
                        perfectly with our commitment to community development.
                        The club&apos;s focus on youth education and sports has
                        created real impact across Kigali.&apos;
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg dark:bg-background">
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
                      <h3 className="text-lg font-semibold mb-1">
                        Marie Uwase
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Annual Donor since 2020
                      </p>
                      <p className="italic">
                        &apos;I donate because I&apos;ve seen firsthand how the
                        club&apos;s community programs transform lives. My son
                        participated in their youth clinic, and the experience
                        built not just his football skills but his
                        confidence.&apos;
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about donating to Kigali
                  Lonestar FC
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Is my donation tax-deductible?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, all donations to Kigali Lonestar FC Foundation are
                      tax-deductible under Rwandan tax law. You will receive an
                      official receipt for your donation that can be used for
                      tax purposes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How is my donation used?
                    </AccordionTrigger>
                    <AccordionContent>
                      Your donation directly supports our three main
                      initiatives: youth development programs, facility
                      improvements, and community outreach. We publish an annual
                      impact report that details how funds are allocated and the
                      outcomes achieved.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Can I specify how my donation is used?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, you can designate your donation for a specific
                      program or initiative. Please include this information in
                      the message field when making your donation, or contact
                      our donor relations team for larger gifts.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      How do I cancel or modify a recurring donation?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can cancel or modify your recurring donation at any
                      time by logging into your donor account on our website or
                      by contacting our donor support team at
                      donations@kigalilonestar.com.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Are there benefits for donors?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, depending on your donation level, benefits may
                      include recognition on our website, exclusive event
                      invitations, behind-the-scenes tours, and priority ticket
                      access. Corporate sponsors receive additional benefits as
                      outlined in our sponsorship packages.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      Can I donate equipment or services instead of money?
                    </AccordionTrigger>
                    <AccordionContent>
                      In-kind donations of equipment, services, or expertise are
                      greatly appreciated. Please contact our team to discuss
                      your specific in-kind donation and how it can support our
                      mission.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center justify-center mt-8 gap-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Have more questions?{" "}
                    <Link
                      href="/contact"
                      className="text-primary hover:underline"
                    >
                      Contact our team
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
            <div className="container px-4 mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                <Gift className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Join Us in Building the Future
              </h2>
              <p className="max-w-2xl mx-auto mb-10 text-lg">
                Your support, no matter the size, makes a meaningful difference
                in our club and community. Together, we can build a legacy that
                extends far beyond the football pitch.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full"
                asChild
              >
                <a href="#donate-now">
                  Donate Now <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </section>
        </>
      ) : (
        // Thank You / Confirmation Page
        <div className="container px-4 py-20 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Thank You for Your Donation!
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Your generosity helps us build a stronger club and create positive
              impact in our community.
            </p>

            <Card className="border-none shadow-lg mb-8 dark:bg-background">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Donation Type:
                    </span>
                    <span className="font-medium capitalize">
                      {donationType}
                    </span>
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
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment Method:
                    </span>
                    <span className="font-medium capitalize">
                      {paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Transaction ID:
                    </span>
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
                  <span>
                    You&apos;ll receive a tax receipt for your donation
                  </span>
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
                      Your {donationType} donation will be processed
                      automatically
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
      )}
    </div>
  );
}
