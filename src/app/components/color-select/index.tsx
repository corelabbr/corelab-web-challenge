import { Dispatch, SetStateAction } from "react";

type Props = {
  colors?: string[];
  updateColor?: (color: string) => void;
  hover?: Dispatch<SetStateAction<string | null>>;
};

export default function ColorSelect({
  colors = [],
  updateColor,
  hover,
}: Props) {
  const handleUpdateColor = (color: string) => {
    if (updateColor) {
      updateColor(color);
    }
  };
  return (
    <div className="flex flex-wrap gap-2.5 px-3 py-1.5 bg-white rounded-lg max-w-72 relative z-10 border border-primary-light">
      {colors.map((color, index) => (
        <button
          key={index}
          className="w-8 h-8 rounded-full border border-primary-light"
          style={{ backgroundColor: color }}
          onClick={() => handleUpdateColor(color)}
          onMouseEnter={() => hover && hover(color)}
          onMouseLeave={() => hover && hover(null)}
        />
      ))}
    </div>
  );
}
