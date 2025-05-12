import type { Metadata } from "next";
import "../globals.css";
import { AppSidebar } from "@/components/admin/layout/app-sidebar";
import { SiteHeader } from "@/components/admin/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import TanstackQueryProvider from "@/context/TankStackQueryProvider";

export const metadata: Metadata = {
  title: "Kigali Lonestar FC - Official Website",
  description:
    "The official website of Kigali Lonestar Football Club. Get the latest news, match updates, player profiles, and buy tickets for upcoming matches.",
  icons: {
    icon: "/badge.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <TanstackQueryProvider>
              <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </TanstackQueryProvider>
          </SidebarInset>
          <Toaster position="bottom-right" />
        </div>
      </SidebarProvider>
    </div>
  );
}
