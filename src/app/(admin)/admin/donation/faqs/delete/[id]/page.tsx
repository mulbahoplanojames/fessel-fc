import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import prisma from "../../../../../../../../prisma";

export default async function DeleteFAQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const faq = await prisma.donationFAQ.findUnique({
    where: { id },
  });

  if (!faq) {
    notFound();
  }

  async function deleteFAQ() {
    "use server";
    await prisma.donationFAQ.delete({
      where: { id },
    });
    redirect("/admin/donation/faqs");
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/donation/faqs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to FAQs
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete FAQ
          </CardTitle>
          <CardDescription>
            Are you sure you want to delete this FAQ? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted">
              <h3 className="font-medium mb-2">FAQ Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Question:</span> {faq.question}</p>
                <p><span className="font-medium">Answer:</span> {faq.answer}</p>
              </div>
            </div>

            <form action={deleteFAQ}>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href="/admin/donation/faqs">Cancel</Link>
                </Button>
                <Button type="submit" variant="destructive">
                  Delete FAQ
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
