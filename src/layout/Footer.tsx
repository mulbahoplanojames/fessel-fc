import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { informationsLink, quickLinks } from "@/data/footer-data";

const socialLinks = [
  {
    label: "Facebook",
    icon: <Facebook />,
    path: "https://facebook.com",
  },
  {
    label: "Instagram",
    icon: <Instagram />,
    path: "https://instagram.com",
  },
  {
    label: "Twitter",
    icon: <Twitter />,
    path: "https://twitter.com",
  },
  {
    label: "Youtube",
    icon: <Youtube />,
    path: "https://youtube.com",
  },
];
export function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image
                src="/placeholder.svg?height=48&width=48&text=Logo"
                alt="Fassel FC Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-bold text-xl">FC Fassel</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The pride of Liberia, competing in the Liberian Premier League.
              Our mission is to develop local talent and bring joy to our fans
              through beautiful football.
            </p>
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  className="bg-muted/50 p-2 rounded-full text-muted-foreground hover:text-primary-clr hover:bg-muted transition-colors"
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
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
                <Button
                  type="submit"
                  className="rounded-full text-white bg-primary-clr hover:bg-primary-clr/90"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-3">
                {informationsLink.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="text-muted-foreground hover:text-primary-clr transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground space-y-3">
                <p>Football Club Fassell</p>
                <p>
                  2nd Floor, Tugbeh Doe Building, Corner of Front & Buchanan
                  Streets
                </p>
                <p>Monrovia</p>
                <p>Liberia</p>
                <p className="pt-3">
                  <a
                    href="mailto:info@fcfassell.com"
                    className="hover:text-primary-clr transition-colors"
                  >
                    info@fcfassell.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+231123456789"
                    className="hover:text-primary-clr transition-colors"
                  >
                    +231 123 456 789
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FC Fassel. All rights reserved.
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
