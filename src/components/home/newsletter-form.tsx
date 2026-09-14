"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast("Error", { description: "Please enter your email address." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>("/api/newsletter", {
        email: email.trim(),
      });
      toast("Subscribed!", { description: response.data.message });
      setEmail("");
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? (error.response as { data?: { error?: string } }).data?.error
          : undefined;
      toast("Error", { description: message || "Could not subscribe. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
      <Input
        type="email"
        placeholder="Your email"
        className="rounded-full w-full flex-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
        disabled={loading}
        className="rounded-full text-white bg-primary-clr hover:bg-primary-clr/90"
      >
        Subscribe
      </Button>
    </form>
  );
}