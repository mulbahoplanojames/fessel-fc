import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      donationType,
      amount,
      currency,
      paymentMethod,
      firstName,
      lastName,
      email,
      phone,
      message,
      anonymous,
    } = body;

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "First name and email are required." },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "A valid donation amount is required." },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        donationType: donationType ? String(donationType) : "one-time",
        amount: numericAmount,
        currency: currency ? String(currency) : "LRD",
        paymentMethod: paymentMethod ? String(paymentMethod) : "card",
        firstName: String(firstName).slice(0, 100),
        lastName: lastName ? String(lastName).slice(0, 100) : null,
        email: String(email).slice(0, 200),
        phone: phone ? String(phone).slice(0, 100) : null,
        message: message ? String(message).slice(0, 1000) : null,
        anonymous: anonymous === true,
        status: "PENDING",
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json(
      {
        error: "Failed to create donation",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}