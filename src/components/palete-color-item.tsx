interface IPaleteColorItemProps {
  colorData: IColor;
  onClick: (colorId: number) => void;
}
export function PaleteColorItem({ onClick, colorData }: IPaleteColorItemProps) {
  return <div title={colorData.color} style={{ backgroundColor: colorData.value }} className="size-9 rounded-full" onClick={() => onClick(colorData.id)}></div>;
}
