import * as React from "react";
const InkBucket = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#51646E"
      d="M16.624 12.012s-2 2.17-2 3.5a2 2 0 0 0 4 0c0-1.33-2-3.5-2-3.5Zm-13.79-1.5 4.79-4.79 4.79 4.79m1.77-1.06L5.244.512l-1.41 1.41 2.38 2.38-5.15 5.15c-.59.56-.59 1.53 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.59.59-1.56 0-2.12Z"
    />
    <path fill="#FFA000" d="m7.692 15.509-4.83-5.044h9.568L7.692 15.51Z" />
  </svg>
);
export default InkBucket;
