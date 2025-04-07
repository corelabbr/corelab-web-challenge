"use client";
import ColorIcon from "@/assets/icons/colorIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { dataColor } from "@/constants/dataColor";
import { useState } from "react";


interface PaletteColorProps {
  onChangeColorCard: (color: string) => void;
}

function PaletteColor({ onChangeColorCard }: PaletteColorProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Função para alternar o estado do popover
  const togglePopover = (open: boolean) => setIsPopoverOpen(open);

  return (
    <Popover onOpenChange={togglePopover}>
      <PopoverTrigger asChild>
        <Toggle
          className={`cursor-pointer hover:bg-[#ffe3b388] rounded-full 
            ${isPopoverOpen ? "bg-[#FFE3B3]" : "bg-transparent"} 
            transition-colors duration-300 ease-in-out`}
        >
          <ColorIcon className="w-4 h-4" color="#FFA000" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-64 sm:w-lg">
        <div className="flex gap-2 flex-wrap justify-start">
          {dataColor.map((color) => (
            <div
              key={color}
              className="w-9 h-9 rounded-full cursor-pointer"
              style={{ backgroundColor: `#${color}` }}
              onClick={() => onChangeColorCard(`#${color}`)}
              aria-label={`Selecionar cor ${color}`} 
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PaletteColor;
