import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type TextareaProps = Omit<React.ComponentProps<"textarea">, "children">;

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
}

function useComposedRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return React.useCallback((node: T | null) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  }, refs);
}

function useControllableState<T>({ prop, defaultProp }: { prop?: T; defaultProp: T }) {
  const [uncontrolledState, setUncontrolledState] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledState;

  const setValue = React.useCallback(
    (nextValue: React.SetStateAction<T>) => {
      if (isControlled) return;

      setUncontrolledState((prevState) =>
        typeof nextValue === "function" ? (nextValue as (prevState: T) => T)(prevState) : nextValue,
      );
    },
    [isControlled],
  );

  return [value, setValue] as const;
}

function placeCaretAtEnd(element: HTMLElement) {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

function Textarea({
  ref,
  className,
  value: valueProp,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled,
  readOnly,
  placeholder,
  ...props
}: TextareaProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const editableRef = React.useRef<HTMLDivElement>(null);

  const composedTextareaRef = useComposedRefs(ref, textareaRef);

  const [value, setValue] = useControllableState<string>({
    prop: typeof valueProp === "string" ? valueProp : undefined,
    defaultProp: typeof defaultValue === "string" ? defaultValue : "",
  });

  const isControlled = valueProp !== undefined;

  const syncEditable = React.useCallback((nextValue: string) => {
    const editable = editableRef.current;
    if (!editable) return;

    if (editable.textContent !== nextValue) {
      editable.textContent = nextValue;
    }
  }, []);

  React.useEffect(() => {
    syncEditable(value ?? "");
  }, [syncEditable, value]);

  const dispatchTextareaInput = React.useCallback((nextValue: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const valueSetter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set;

    valueSetter?.call(textarea, nextValue);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  const focusEditable = React.useCallback(
    (moveCaretToEnd = false) => {
      const editable = editableRef.current;
      if (!editable || disabled) return;

      editable.focus();

      if (moveCaretToEnd && !readOnly) {
        placeCaretAtEnd(editable);
      }
    },
    [disabled, readOnly],
  );

  const scrollCaretIntoView = React.useCallback(() => {
    const root = rootRef.current;
    const editable = editableRef.current;
    if (!root || !editable) return;

    const viewport = root.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]");

    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
      return;
    }

    editable.scrollTop = editable.scrollHeight;
  }, []);

  const updateValue = React.useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      dispatchTextareaInput(nextValue);
    },
    [dispatchTextareaInput, setValue],
  );

  const handleInput = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      updateValue(event.currentTarget.textContent ?? "");
    },
    [updateValue],
  );

  const handlePaste = React.useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();

      const text = event.clipboardData.getData("text/plain");
      const selection = window.getSelection();

      if (!selection?.rangeCount) return;

      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(text));
      selection.collapseToEnd();

      const nextValue = event.currentTarget.textContent ?? "";
      updateValue(nextValue);

      requestAnimationFrame(() => {
        const editable = editableRef.current;
        if (!editable) return;

        editable.focus();
        placeCaretAtEnd(editable);
        scrollCaretIntoView();
      });
    },
    [scrollCaretIntoView, updateValue],
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      const editable = editableRef.current;
      const target = event.target as Element | null;

      if (!editable || !target) return;
      if (editable.contains(target)) return;
      if (target.closest("[data-radix-scroll-area-scrollbar]")) return;

      event.preventDefault();
      focusEditable(true);
    },
    [disabled, focusEditable],
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(event as unknown as React.FocusEvent<HTMLTextAreaElement>);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const nextValue = event.currentTarget.textContent ?? "";
      syncEditable(isControlled ? (value ?? "") : nextValue);

      onBlur?.(event as unknown as React.FocusEvent<HTMLTextAreaElement>);
    },
    [isControlled, onBlur, syncEditable, value],
  );

  return (
    <ScrollArea
      ref={rootRef}
      onPointerDown={handlePointerDown}
      className={cn(
        "w-full cursor-text rounded-md border border-input bg-transparent transition-colors select-text focus-within:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 **:data-radix-scroll-area-scrollbar:cursor-default dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <textarea
        ref={composedTextareaRef}
        data-slot="textarea"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        disabled={disabled}
        readOnly={readOnly}
        value={value ?? ""}
        onChange={onChange}
        {...props}
      />

      <div
        ref={editableRef}
        contentEditable={!disabled && !readOnly}
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        data-placeholder={placeholder}
        data-empty={(value ?? "").length === 0 ? "true" : "false"}
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "min-h-full w-full px-3 py-2 text-sm wrap-break-word whitespace-pre-wrap outline-none data-[empty=true]:before:pointer-events-none data-[empty=true]:before:text-muted-foreground data-[empty=true]:before:content-[attr(data-placeholder)]",
          disabled && "pointer-events-none",
        )}
      />
    </ScrollArea>
  );
}

export { Textarea };
