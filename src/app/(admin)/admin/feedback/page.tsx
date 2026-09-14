import prisma from "../../../../../prisma";
import SupportTicketAdminTable from "@/components/admin/support/support-ticket-admin-table";

export default async function AdminFeedbackPage() {
  const tickets = await prisma.supportTicket.findMany({
    where: { category: "Feedback / Suggestion" },
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
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Feedback and suggestions submitted through the support centre.
        </p>
      </div>

      <SupportTicketAdminTable tickets={serialized} />
    </div>
  );
}