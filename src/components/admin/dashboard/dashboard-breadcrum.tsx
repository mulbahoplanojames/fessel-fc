import { Button } from "@/components/ui/button";
import { FileText, TrendingUp } from "lucide-react";
import React from "react";

const DashboardBreadcrum = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to Fassel FC admin dashboard.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Download Reports
        </Button>
        <Button size="sm">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>
    </div>
  );
};

export default DashboardBreadcrum;
