import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-muted-foreground mb-8">Effective date: September 2026</p>

      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Acceptance of terms
          </h2>
          <p>
            By using the FC Fassel website and services you agree to these terms.
            If you do not agree, please do not use the site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. Fan zone conduct
          </h2>
          <p>
            Fans are encouraged to share posts and photos in the fan zone, but
            abusive, defamatory, or illegal content is not permitted. We reserve
            the right to moderate or remove content and to suspend accounts that
            break these rules.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. Fan club membership
          </h2>
          <p>
            Fan club memberships are personal and non-transferable. Benefits are
            subject to availability and may change from time to time. Membership
            confirmation is provided by email once an application is approved.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. Shop orders
          </h2>
          <p>
            All orders are subject to availability. Prices are displayed in the
            currency shown and may change without notice. Receipts and
            confirmation emails are sent to the address provided at checkout.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Limitation of liability
          </h2>
          <p>
            To the extent permitted by law, FC Fassel is not liable for indirect
            or consequential losses arising from use of this website. Content on
            the site is provided for information only.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Contact
          </h2>
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:info@fcfassell.com" className="text-primary-clr hover:underline">
              info@fcfassell.com
            </a>
            . Read our{" "}
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