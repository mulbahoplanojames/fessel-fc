"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "sonner";

type SubscriberRow = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  createdAt: string;
};

type NewsletterAdminProps = {
  subscribers: SubscriberRow[];
};

export default function NewsletterAdmin({ subscribers }: NewsletterAdminProps) {
  const router = useRouter();

  const toggleStatus = async (id: string, current: string) => {
    const next = current === "subscribed" ? "unsubscribed" : "subscribed";
    try {
      await axios.patch("/api/admin/newsletter", { id, status: next });
      toast.success(next === "subscribed" ? "Subscribed" : "Unsubscribed");
      router.refresh();
    } catch {
      toast.error("Failed to update subscriber");
    }
  };

  const removeSubscriber = async (id: string) => {
    if (!window.confirm("Delete this subscriber permanently?")) return;
    try {
      await axios.delete("/api/admin/newsletter", { data: { id } });
      toast.success("Deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete subscriber");
    }
  };

  if (subscribers.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No newsletter subscribers yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subscriber</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscribers.map((sub) => (
          <TableRow key={sub.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{sub.email}</span>
                {sub.name && (
                  <span className="text-sm text-muted-foreground">
                    {sub.name}
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
              {new Date(sub.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => toggleStatus(sub.id, sub.status)}
              >
                <Badge
                  variant={sub.status === "subscribed" ? "default" : "secondary"}
                >
                  {sub.status}
                </Badge>
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSubscriber(sub.id)}
              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}