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

interface FAQFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    question?: string;
    answer?: string;
    isActive?: boolean;
    displayOrder?: number;
  };
}

export default function FAQForm({ action, initialData }: FAQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>FAQ Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={async (formData: FormData) => {
          setIsSubmitting(true);
          try {
            await action(formData);
          } catch (error) {
            console.error("Error saving FAQ:", error);
            setIsSubmitting(false);
          }
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              name="question"
              defaultValue={initialData?.question}
              placeholder="Enter the question"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              name="answer"
              defaultValue={initialData?.answer}
              placeholder="Enter the answer"
              rows={4}
              required
            />
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
              {isSubmitting ? "Saving..." : "Save FAQ"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/donation/faqs">
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
