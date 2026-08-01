export function PaperCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground animate-pulse space-y-3">
      <div className="flex justify-between items-start gap-4">
        <div className="h-5 bg-muted rounded w-3/4"></div>
        <div className="h-5 bg-muted rounded w-16 flex-shrink-0"></div>
      </div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-muted rounded w-full"></div>
        <div className="h-3 bg-muted rounded w-full"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <div className="h-6 bg-muted rounded w-20"></div>
        <div className="h-6 bg-muted rounded w-16"></div>
      </div>
    </div>
  )
}
