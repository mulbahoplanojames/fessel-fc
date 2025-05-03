import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export function StatsCard({ icon, value, label }: StatsCardProps) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-background to-muted">
      <CardContent className="md:p-6 p-2 flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <div className="md:text-3xl text-2xl font-bold mb-2">{value}</div>
        <div className="text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
