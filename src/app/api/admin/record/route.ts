import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";
import { emailTemplate, sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { kind, id, status, response } = body;

    if (!kind || !id) {
      return NextResponse.json(
        { error: "kind and id are required." },
        { status: 400 }
      );
    }

    let updated;
    switch (kind) {
      case "ticket": {
        updated = await prisma.supportTicket.update({
          where: { id: String(id) },
          data: {
            status: status ? String(status) : undefined,
            response: response !== undefined ? String(response) : undefined,
            respondedAt:
              response !== undefined ? new Date() : undefined,
          },
        });
        if (response !== undefined) {
          const ticketUser = await prisma.user.findUnique({
            where: { id: updated.userId },
          });
          if (ticketUser) {
            await sendEmail({
              to: ticketUser.email,
              subject: `Fessel FC support update: ${updated.subject}`,
              html: emailTemplate({
                title: "Your support request was answered",
                message: `<strong>Subject:</strong> ${updated.subject}<br/><br/><strong>Our response:</strong><br/>${String(response)}`,
              }),
            });
          }
        }
        break;
      }
      case "donation": {
        updated = await prisma.donation.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        if (status === "COMPLETED") {
          const name = updated.anonymous ? "friend" : updated.firstName;
          await sendEmail({
            to: updated.email,
            subject: "Thank you for your donation to Fessel FC",
            html: emailTemplate({
              title: `Thank you, ${name}!`,
              message: `We've confirmed your donation of ${updated.amount.toLocaleString()} ${updated.currency} to Fessel FC. Every contribution helps the team and the community — we truly appreciate your support.`,
            }),
          });
        }
        break;
      }
      case "sponsorship": {
        updated = await prisma.sponsorshipRequest.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        if (status === "APPROVED") {
          await sendEmail({
            to: updated.email,
            subject: "Your Fessel FC sponsorship was approved",
            html: emailTemplate({
              title: `Welcome aboard, ${updated.company}!`,
              message: `Great news — your sponsorship request (${updated.tier} tier) has been approved. Our team will reach out to finalise the partnership details.`,
            }),
          });
        }
        break;
      }
      case "order": {
        updated = await prisma.order.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        if (status === "CONFIRMED") {
          const items = Array.isArray(updated.items)
            ? (updated.items as { name?: string; quantity?: number; price?: number }[])
            : [];
          const itemsHtml = items.length
            ? `<ul style="margin:12px 0;padding-left:20px;">${items
                .map(
                  (item) =>
                    `<li style="font-size:14px;margin:4px 0;">${item.name ?? "Item"} &times; ${item.quantity ?? 1} — $${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}</li>`
                )
                .join("")}</ul>`
            : `<p style="font-size:14px;">Order total: $${updated.total.toFixed(2)}</p>`;
          await sendEmail({
            to: updated.email,
            subject: `Order confirmed — ${updated.id.slice(-6).toUpperCase()}`,
            html: emailTemplate({
              title: "Your order is confirmed!",
              message: `Hi ${updated.customerName}, thank you for shopping with Fessel FC. Your order is confirmed and being prepared.<br/><br/>${itemsHtml}<br/><strong>Total (${updated.currency}): ${updated.currency === "USD" ? "$" : ""}${updated.total.toFixed(2)}</strong>`,
            }),
          });
        }
        break;
      }
      case "fanclub": {
        updated = await prisma.fanClubMember.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        if (status === "active") {
          await sendEmail({
            to: updated.email,
            subject: "Your Fessel FC Fan Club membership is active!",
            html: emailTemplate({
              title: "Welcome to the Fessel FC Fan Club!",
              message: `Congratulations ${updated.firstName}! Your ${updated.membershipType.toUpperCase()} membership is now active. You've unlocked member benefits across the site. GO BLUE-GREEN!`,
            }),
          });
        }
        break;
      }
      default:
        return NextResponse.json(
          { error: "Unsupported record kind." },
          { status: 400 }
        );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      {
        error: "Failed to update record",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}