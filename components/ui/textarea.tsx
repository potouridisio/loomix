import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <ScrollArea
      className={cn(
        "w-full min-h-20 max-h-96 rounded-md border border-input bg-transparent transition-colors focus-within:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className,
      )}
    >
      <textarea
        data-slot="textarea"
        className="w-full resize-none border-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring aria-invalid:text-destructive [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        {...props}
      />
    </ScrollArea>
  );
}

export { Textarea };
