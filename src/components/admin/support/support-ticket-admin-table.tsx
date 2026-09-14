"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import StatusSelect from "@/components/admin/records/status-select";
import axios from "axios";
import { toast } from "sonner";

type TicketRow = {
  id: string;
  subject: string;
  category: string;
  message: string;
  status: string;
  response: string | null;
  user: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
};

type SupportTicketAdminTableProps = {
  tickets: TicketRow[];
};

const TICKET_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const statusBadgeClass = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-700 border-red-200";
    case "IN_PROGRESS":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "RESOLVED":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-muted text-muted-foreground border-muted";
  }
};

export default function SupportTicketAdminTable({
  tickets,
}: SupportTicketAdminTableProps) {
  const router = useRouter();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const saveResponse = async (ticketId: string) => {
    const response = (responses[ticketId] ?? "").trim();
    if (!response) return;

    try {
      setSavingId(ticketId);
      await axios.post("/api/admin/record", {
        kind: "ticket",
        id: ticketId,
        response,
      });
      toast.success("Response saved");
      setResponses((prev) => ({ ...prev, [ticketId]: "" }));
      router.refresh();
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error("Failed to save response");
    } finally {
      setSavingId(null);
    }
  };

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No tickets found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id}>
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-base">{ticket.subject}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {ticket.user.name} ({ticket.user.email})
                </span>
                <Badge variant="outline">{ticket.category}</Badge>
                <span className="text-xs">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={statusBadgeClass(ticket.status)}
              >
                {ticket.status}
              </Badge>
              <StatusSelect
                kind="ticket"
                id={ticket.id}
                value={ticket.status}
                options={TICKET_STATUSES}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{ticket.message}</p>

            {ticket.response ? (
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Admin response ({new Date(ticket.updatedAt).toLocaleString()})
                </p>
                <p className="text-sm">{ticket.response}</p>
              </div>
            ) : null}

            <div className="space-y-2">
              <Textarea
                placeholder="Write a response to this ticket..."
                value={responses[ticket.id] ?? ""}
                onChange={(e) =>
                  setResponses((prev) => ({
                    ...prev,
                    [ticket.id]: e.target.value,
                  }))
                }
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => saveResponse(ticket.id)}
                  disabled={!(responses[ticket.id] ?? "").trim() || savingId === ticket.id}
                >
                  {savingId === ticket.id ? "Saving..." : "Save Response"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}