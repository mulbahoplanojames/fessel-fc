export default function ProductLoading() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="animate-pulse">
        <div className="h-8 w-32 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-muted rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-muted rounded"></div>
            <div className="h-4 w-1/2 bg-muted rounded"></div>
            <div className="h-8 w-1/4 bg-muted rounded mt-6"></div>
            <div className="h-10 w-full bg-muted rounded mt-6"></div>
            <div className="h-10 w-full bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
