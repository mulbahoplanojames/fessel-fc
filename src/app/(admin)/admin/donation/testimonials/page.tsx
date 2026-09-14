import { requireAdmin } from "@/lib/session";
import prisma from "../../../../../../prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import type { DonationTestimonial } from "@prisma/client";

export default async function DonationTestimonialsPage() {
  await requireAdmin();
  
  const testimonials = await prisma.donationTestimonial.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donation Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            Manage donor testimonials displayed on the donation page
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/donation/testimonials/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No testimonials found. Add your first testimonial to get started.
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial: DonationTestimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {testimonial.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        {testimonial.isCorporate && (
                          <Badge variant="secondary">Corporate</Badge>
                        )}
                        {!testimonial.isActive && (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
                      <p className="text-sm italic">&apos;{testimonial.content}&apos;</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/donation/testimonials/edit/${testimonial.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" asChild>
                      <Link href={`/admin/donation/testimonials/delete/${testimonial.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
