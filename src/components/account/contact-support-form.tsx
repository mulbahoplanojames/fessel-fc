"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Tickets & Booking",
  "Shop & Orders",
  "Donations",
  "Membership / Fan Zone",
  "Website & Account",
  "Other",
];

export function ContactSupportForm() {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const subject = (formData.get("subject") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, category, message }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        toast.error(data.error ?? "Failed to submit your request.");
        return;
      }

      toast.success("Request submitted. We'll be in touch.");
      event.currentTarget.reset();
      setCategory("");
      router.refresh();
    } catch {
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 md:p-8"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Contact us
      </h2>
      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Short summary of your issue"
            required
            minLength={3}
            maxLength={120}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Describe the issue or question in detail…"
            required
            minLength={10}
            maxLength={3000}
          />
        </div>
        <div>
          <Button
            type="submit"
            disabled={pending || !category}
            className="bg-primary-clr text-white hover:bg-primary-clr/90"
          >
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {pending ? "Submitting…" : "Submit request"}
          </Button>
        </div>
      </div>
    </form>
  );
}