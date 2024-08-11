import { ComponentProps, MouseEvent, ReactNode } from "react";
import wrapperStyle from "./icon-wrapper.module.scss";

type IconWrapperProps = ComponentProps<"div"> & {
  color?: string;
  size?: number;
  children: ReactNode;
};

export default function IconWrapper({
  color = "gray",
  size = 25,
  children,
  ...props
}: IconWrapperProps) {
  const handleIconEnter = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = color;
  };

  const handleIconLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "";
  };

  const events = {
    onMouseEnter: handleIconEnter,
    onMouseLeave: handleIconLeave,
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`${wrapperStyle.wrapper}`}
      {...events}
      {...props}
    >
      {children}
    </div>
  );
}
