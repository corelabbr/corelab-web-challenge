import * as React from "react";

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="15"
    fill="none"
    viewBox="0 0 14 15"
    {...props}
  >
    <path
      fill="currentColor"
      d="M13.416 2.24 12.092.918 6.844 6.164 1.597.917.273 2.24l5.248 5.247-5.248 5.248 1.324 1.323 5.247-5.247 5.248 5.247 1.324-1.323-5.248-5.248z"
    ></path>
  </svg>
);

export default XIcon;
