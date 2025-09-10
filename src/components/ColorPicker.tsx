import { Button } from "./ui/button";

interface ColorPickerProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selected, onSelect, onCancel, onSave }) => (
  <div className="mt-3 space-y-3">
    <div className="flex items-center gap-2 flex-wrap">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-6 h-6 rounded-full border ${selected === color ? "ring-2 ring-black" : ""}`}
          style={{ backgroundColor: color }}
          onClick={(e) => { e.stopPropagation(); onSelect(color); }}
        />
      ))}
    </div>
    <div className="flex justify-end gap-2">
      <Button onClick={(e) => { e.stopPropagation(); onCancel(); }} variant="ghost" size="sm">Cancel</Button>
      <Button onClick={(e) => { e.stopPropagation(); onSave(); }} size="sm" className="bg-black text-white hover:bg-gray-800">Save</Button>
    </div>
  </div>
);

export default ColorPicker;

