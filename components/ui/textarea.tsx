import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <ScrollArea
      className={cn(
        "w-full rounded-md border border-input bg-transparent transition-colors focus-within:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className,
      )}
    >
      <textarea
        data-slot="textarea"
        className="field-sizing-content min-h-full w-full resize-none border-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden"
        {...props}
      />
    </ScrollArea>
  );
}

export { Textarea };
