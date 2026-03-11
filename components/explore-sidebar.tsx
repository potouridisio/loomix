"use client";

import { Suspense } from "react";

import { ExploreFilters } from "@/components/explore-filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function FiltersSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-8 w-24" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
      <Skeleton className="h-8 w-24" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  );
}

export function ExploreSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/50 lg:block">
      <ScrollArea className="h-full">
        <Suspense fallback={<FiltersSkeleton />}>
          <ExploreFilters />
        </Suspense>
      </ScrollArea>
    </aside>
  );
}
