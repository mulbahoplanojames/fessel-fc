import { requireAdmin } from "@/lib/session";
import prisma from "../../../../../../prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { DonationFAQ } from "@prisma/client";

export default async function DonationFAQsPage() {
  await requireAdmin();
  
  const faqs = await prisma.donationFAQ.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donation FAQs</h1>
          <p className="text-muted-foreground mt-1">
            Manage frequently asked questions on the donation page
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/donation/faqs/add">
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {faqs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No FAQs found. Add your first FAQ to get started.
            </CardContent>
          </Card>
        ) : (
          faqs.map((faq: DonationFAQ) => (
            <Card key={faq.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{faq.question}</h3>
                      {!faq.isActive && (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/donation/faqs/edit/${faq.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" asChild>
                      <Link href={`/admin/donation/faqs/delete/${faq.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
