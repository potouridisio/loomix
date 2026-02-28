import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Generate playable 2D games with AI. Play instantly and bring your ideas to life with Loomix.",
};

export default function Home() {
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
