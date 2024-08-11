import { ComponentProps } from "react";

export default function FillIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.549 12.49s-2 2.17-2 3.5a2 2 0 104 0c0-1.33-2-3.5-2-3.5zm-13.79-1.5l4.79-4.79 4.79 4.79m1.77-1.06L5.169.99 3.759 2.4l2.38 2.38-5.15 5.15c-.59.56-.59 1.53 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.59.59-1.56 0-2.12z"
        fill="#51646E"
      />
      <path d="M7.618 15.987l-4.83-5.044h9.567l-4.737 5.044z" fill="#FFA000" />
    </svg>
  );
}
