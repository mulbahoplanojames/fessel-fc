import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import prisma from "../../../../prisma";
import { emailTemplate, sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email, name } = await request.json();
  const trimmedEmail = String(email || "").trim().toLowerCase();

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: trimmedEmail },
  });

  if (existing) {
    if (existing.status === "unsubscribed") {
      await prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { status: "subscribed" },
      });
    }
    return NextResponse.json({ message: "You are already subscribed. Thank you!" });
  }

  await prisma.newsletterSubscriber.create({
    data: {
      email: trimmedEmail,
      name: name ? String(name).trim() : null,
      token: randomUUID(),
      status: "subscribed",
    },
  });

  await sendEmail({
    to: trimmedEmail,
    subject: "Welcome to the Fessel FC newsletter!",
    html: emailTemplate({
      title: "You're on the list!",
      message: `Thanks for subscribing to the Fessel FC newsletter. We'll keep you up to date with match news, exclusive offers and fan club announcements.`,
    }),
  });

  return NextResponse.json({ message: "Subscribed! Check your inbox for a welcome email." }, { status: 201 });
}