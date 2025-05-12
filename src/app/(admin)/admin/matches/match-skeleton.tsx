import { Skeleton } from "@/components/ui/skeleton";

export default function MatchesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Card Section */}
      <div className="border rounded-lg p-6 space-y-6">
        {/* Card Header */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[200px]" />
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Teams and Match Info */}
                <div className="flex items-center gap-4">
                  {/* Home Team */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  {/* VS / Badge */}
                  <Skeleton className="h-6 w-16" />

                  {/* Away Team */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Date, Time, Venue, Actions */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
