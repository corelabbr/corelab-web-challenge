import { ComponentProps } from "react";

export default function InactiveStarIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.961 13.797l-3.638 2.197.958-4.142L4.07 9.065l4.238-.358L9.96 4.798l1.655 3.91 4.238.357-3.212 2.787.958 4.142m6.038-8.148l-6.958-.59L9.962.84 7.242 7.256l-6.957.59 5.274 4.577-1.578 6.803 5.98-3.61 5.98 3.61-1.587-6.803 5.284-4.577z"
        fill="#455A64"
      />
    </svg>
  );
}
