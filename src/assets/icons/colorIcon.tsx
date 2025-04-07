import * as React from "react";

const ColorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="18"
    fill="none"
    viewBox="0 0 19 18"
    {...props}
  >
    <path
      fill="#51646E"
      d="M16.496 11.547s-2 2.17-2 3.5a2 2 0 1 0 4 0c0-1.33-2-3.5-2-3.5m-13.79-1.5 4.79-4.79 4.79 4.79m1.77-1.06L5.116.047l-1.41 1.41 2.38 2.38-5.15 5.15c-.59.56-.59 1.53 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.59.59-1.56 0-2.12"
    ></path>
    <path fill="currentColor" d="M7.565 15.044 2.735 10h9.567z"></path>
  </svg>
);

export default ColorIcon;
