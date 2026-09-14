import prisma from "../../../../../prisma";
import SupportTicketAdminTable from "@/components/admin/support/support-ticket-admin-table";

export default async function AdminSupportPage() {
  const tickets = await prisma.supportTicket.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const serialized = tickets.map((ticket) => ({
    id: ticket.id,
    subject: ticket.subject,
    category: ticket.category,
    message: ticket.message,
    status: ticket.status,
    response: ticket.response,
    user: ticket.user,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground mt-1">
          Incoming support requests from fans and users.
        </p>
      </div>

      <SupportTicketAdminTable tickets={serialized} />
    </div>
  );
}