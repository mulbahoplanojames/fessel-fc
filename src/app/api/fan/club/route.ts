import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireUserInRequest } from "@/lib/session";
import { emailTemplate, sendEmail } from "@/lib/email";

const TIER_AMOUNTS: Record<string, number> = {
  standard: 5000,
  premium: 10000,
  vip: 20000,
};

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  const body = await request.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    country,
    postalCode,
    membershipType,
    agreeTerms,
    agreeMarketing,
  } = body;

  if (!firstName || !lastName || !email || !membershipType || !agreeTerms) {
    return NextResponse.json({ error: "Please fill in the required fields and accept the terms." }, { status: 400 });
  }
  if (!["standard", "premium", "vip"].includes(String(membershipType))) {
    return NextResponse.json({ error: "Invalid membership type." }, { status: 400 });
  }

  const existing = await prisma.fanClubMember.findFirst({
    where: {
      OR: [
        { email: String(email).toLowerCase() },
        ...(session ? [{ userId: session.user.id }] : []),
      ],
    },
  });

  if (existing) {
    return NextResponse.json({
      error:
        existing.status === "active"
          ? "You are already an active fan club member."
          : "There is already a pending application for this email.",
    }, { status: 409 });
  }

  const member = await prisma.fanClubMember.create({
    data: {
      userId: session?.user.id || null,
      firstName,
      lastName,
      email: String(email).toLowerCase(),
      phone: phone || null,
      address: address || null,
      city: city || null,
      country: country || null,
      postalCode: postalCode || null,
      membershipType,
      amount: TIER_AMOUNTS[String(membershipType)],
      agreeTerms: !!agreeTerms,
      agreeMarketing: !!agreeMarketing,
      status: "pending",
    },
  });

  await sendEmail({
    to: String(email),
    subject: "Welcome to the Fessel FC Fan Club!",
    html: emailTemplate({
      title: `Welcome to the Fan Club, ${firstName}!`,
      message: `Thanks for joining the Fessel FC Fan Club as a ${membershipType.toUpperCase()} member. We have received your application and will confirm your membership shortly — once approved you will unlock member benefits across the site.`,
    }),
  });

  return NextResponse.json(
    {
      member: {
        id: member.id,
        firstName: member.firstName,
        status: member.status,
        membershipType: member.membershipType,
      },
    },
    { status: 201 }
  );
}