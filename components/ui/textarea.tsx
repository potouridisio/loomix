import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

function Textarea(
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
    form,
    required,
    ...props
  }: TextareaProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const hiddenTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [isEmpty, setIsEmpty] = React.useState(!value && !defaultValue);

  const handleInput = React.useCallback(() => {
    if (editorRef.current && hiddenTextareaRef.current) {
      const text = editorRef.current.innerText;
      hiddenTextareaRef.current.value = text === "\n" ? "" : text;
      setIsEmpty(!text || text === "\n");
      onChange?.({ target: { value: text === "\n" ? "" : text } } as any);
    }
  }, [onChange]);

  React.useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentText = editorRef.current.innerText;
      if (currentText !== value && !(currentText === "\n" && value === "")) {
        editorRef.current.innerText = String(value);
        setIsEmpty(!value);
        if (hiddenTextareaRef.current) {
          hiddenTextareaRef.current.value = String(value);
        }
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (editorRef.current && defaultValue !== undefined && !value) {
      editorRef.current.innerText = String(defaultValue);
      setIsEmpty(!defaultValue);
      if (hiddenTextareaRef.current) {
        hiddenTextareaRef.current.value = String(defaultValue);
      }
    }
  }, [defaultValue, value]);

  React.useImperativeHandle(ref, () => hiddenTextareaRef.current as HTMLTextAreaElement);

  const minHeight = rows * 1.5;

  return (
    <>
      <textarea
        ref={hiddenTextareaRef}
        name={name}
        form={form}
        required={required}
        defaultValue={defaultValue}
        className="hidden"
        {...props}
      />
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
              "w-full whitespace-pre-wrap wrap-break-word bg-transparent px-3 py-2 text-sm outline-none",
              disabled && "cursor-not-allowed opacity-50",
            )}
          />
        </div>
      </ScrollArea>
    </>
  );
}

export { Textarea: React.forwardRef(Textarea) as React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>> };
