import React from "react";

export function Logo(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width="160px"
      height="160px"
      {...props}
    >
      <path
        d="M 128 32 L 128 128 L 32 128 L 32 96 L 64 96 L 64 32 L 128 32 Z"
        fill="currentColor"
      />
    </svg>
  );
}
