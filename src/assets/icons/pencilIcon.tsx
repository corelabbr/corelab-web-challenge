import * as React from "react";

const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="#51646E"
      d="m10.944 6.167.888.887-8.575 8.557h-.87v-.869zM14.344.5a.95.95 0 0 0-.66.274l-1.73 1.728 3.543 3.542 1.728-1.728c.368-.369.368-.983 0-1.332l-2.21-2.21a.93.93 0 0 0-.67-.274m-3.4 3.013L.5 13.958V17.5H4.04L14.486 7.054z"
    ></path>
  </svg>
);

export default PencilIcon;
