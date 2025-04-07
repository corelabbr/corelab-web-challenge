import * as React from "react";

const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="m7.48 7.504-5.154.793 4.56 3.667-1.19 5.55 4.163-3.171 5.153 3.171-1.387-5.55 3.865-3.667-5.253-.793L9.86 2.35z"
    ></path>
    <path
      fill="#455A64"
      d="M9.938 13.711 6.3 15.908l.958-4.142L4.045 8.98l4.239-.358 1.654-3.909 1.655 3.91 4.238.357-3.212 2.787.957 4.142m6.038-8.148-6.957-.59L9.938.755 7.22 7.17l-6.957.59 5.274 4.577-1.578 6.803 5.98-3.61 5.98 3.61-1.587-6.803z"
    ></path>
  </svg>
);

export default SvgIcon;
