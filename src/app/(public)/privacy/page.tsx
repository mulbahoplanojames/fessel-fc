import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Privacy Policy
      </h1>
      <p className="text-muted-foreground mb-8">Effective date: September 2026</p>

      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Information we collect
          </h2>
          <p>
            When you create an account, join the fan club, subscribe to our
            newsletter, or place an order, we collect the information you provide
            — such as your name, email address, and contact details. Match
            activity, likes and comments in the fan zone are stored so we can
            display them to other supporters.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            How we use your information
          </h2>
          <p>
            We use your information to process orders and fan club applications,
            send receipts and notifications, improve our website, and keep you
            updated about FC Fassel if you opt in to marketing.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Sharing your information
          </h2>
          <p>
            We do not sell your personal information. Trusted service providers
            (such as payment and email delivery partners) may process data on our
            behalf, and we may disclose information where required by law.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Your rights
          </h2>
          <p>
            You can contact us at any time to access, correct, or delete the
            personal information we hold about you. You can also unsubscribe
            from our newsletter at any time.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Contact
          </h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:info@fcfassell.com" className="text-primary-clr hover:underline">
              info@fcfassell.com
            </a>
            . You can review our{" "}
            <Link href="/terms" className="text-primary-clr hover:underline">
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/cookies" className="text-primary-clr hover:underline">
              cookie policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}