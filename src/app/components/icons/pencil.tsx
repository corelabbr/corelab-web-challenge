import { ComponentProps } from "react";

export default function PencilIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.998 6.11l.887.887-8.575 8.557h-.87v-.869l8.558-8.575zm3.4-5.667a.946.946 0 00-.662.274l-1.728 1.728 3.542 3.542 1.728-1.729c.368-.368.368-.982 0-1.331l-2.21-2.21a.927.927 0 00-.67-.274zm-3.4 3.013L.552 13.9v3.542h3.542L14.539 6.997l-3.541-3.541z"
        fill="#51646E"
      />
    </svg>
  );
}
