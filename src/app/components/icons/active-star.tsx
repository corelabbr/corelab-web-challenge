import { ComponentProps } from "react";

export default function ActiveStarIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.533 6.969l-5.154.793 4.56 3.667-1.19 5.55 4.163-3.171 5.154 3.171-1.388-5.55 3.866-3.667-5.253-.793-2.38-5.154L7.534 6.97z"
        fill="#FFA000"
      />
      <path
        d="M9.991 13.176l-3.638 2.197.958-4.142L4.1 8.445l4.238-.358 1.654-3.91 1.655 3.91 4.238.358-3.212 2.786.958 4.142m6.038-8.148l-6.957-.59L9.99.22 7.272 6.635l-6.957.59 5.274 4.577-1.577 6.803 5.98-3.61 5.98 3.61-1.588-6.803 5.284-4.577z"
        fill="#455A64"
      />
    </svg>
  );
}
