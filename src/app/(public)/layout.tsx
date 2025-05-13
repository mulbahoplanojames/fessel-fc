import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/layout/Navbar";
import TanstackQueryProvider from "@/context/TankStackQueryProvider";
import { Footer } from "@/layout/Footer";

export const metadata: Metadata = {
  title: "FC Fassell - Official Website",
  description:
    "The official website of FC Fassell Football Club. Get the latest news, match updates, player profiles, and buy tickets for upcoming matches.",
  icons: {
    icon: "/logo.png",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TanstackQueryProvider>
        <main className="flex-1">{children}</main>
      </TanstackQueryProvider>
      <Footer />
    </div>
  );
}
