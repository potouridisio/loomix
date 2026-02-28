import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Discover AI-generated 2D games from the Loomix community and play instantly.",
};

export default function Explore() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
        />
      ))}
    </div>
  );
}
