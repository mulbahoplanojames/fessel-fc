import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import prisma from "../../../../../prisma";

const ENV_CHECKS = [
  { label: "Database", key: "DATABASE_URL" },
  { label: "Better Auth Secret", key: "BETTER_AUTH_SECRET" },
  { label: "Better Auth URL", key: "BETTER_AUTH_URL" },
  { label: "Base URL (client)", key: "NEXT_PUBLIC_BASE_URI" },
  { label: "Cloudinary Name", key: "CLOUDINARY_CLOUD_NAME" },
  { label: "Cloudinary API Key", key: "CLOUDINARY_API_KEY" },
  { label: "Cloudinary API Secret", key: "CLOUDINARY_API_SECRET" },
  { label: "Google OAuth", key: "GOOGLE_CLIENT_ID" },
  { label: "GitHub OAuth", key: "GITHUB_CLIENT_ID" },
];

export default async function AdminSettingsPage() {
  const [users, matches, players, news, orders, donations, tickets] =
    await Promise.all([
      prisma.user.count(),
      prisma.match.count(),
      prisma.player.count(),
      prisma.news.count(),
      prisma.order.count(),
      prisma.donation.count(),
      prisma.supportTicket.count(),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          System configuration and platform status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment</CardTitle>
          <CardDescription>
            Required services and configuration values.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ENV_CHECKS.map((check) => {
            const present =
              !!process.env[check.key] && process.env[check.key] !== "";
            return (
              <div
                key={check.key}
                className="rounded-lg border p-4 flex items-center justify-between"
              >
                <span className="text-sm font-medium">{check.label}</span>
                <Badge
                  variant="outline"
                  className={
                    present
                      ? "border-green-200 bg-green-100 text-green-700"
                      : "border-red-200 bg-red-100 text-red-700"
                  }
                >
                  {present ? (
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {present ? "Configured" : "Not set"}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>Record counts across the platform.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {[
            { label: "Users", value: users },
            { label: "Matches", value: matches },
            { label: "Players", value: players },
            { label: "News", value: news },
            { label: "Orders", value: orders },
            { label: "Donations", value: donations },
            { label: "Tickets", value: tickets },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border p-4 text-center"
            >
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}