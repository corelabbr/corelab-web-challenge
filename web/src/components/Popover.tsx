import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

export function Popover({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popoverRef, () => setIsVisible(false));

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative flex flex-col items-center">
      <button type="button" className={`p-2 pr-1 flex items-center justify-center rounded-full ${ isVisible && "bg-orange-200" }`} onClick={togglePopover}>{children}</button>
      {isVisible && (
        <div
          ref={popoverRef}
          className="absolute -left-2 mt-12 max-md:w-[300px] w-[420px]  bg-white border-gray-400 border-2 rounded-md py-2 px-4 shadow-lg z-10"
        >
          {content}
        </div>
      )}
    </div>
  );
}
