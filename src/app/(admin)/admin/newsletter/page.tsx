import prisma from "../../../../../prisma";
import NewsletterAdmin from "@/components/admin/records/newsletter-admin";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  const subscribed = subscribers.filter((s) => s.status === "subscribed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
        <p className="text-muted-foreground">
          {subscribed} active subscriber
          {subscribed === 1 ? "" : "s"} from the newsletter signup.
        </p>
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <NewsletterAdmin
          subscribers={subscribers.map((s) => ({
            ...s,
            createdAt: s.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}