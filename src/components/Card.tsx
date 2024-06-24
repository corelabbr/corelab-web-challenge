"use client";
import React from "react";
import StarIcon from "./Icons/StarIcon";
import PenIcon from "./Icons/PenIcon";
import XIcon from "./Icons/XIcon";
import InkBucket from "./Icons/InkBucket";
import customColors, { CustomColorKey } from "../utils/customColors";
import { CardComponentProps } from "../types/CardProps";

const Card: React.FC<CardComponentProps> = ({
  title,
  favorite,
  description,
  color,
  index,
  isEditing,
  isColorPickerOpen,
  onColorPickerToggle,
  onCloseColorPicker,
  onEditToggle,
  onTitleChange,
  onDescriptionChange,
  onFavoriteToggle,
  onColorSelect,
  onDeleteTodo
}) => {
  const backgroundColor = customColors[color as CustomColorKey] || "white";

  return (
    <div
      style={{ backgroundColor }}
      className="min-w-[390px] max-w-[530px] rounded-3xl shadow-md mb-10 w-full relative"
    >
      <div className="flex items-center justify-between border-b px-6 pt-4 pb-3">
        <input
          maxLength={25}
          placeholder="Título"
          disabled={!isEditing}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={`font-bold text-black placeholder:text-black focus:outline-none bg-transparent`}
        />
        <button onClick={onFavoriteToggle}>
          <StarIcon
            className="fill-black"
            backgroundColor={backgroundColor}
            favorite={favorite}
          />
        </button>
      </div>
      <div className="px-6 py-3 min-h-16">
        <textarea
          placeholder="Descrição"
          disabled={!isEditing}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="text-text-text h-24 resize-none w-full placeholder:text-black focus:outline-none bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between py-3 px-6">
        <div className="flex gap-1 relative">
          <div
            className={`w-7 h-7 flex items-center justify-center ${
              isEditing ? "bg-buttonSelected" : ""
            } rounded-full focus:outline-none`}
          >
            <button onClick={onEditToggle}>
              <PenIcon
                width={24}
                heigh={24}
                className="fill-slate-500 w-[18px]"
              />
            </button>
          </div>

          <button onClick={onColorPickerToggle}>
            <InkBucket width={18} heigh={17} />
          </button>

          {isColorPickerOpen && (
            <div className="absolute bg-white border p-2 mt-8 rounded-lg w-[200px] grid grid-cols-6 gap-2 z-10">
              {Object.keys(customColors).map((colorKey) => (
                <div
                  key={colorKey}
                  className="w-6 h-6 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: customColors[colorKey as CustomColorKey]
                  }}
                  onClick={() => onColorSelect(colorKey as CustomColorKey)}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <button onClick={onDeleteTodo}>
            <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
