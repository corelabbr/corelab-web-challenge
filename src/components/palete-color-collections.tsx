import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PaleteColorItem } from "./palete-color-item";
import { handleUpdateDataStateUseCase } from "@/use-cases/update-task";
import { useColorStore, useTasksStore } from "@/libs/zustend";

interface IPaleteColorCollectionProps {
  taskId: number;
  paleteCollectionState: boolean;
  changePaleteCollectionFn: (state: boolean) => void;
}
export function PaleteColorCollection({ taskId, paleteCollectionState, changePaleteCollectionFn }: IPaleteColorCollectionProps) {
  const { colors } = useColorStore();
  const { updateTask } = useTasksStore();
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      // console.log("Você clicou fora da div!");
      changePaleteCollectionFn(false);
    }
  };

  const handleUpdateColor = (newColorId: number) => {
    changePaleteCollectionFn(false);

    updateTask(taskId, { colorId: newColorId });
    handleUpdateDataStateUseCase(taskId, { colorId: newColorId }).then((res) => {
      if (!res.isOk) alert(res.message);
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={divRef}
      data-showPalete={paleteCollectionState}
      // className="grid grid-cols-6 gap-4 xl:flex xl:gap-4  data-[showPalete=false]:hidden absolute -bottom-24 lg:-bottom-14 bg-white p-2 rounded-lg shadow-lg transition ease-in-out"
      className="grid grid-cols-6 gap-4 data-[showPalete=false]:hidden absolute -bottom-24  bg-white p-2 rounded-lg shadow-lg transition ease-in-out"
    >
      {colors.map((colorData) => (
        <PaleteColorItem key={colorData.id} colorData={colorData} onClick={(newColorId) => handleUpdateColor(newColorId)} />
      ))}
    </div>
  );
}
