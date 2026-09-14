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

interface TestimonialFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    name?: string;
    role?: string;
    image?: string;
    content?: string;
    isCorporate?: boolean;
    isActive?: boolean;
    displayOrder?: number;
  };
}

export default function TestimonialForm({ action, initialData }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonial Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={async (formData: FormData) => {
          setIsSubmitting(true);
          try {
            await action(formData);
          } catch (error) {
            console.error("Error saving testimonial:", error);
            setIsSubmitting(false);
          }
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="Enter donor name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role / Description</Label>
            <Input
              id="role"
              name="role"
              defaultValue={initialData?.role}
              placeholder="e.g., Monthly Donor since 2022"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              name="image"
              defaultValue={initialData?.image}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Testimonial Content</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={initialData?.content}
              placeholder="Enter the testimonial text"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isCorporate"
              name="isCorporate"
              defaultChecked={initialData?.isCorporate}
            />
            <Label htmlFor="isCorporate">Corporate Partner</Label>
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
              {isSubmitting ? "Saving..." : "Save Testimonial"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/donation/testimonials">
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
