"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      placeholder,
      disabled,
      readOnly,
      rows = 3,
      name,
      id,
      form,
      required,
      autoFocus,
      ...props
    },
    ref,
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const hiddenRef = React.useRef<HTMLTextAreaElement>(null);
    const [isEmpty, setIsEmpty] = React.useState(
      value === undefined ? !defaultValue : !value,
    );

    React.useImperativeHandle(ref, () => hiddenRef.current!);

    // Sync controlled value into editor
    React.useEffect(() => {
      if (value === undefined || editorRef.current === null) return;
      const str = String(value ?? "");
      if (editorRef.current.innerText !== str) {
        editorRef.current.innerText = str;
      }
      setIsEmpty(!str);
    }, [value]);

    // Set defaultValue once on mount
    React.useEffect(() => {
      if (defaultValue === undefined || editorRef.current === null) return;
      const str = String(defaultValue);
      editorRef.current.innerText = str;
      setIsEmpty(!str);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = React.useCallback(() => {
      const editor = editorRef.current;
      const hidden = hiddenRef.current;
      if (!editor || !hidden) return;

      const raw = editor.innerText;
      const text = raw === "\n" ? "" : raw;

      hidden.value = text;
      setIsEmpty(!text);

      if (onChange) {
        const nativeEvent = new Event("change", { bubbles: true });
        Object.defineProperty(nativeEvent, "target", { value: hidden });
        onChange(nativeEvent as unknown as React.ChangeEvent<HTMLTextAreaElement>);
      }
    }, [onChange]);

    // 1.5rem per row + 1rem top/bottom padding
    const heightRem = rows * 1.5 + 1;

    return (
      <>
        <textarea
          ref={hiddenRef}
          name={name}
          form={form}
          required={required}
          defaultValue={defaultValue}
          value={value}
          readOnly
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          {...props}
        />
        <ScrollArea
          style={{ height: `${heightRem}rem` }}
          className={cn(
            "w-full rounded-md border border-input bg-transparent transition-colors",
            "focus-within:border-ring",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "dark:bg-input/30",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          <div className="relative">
            {isEmpty && placeholder && (
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-2 text-sm text-muted-foreground select-none"
              >
                {placeholder}
              </span>
            )}
            <div
              ref={editorRef}
              id={id}
              role="textbox"
              aria-multiline="true"
              aria-label={placeholder}
              aria-disabled={disabled}
              aria-readonly={readOnly}
              contentEditable={!disabled && !readOnly ? "true" : "false"}
              suppressContentEditableWarning
              autoFocus={autoFocus}
              onInput={handleInput}
              onKeyDown={onKeyDown}
              className="w-full whitespace-pre-wrap break-words bg-transparent px-3 py-2 text-sm outline-none"
            />
          </div>
        </ScrollArea>
      </>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
