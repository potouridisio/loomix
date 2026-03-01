import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Update your profile information and manage your Loomix account settings.",
};

export default function Account() {
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
