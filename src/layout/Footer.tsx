import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image
                src="/placeholder.svg?height=48&width=48&text=Logo"
                alt="Kigali Lonestar FC Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-bold text-xl">Kigali Lonestar FC</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The pride of Kigali, competing in the Rwanda Premier League since
              2022. Our mission is to develop local talent and bring joy to our
              fans through beautiful football.
            </p>
            <div className="flex space-x-4 mb-8">
              <Link
                href="https://twitter.com"
                className="bg-muted/50 p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://facebook.com"
                className="bg-muted/50 p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="bg-muted/50 p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                className="bg-muted/50 p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2  w-full">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-full w-full flex-1"
                />
                <Button type="submit" className="rounded-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/matches"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Matches
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/players"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Players
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tickets"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fan-zone"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Fan Zone
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sponsors
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground space-y-3">
                <p>Kigali Lonestar FC</p>
                <p>ULK Campus</p>
                <p>KN 5 Rd, Kigali</p>
                <p>Rwanda</p>
                <p className="pt-3">
                  <a
                    href="mailto:info@kigalilonestar.com"
                    className="hover:text-primary transition-colors"
                  >
                    info@kigalilonestar.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+250791676207"
                    className="hover:text-primary transition-colors"
                  >
                    +250 916 676 207
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Kigali Lonestar FC. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
