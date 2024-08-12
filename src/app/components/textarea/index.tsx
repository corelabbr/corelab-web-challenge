import { TextareaHTMLAttributes } from "react";

import cn from "@/lib/clsx";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ ...props }: Props) {
  return (
    <textarea
      {...props}
      maxLength={225}
      rows={3}
      cols={30}
      className={cn(
        "bg-transparent",
        "p-2",
        "text-sm font-normal dark:text-white",
        "resize-none",
        "flex-grow",
        "focus:outline-none focus:shadow-textarea",
        props.className,
      )}
    />
  );
}
