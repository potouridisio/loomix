import { Suspense } from "react";

import { AppGridBackground } from "@/components/app-grid-background";
import { ExploreGameGrid } from "@/components/explore-game-grid";
import { ExploreSidebar } from "@/components/explore-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-0 flex flex-1 pt-14 md:pt-0">
        {/* App Grid Background */}
        <AppGridBackground className="opacity-[0.04]!" />

        {/* Filters Sidebar */}
        <ExploreSidebar />

        {/* Games Grid */}
        <div className="flex-1 p-4 sm:p-6">
          <Suspense fallback={<GameGridSkeleton />}>
            <ExploreGameGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function GameGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
