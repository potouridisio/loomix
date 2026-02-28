import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
  description:
    "Describe your idea and generate a playable 2D game instantly using Loomix AI.",
};

export default function Create() {
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
