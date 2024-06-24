import * as React from "react";
const PenIcon = (props, className) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    className={className}
    {...props}
  >
    <path d="m11.072 6.632.888.888-8.575 8.556h-.87v-.869l8.558-8.575Zm3.4-5.667a.945.945 0 0 0-.66.274l-1.729 1.728 3.542 3.542 1.728-1.728c.368-.369.368-.982 0-1.332l-2.21-2.21a.927.927 0 0 0-.67-.274Zm-3.4 3.013L.627 14.424v3.541h3.542L14.614 7.52l-3.542-3.542Z" />
  </svg>
);
export default PenIcon;
