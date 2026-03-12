import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TextareaProps {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string } }) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
}

function Textarea({
  className,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  placeholder,
  disabled,
  readOnly,
  rows = 3,
}: TextareaProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = React.useState(!value && !defaultValue);

  const handleInput = React.useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      setIsEmpty(!text || text === "\n");
      onChange?.({ target: { value: text === "\n" ? "" : text } });
    }
  }, [onChange]);

  React.useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentText = editorRef.current.innerText;
      if (currentText !== value && !(currentText === "\n" && value === "")) {
        editorRef.current.innerText = value;
        setIsEmpty(!value);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (editorRef.current && defaultValue !== undefined && !value) {
      editorRef.current.innerText = defaultValue;
      setIsEmpty(!defaultValue);
    }
  }, [defaultValue, value]);

  const minHeight = rows * 1.5;

  return (
    <ScrollArea
      className={cn(
        "w-full rounded-md border border-input bg-transparent transition-colors focus-within:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className,
      )}
    >
      <div className="relative">
        {isEmpty && placeholder && (
          <span className="pointer-events-none absolute left-3 top-2 text-sm text-muted-foreground">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          data-slot="textarea"
          contentEditable={!disabled && !readOnly}
          onInput={handleInput}
          onKeyDown={onKeyDown}
          style={{ minHeight: `${minHeight}rem` }}
          className={cn(
            "w-full whitespace-pre-wrap break-words bg-transparent px-3 py-2 text-sm outline-none",
            disabled && "cursor-not-allowed opacity-50",
          )}
        />
      </div>
    </ScrollArea>
  );
}

export { Textarea };
