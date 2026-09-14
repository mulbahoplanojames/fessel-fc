import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import axios from "axios";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string | null;
  content: string;
  isCorporate: boolean;
}

export default function DonateTestimonial() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/donation/testimonials");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Donor Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Donor Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from those who have already made a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg dark:bg-background">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  {testimonial.image && (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-1">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {testimonial.role}
                  </p>
                  <p className="italic">&apos;{testimonial.content}&apos;</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
