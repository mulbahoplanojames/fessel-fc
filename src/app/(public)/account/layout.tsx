import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { AccountNav } from "@/components/account/account-nav";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "My Account - FC Fassell",
  description:
    "View and manage your FC Fassell profile, account settings, and support requests.",
};

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireUser();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-6">
      <AccountNav />
      {children}
      <Toaster position="bottom-right" />
    </div>
  );
}