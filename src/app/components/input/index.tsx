import { InputHTMLAttributes } from "react";

import cn from "@/lib/clsx";

type Props = {
  withShadow?: boolean;
  withBorder?: boolean;
  allowDark?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextSearch({
  withBorder = true,
  withShadow = false,
  allowDark = false,
  ...props
}: Props) {
  return (
    <div className={cn("w-full max-w-lg rounded-[3px] ")}>
      <input
        {...props}
        className={cn(
          "w-full h-7 p-2.5",
          "focus:outline-none",
          "text-xs font-normal",
          "border border-primary-light shadow-input",
          allowDark && "dark:border-primary-dark",
          allowDark && "dark:bg-primary-dark",
          allowDark && "dark:text-white",
          !withShadow && "shadow-none",
          !withBorder && "border-none",
          props.className,
        )}
      />
    </div>
  );
}
