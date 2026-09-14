import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Cookie Policy</h1>
      <p className="text-muted-foreground mb-8">Effective date: September 2026</p>

      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            What are cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the site remember your preferences and understand
            how the site is used.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            How we use cookies
          </h2>
          <p>
            We use cookies to keep you signed in, remember items in your cart,
            and track anonymous usage to improve the website. We do not use
            cookies to collect personal information without your consent.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Managing cookies
          </h2>
          <p>
            You can control or delete cookies through your browser settings. If
            you disable cookies, some parts of the site — such as the shop cart —
            may not work correctly.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Contact
          </h2>
          <p>
            Questions about cookies? Email{" "}
            <a href="mailto:info@fcfassell.com" className="text-primary-clr hover:underline">
              info@fcfassell.com
            </a>
            . See our{" "}
            <Link href="/privacy" className="text-primary-clr hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}