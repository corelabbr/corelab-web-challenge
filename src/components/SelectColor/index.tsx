import React, { useEffect, useRef } from "react";
import { Container, ContainerColor, StyledColor } from "./styles";

interface ColorItem {
    id: number;
    color: string;
}

interface SelectColorProps {
    data: { id: string };
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectColor: (color: string) => void;
}

const arrColors: ColorItem[] = [
    { id: 0, color: "none" }, // Adiciona a opção "none" para buscas de notes sem color
    { id: 1, color: "#BAE2FF" },
    { id: 2, color: "#B9FFDD" },
    { id: 3, color: "#FFE8AC" },
    { id: 4, color: "#FFCAB9" },
    { id: 5, color: "#F99494" },
    { id: 6, color: "#9DD6FF" },
    { id: 7, color: "#ECA1FF" },
    { id: 8, color: "#DAFF8B" },
    { id: 9, color: "#FFA285" },
    { id: 10, color: "#CDCDCD" },
    { id: 11, color: "#979797" },
    { id: 12, color: "#A99A7C" },
];

const SelectColor: React.FC<SelectColorProps> = ({
    show,
    setShow,
    onSelectColor,
}) => {
    const colorsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                colorsRef.current &&
                !colorsRef.current.contains(event.target as Node)
            ) {
                setShow(false);
            }
        };

        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [colorsRef, setShow]);

    const handleColor = async (color: string) => {
        //console.log("cor:", color);
        setShow(false);
        onSelectColor(color);
    };

    return (
        <Container $show={show} ref={colorsRef}>
            <ContainerColor>
                {arrColors.map((item) => (
                    <StyledColor
                        onClick={() => handleColor(item.color)}
                        key={item.id}
                        color={item.color}
                        style={
                            item.color === "none" // Se a cor for "none", aplica um estilo diferente
                                ? {
                                    backgroundColor: "#fff", // Interior branco
                                    border: "2px dashed black", // Borda pontilhada preta
                                }
                                : { backgroundColor: item.color }
                        }
                    />
                ))}
            </ContainerColor>
        </Container>
    );
};

export default SelectColor;
