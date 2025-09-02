import { useState } from "react";
import { Palette } from "lucide-react";
import type { FormColor, FormColorValue } from "../types/formColor";

interface Props {
  setValue: (field: string, value: FormColorValue) => void;
  selectedColor?: FormColorValue;
}

const COLORS: FormColor = {
  blue: "#e6f3ff",
  yellow: "#fffacd",
  orange: "#fff4e6",
  green: "#f0fff4",
};

export default function ColorPicker({ setValue, selectedColor }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FormColorValue>(
    selectedColor || COLORS.blue
  );

  const handleSelect = (color: FormColorValue) => {
    setValue("color", color);
    setSelected(color);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
        style={{
          backgroundColor: selected,
          border: "2px solid gray",
        }}
      >
        <Palette className="w-5 h-5 transition-colors text-gray-800" />
      </button>

      {open && (
        <div className="bg-white absolute left-0 bottom-full mb-2 flex gap-2 border border-gray-300 rounded-lg shadow p-2 z-10">
          {Object.entries(COLORS).map(([name, hex]) => (
            <button
              key={name}
              type="button"
              onClick={() => handleSelect(hex)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                selected === hex ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: hex }}
              title={name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
