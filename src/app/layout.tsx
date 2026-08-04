import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { SessionProvider } from "next-auth/react";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FC Fassell - Official Website",
  description:
    "The official website of FC Fassell Football Club. Get the latest news, match updates, player profiles, and buy tickets for upcoming matches. Follow us on social media for the latest updates.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <CartProvider>
          <body className={poppins.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <main className="flex-1">{children}</main>
              </div>
            </ThemeProvider>
          </body>
        </CartProvider>
      </SessionProvider>
    </html>
  );
}
