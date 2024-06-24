import * as React from "react";

const StarIcon = ({
  className,
  favorite = false,
  backgroundColor = "white",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
    className={className}
  >
    <path
      fill={favorite ? "#FFA000" : backgroundColor}
      d="m7.608 6.969-5.154.793 4.56 3.667-1.19 5.55 4.163-3.171 5.154 3.171-1.388-5.55 3.865-3.667-5.252-.793-2.38-5.154L7.609 6.97Z"
    />
    <path
      fill="#455A64"
      d="m10.066 13.176-3.638 2.197.958-4.142-3.212-2.786 4.238-.358 1.654-3.91 1.655 3.91 4.238.358-3.212 2.786.958 4.142m6.038-8.148-6.958-.59L10.066.22 7.347 6.635l-6.957.59 5.274 4.577-1.578 6.803 5.98-3.61 5.98 3.61-1.587-6.803 5.284-4.577Z"
    />
  </svg>
);

export default StarIcon;
