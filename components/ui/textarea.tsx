import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  onChange,
  value,
  defaultValue,
  rows = 1,
  ...props
}: React.ComponentProps<"textarea">) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const resize = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const isEmpty = el.value === "";
    if (isEmpty) {
      el.style.height = "";
      return;
    }

    el.style.height = `${el.scrollHeight}px`;
  }, []);

  React.useLayoutEffect(() => {
    resize();
  }, [resize, value]);

  return (
    <ScrollArea
      className={cn(
        "w-full rounded-md border border-input bg-transparent transition-colors focus-within:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        "**:data-radix-scroll-area-viewport:max-h-40",
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        data-slot="textarea"
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "block w-full resize-none overflow-hidden border-none bg-transparent px-3 py-2 text-sm outline-none",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "min-h-10",
        )}
        onChange={(event) => {
          resize();
          onChange?.(event);
        }}
        {...props}
      />
    </ScrollArea>
  );
}

export { Textarea };