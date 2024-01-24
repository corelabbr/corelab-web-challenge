import React, { useEffect, useState } from "react";

type ColorPickerProps = {
  onSelectColor: (color: string) => void;
};

const ColorPicker = ({ onSelectColor }: ColorPickerProps) => {
  const colors = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    " #F99494",
    "#9DD6FF",
    "#ECA1FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div className="bg-white p-1 absolute bottom-[-30px] flex flex-wrap gap-1">
      {colors.map((color) => (
        <span
          key={color}
          className="p-6 rounded-full cursor-pointer"
          style={{ background: color }}
          onClick={() => handleColorClick(color)}
        ></span>
      ))}
    </div>
  );
};

export default ColorPicker;
