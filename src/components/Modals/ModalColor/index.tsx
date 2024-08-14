import { useEffect, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import { GoCircleSlash } from "react-icons/go";

import Colors from "../../../util/Colors";
import "./styles.scss";

interface ColorsProps {
  setShowColors: (content: boolean) => void;
  setColor: (content: string) => void;
  handleShowColors: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showColors: boolean;
  colorFilter?: boolean;
  setFilterColorsOtherOn?: (content: boolean) => void;
}

export default function ModalColors({
  setShowColors,
  setColor,
  showColors,
  handleShowColors,
  setFilterColorsOtherOn,
  colorFilter,
}: ColorsProps) {
  const colorsModalRef = useRef<HTMLDivElement>(null);

  function handleChooseColor(
    e: React.MouseEvent<HTMLLIElement>,
    choice: { color: string },
  ) {
    e.stopPropagation();
    e.preventDefault();
    setColor(choice.color);
    setShowColors(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      colorsModalRef.current &&
      !colorsModalRef.current.contains(event.target as Node)
    ) {
      setShowColors(false);
    }
  }

  useEffect(() => {
    if (showColors) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColors]);

  return (
    <>
      <div className="colors_modal" ref={colorsModalRef}>
        <div className="colors_header">
          <span>Cores</span>
          <button
            onClick={(e) => {
              handleShowColors(e);
            }}
          >
            <RiCloseLine />
          </button>
        </div>
        <ul className="colors_ul">
          {colorFilter && setFilterColorsOtherOn && (
            <li
              onClick={() => {
                setFilterColorsOtherOn(false);
                setShowColors(false);
              }}
            >
              <GoCircleSlash />
            </li>
          )}

          {Colors.map((choice, index) => (
            <li
              key={index}
              onClick={(e) => {
                handleChooseColor(e, choice);
              }}
            >
              <i style={{ background: choice.color }}></i>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
