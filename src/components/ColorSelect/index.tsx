import React, { useEffect, useRef } from "react";
import { updateColor } from "../../services/noteService";
import { Container, ContainerColor, StyledColor } from "./styles";
import { toast } from "react-toastify";

interface ColorItem {
    id: number;
    color: string;
}

interface SelectColorProps {
    data: { id: string; color: string };
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdateColor: (id: string, color: string) => void;
}

const arrColors: ColorItem[] = [
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
    data,
    show,
    setShow,
    onUpdateColor,
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
    }, [setShow]);

    const handleColor = async (color: string) => {
        if (color === data.color) return;

        setShow(false);
        onUpdateColor(data.id, color);

        try {
            await updateColor(data.id, color);
            toast.success("Cor alterada com sucesso!");
        } catch (error: any) {
            console.error(error);
            toast.error("Erro ao alterar a cor!");
        }
    };

    return (
        <Container $show={show} ref={colorsRef}>
            <ContainerColor>
                {arrColors.map((item) => (
                    <StyledColor
                        onClick={() => handleColor(item.color)}
                        key={item.id}
                        color={item.color}
                    />
                ))}
            </ContainerColor>
        </Container>
    );
};

export default SelectColor;
