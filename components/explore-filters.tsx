"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const genres = [
  { id: "platformer", label: "Platformer" },
  { id: "arcade", label: "Arcade" },
  { id: "adventure", label: "Adventure" },
  { id: "shooter", label: "Shooter" },
  { id: "puzzle", label: "Puzzle" },
];

const sortOptions = [
  { id: "trending", label: "Trending" },
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "top-rated", label: "Top Rated" },
];

interface ExploreFiltersProps {
  hideSearch?: boolean;
}

export function ExploreFilters({ hideSearch = false }: ExploreFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortFromUrl = searchParams.get("sort");
  const validSort = sortOptions.find((opt) => opt.id === sortFromUrl)?.id || "trending";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState(validSort);

  // Update sort when URL changes
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const valid = sortOptions.find((opt) => opt.id === sortParam)?.id || "trending";
    setSelectedSort(valid);
  }, [searchParams]);

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId],
    );
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "trending") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/explore${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedSort("trending");
    router.push("/explore", { scroll: false });
  };

  return (
    <div className="flex flex-col">
      {/* Search */}
      {!hideSearch && (
        <>
          <div className="space-y-2 px-6 py-4">
            <Label className="text-sm font-medium">Search</Label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Sort */}
      <div className="space-y-2 px-6 py-4">
        <Label className="text-sm font-medium">Sort By</Label>
        <RadioGroup value={selectedSort} onValueChange={handleSortChange} className="gap-0.5">
          {sortOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm"
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <span
                className={selectedSort === option.id ? "text-foreground" : "text-muted-foreground"}
              >
                {option.label}
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Genres */}
      <div className="space-y-2 px-6 py-4">
        <Label className="text-sm font-medium">Genres</Label>
        <div className="space-y-0.5">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm"
            >
              <Checkbox
                id={genre.id}
                checked={selectedGenres.includes(genre.id)}
                onCheckedChange={() => handleGenreToggle(genre.id)}
              />
              <span
                className={
                  selectedGenres.includes(genre.id) ? "text-foreground" : "text-muted-foreground"
                }
              >
                {genre.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Clear Filters */}
      <div className="px-6 py-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
          disabled={selectedGenres.length === 0 && !searchQuery && selectedSort === "trending"}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
