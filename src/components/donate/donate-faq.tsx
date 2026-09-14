import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function DonateFAQ() {
  const [faqs, setFaqs] = React.useState<FAQ[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("/api/donation/faqs");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

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
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
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
