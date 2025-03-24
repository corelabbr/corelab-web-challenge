"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import styles from "./pickercolor.module.scss";

interface ColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
}

const colors = [
    "#E2E8F0",
    "#FDE68A",
    "#BBF7D0",
    "#BFDBFE",
    "#DDD6FE",
    "#FECACA",
    "#FBCFE8",
];

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button
                className={styles["button--icon"]}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{ backgroundColor: selectedColor }}
            >
                <Palette className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className={styles.colorPicker}>
                    {colors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={styles.colorPicker__color}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                                onColorChange(color);
                                setIsOpen(false);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
