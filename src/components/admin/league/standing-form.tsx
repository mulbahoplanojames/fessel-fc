"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface StandingFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    teamName?: string;
    played?: number;
    won?: number;
    drawn?: number;
    lost?: number;
    goalsFor?: number;
    goalsAgainst?: number;
    points?: number;
    form?: string[];
    position?: number;
    season?: string;
    isActive?: boolean;
  };
}

export default function StandingForm({ action, initialData }: StandingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = initialData?.form || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Standing Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={async (formData: FormData) => {
          setIsSubmitting(true);
          try {
            await action(formData);
          } catch (error) {
            console.error("Error saving standing:", error);
            setIsSubmitting(false);
          }
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="teamName"
                defaultValue={initialData?.teamName}
                placeholder="e.g., FC Fassell"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Input
                id="season"
                name="season"
                defaultValue={initialData?.season || "2024-2025"}
                placeholder="2024-2025"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                type="number"
                defaultValue={initialData?.position}
                placeholder="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="played">Matches Played</Label>
              <Input
                id="played"
                name="played"
                type="number"
                defaultValue={initialData?.played || 0}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="won">Won</Label>
              <Input
                id="won"
                name="won"
                type="number"
                defaultValue={initialData?.won || 0}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="drawn">Drawn</Label>
              <Input
                id="drawn"
                name="drawn"
                type="number"
                defaultValue={initialData?.drawn || 0}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lost">Lost</Label>
              <Input
                id="lost"
                name="lost"
                type="number"
                defaultValue={initialData?.lost || 0}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalsFor">Goals For</Label>
              <Input
                id="goalsFor"
                name="goalsFor"
                type="number"
                defaultValue={initialData?.goalsFor || 0}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalsAgainst">Goals Against</Label>
              <Input
                id="goalsAgainst"
                name="goalsAgainst"
                type="number"
                defaultValue={initialData?.goalsAgainst || 0}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                name="points"
                type="number"
                defaultValue={initialData?.points || 0}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form">Form (comma-separated: W, D, L)</Label>
            <Input
              id="form"
              name="form"
              defaultValue={form.join(",")}
              placeholder="W, D, L, W, W"
            />
            <p className="text-xs text-muted-foreground">
              Enter results separated by commas (W=Win, D=Draw, L=Loss)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              name="isActive"
              defaultChecked={initialData?.isActive ?? true}
            />
            <Label htmlFor="isActive">Active (display in standings)</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Standing"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/league/standings">
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
