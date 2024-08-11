import { ComponentProps } from "react";

export default function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.668 2.242L12.344.92 7.097 6.166 1.849.92.525 2.242 5.773 7.49.525 12.738 1.85 14.06l5.248-5.247 5.247 5.247 1.324-1.323L8.42 7.49l5.248-5.248z"
        fill="#51646E"
      />
    </svg>
  );
}
