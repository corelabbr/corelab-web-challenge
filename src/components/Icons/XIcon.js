import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#51646E"
      d="M13.742 1.764 12.418.441 7.171 5.688 1.923.441.6 1.764l5.247 5.248L.6 12.26l1.323 1.323 5.248-5.247 5.247 5.247 1.324-1.323-5.248-5.248 5.248-5.248Z"
    />
  </svg>
);
export default SvgComponent;
