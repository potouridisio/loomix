import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description:
    "Manage your Loomix subscription, upgrade to Pro, and view billing details.",
};

export default function Billing() {
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
