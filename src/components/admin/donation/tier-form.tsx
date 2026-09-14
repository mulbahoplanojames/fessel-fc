"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TierFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    name?: string;
    description?: string;
    minAmount?: number;
    benefits?: string[];
    isActive?: boolean;
    displayOrder?: number;
  };
}

export default function TierForm({ action, initialData }: TierFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const benefits = initialData?.benefits || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sponsor Tier Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={async (formData: FormData) => {
          setIsSubmitting(true);
          try {
            await action(formData);
          } catch (error) {
            console.error("Error saving tier:", error);
            setIsSubmitting(false);
          }
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tier Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="e.g., Bronze, Silver, Gold"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              placeholder="Describe this sponsorship tier"
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minAmount">Minimum Amount (LRD)</Label>
            <Input
              id="minAmount"
              name="minAmount"
              type="number"
              defaultValue={initialData?.minAmount}
              placeholder="500000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits (one per line)</Label>
            <Textarea
              id="benefits"
              name="benefits"
              defaultValue={benefits.join("\n")}
              placeholder="Logo on website&#10;VIP tickets&#10;Meet the players"
              rows={4}
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter each benefit on a new line
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              name="isActive"
              defaultChecked={initialData?.isActive ?? true}
            />
            <Label htmlFor="isActive">Active (display on page)</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              defaultValue={initialData?.displayOrder ?? 0}
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Tier"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/donation/tiers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
