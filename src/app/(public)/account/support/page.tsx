import { requireUser } from "@/lib/session";
import prisma from "../../../../../prisma";
import { ContactSupportForm } from "@/components/account/contact-support-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Support - FC Fassell",
};

const FAQS = [
  {
    question: "How do I buy tickets for a match?",
    answer:
      "Go to the Tickets page, pick an upcoming match from the schedule, choose your section and quantity, then checkout. Your tickets are confirmed instantly after payment.",
  },
  {
    question: "How do I return or exchange a ticket?",
    answer:
      "Contact us through this form with your order reference and we'll help you transfer the ticket or issue a refund where policy allows.",
  },
  {
    question: "Where is my order from the shop?",
    answer:
      "You'll receive a confirmation email with tracking once your order ships. If it's been more than the stated delivery window, open a ticket and we'll investigate right away.",
  },
  {
    question: "How can I verify my donation was received?",
    answer:
      "Donation confirmations are sent to the email on file. If you don't see one, open a support ticket with the date and amount and we'll follow up.",
  },
  {
    question: "Can I change the email or password on my account?",
    answer:
      "You can change your password under Account Settings. Changing your login email isn't available yet, but you can make a request here and our team can assist.",
  },
];

export default async function SupportPage() {
  const session = await requireUser();

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border bg-card p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Support
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get help with tickets, shop orders, donations, and your account. Our
          team usually replies within 1–2 business days.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-xl border bg-card p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-4">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <ContactSupportForm />

        {tickets.length > 0 && (
          <div className="rounded-xl border bg-card p-6 md:p-8 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Your requests
            </h2>
            <ul className="mt-4 grid gap-3">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {ticket.subject}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        ticket.status === "OPEN"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {ticket.category} · submitted{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {ticket.message}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}