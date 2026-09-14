import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      address,
      city,
      items,
      subtotal,
      shipping,
      personalization,
      total,
      paymentMethod,
      currency,
    } = body;

    if (!customerName || !email) {
      return NextResponse.json(
        { error: "Customer name and email are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName: String(customerName).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: phone ? String(phone).slice(0, 100) : null,
        address: address ? String(address).slice(0, 300) : null,
        city: city ? String(city).slice(0, 100) : null,
        items,
        subtotal: Number(subtotal) || 0,
        shipping: Number(shipping) || 0,
        personalization: Number(personalization) || 0,
        total: Number(total) || 0,
        paymentMethod: paymentMethod ? String(paymentMethod) : "card",
        currency: currency ? String(currency) : "USD",
        status: "PENDING",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}