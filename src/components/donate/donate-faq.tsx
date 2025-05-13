import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    id: 1,
    title: "Is my donation tax-deductible?",
    description:
      "Yes, all donations to Fassel FC Foundation are tax-deductible under Liberia tax law. You will receive an official receipt for your donation that can be used for tax purposes.",
  },
  {
    id: 2,
    title: "How is my donation used?",
    description:
      "Your donation directly supports our three main initiativesyouth development programs, facility improvements, and community outreach. We publish an annual impact report that details how funds are allocated and the outcomes achieved.",
  },
  {
    id: 3,
    title: "Can I specify how my donation is used?",
    description:
      "Yes, you can designate your donation for a specific program or initiative. Please include this information in the message field when making your donation, or contact our donor relations team for larger gifts.",
  },
  {
    id: 4,
    title: "How do I cancel or modify a recurring donation?",
    description:
      "You can cancel or modify your recurring donation at any time by logging into your donor account on our website or by contacting our donor support team at donations@kigalilonestar.com.",
  },
  {
    id: 5,
    title: "Are there benefits for donors?",
    description:
      "  Yes, depending on your donation level, benefits may include recognition on our website, exclusive event invitations, behind-the-scenes tours, and priority ticket access. Corporate sponsors receive additional benefits as outlined in our sponsorship packages.",
  },
  {
    id: 6,
    title: "Can I donate equipment or services instead of money?",
    description:
      "In-kind donations of equipment, services, or expertise are greatly appreciated. Please contact our team to discuss your specific in-kind donation and how it can support our mission.",
  },
];

export default function DonateFAQ() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about donating to Fassel FC
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id.toString()} key={faq.id}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>{faq.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex items-center justify-center mt-8 gap-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">
              Have more questions?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
