import { useState } from "react";
import EditNote from "../EditNote";
import {
    Container,
    FooterCard,
    Icons,
    Image,
    Note,
    Title,
    TopNote,
} from "./styles";
import ColorSelect from "../ColorSelect";
import DeleteNote from "../DeleteNote";
import FavoriteNote from "../FavoriteNote";
import Brush from "../../assets/brush.svg";
import Color from "../../assets/color.svg";
import { INote } from "../../interfaces/INote";

interface CardNotesProps {
    data: INote;
    onToggleFavorite: (id: string) => void;
    onUpdateColor: (id: string, color: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

const Card: React.FC<CardNotesProps> = ({
    data,
    onToggleFavorite,
    onUpdateColor,
    onDelete,
    onEdit,
}) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
        <Container color={data.color}>
            <TopNote>
                <Title>{data.title}</Title>
                <FavoriteNote data={data} onToggleFavorite={onToggleFavorite} />
            </TopNote>
            <Note>
                {!edit && data.text}
                {edit && (
                    <EditNote
                        data={data}
                        save={() => setEdit(false)}
                        text={data.text}
                        onEdit={onEdit}
                    />
                )}
            </Note>

            <FooterCard>
                <Icons>
                    <Image
                        src={Brush}
                        alt="Editar"
                        onClick={() => setEdit(!edit)}
                    />
                    <Image
                        src={Color}
                        alt="Alterar cor"
                        onClick={() => setShow(!show)}
                    />
                </Icons>
                <ColorSelect
                    data={data}
                    show={show}
                    setShow={setShow}
                    onUpdateColor={onUpdateColor}
                />
                <DeleteNote data={data} onDelete={onDelete} />
            </FooterCard>
        </Container>
    );
};

export default Card;
