import { useContext, useEffect, useRef, useState } from "react";
import { Icon, IconContainer, Palette, Shades } from "./ColorPalette.style";

import { faFill } from "@fortawesome/free-solid-svg-icons";
import Context from "../../context/NoteContext";

interface PaletteProp {
  cardId: object,
  updateData: () => void
}

export default function ColorPalette({cardId, updateData}: PaletteProp) {

  const [colorMode, setModeColor] = useState<boolean>(false);
  const [id] = useState<object>(cardId);
  const containerRef = useRef<HTMLDivElement>(null);
  const { editColor } = useContext(Context);

  const colorArray = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD5FF",
    "#ECA1FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C"
  ]

  function handleColors() {
    setModeColor(!colorMode);
  }

  function handleClickOutside(event: MouseEvent) {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setModeColor(false);
    }
  }

  async function updateColor(color: string) {
    await editColor({_id: id, color: color});
    updateData();
  }

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <IconContainer>
      <Icon 
        icon={faFill} 
        onClick={handleColors}
        $activate={colorMode ? true : false}
      />
      <Palette $activate={colorMode ? true : false} ref={containerRef}>
        {colorArray.map((item, index) => (
          <Shades 
            $color={item} 
            key={index} 
            onClick={() => updateColor(item)}
          />
        ))}
      </Palette>
    </IconContainer>

  )
}