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
import FavoriteNote from "../FovoriteNote";
import Brush from "../../assets/brush.svg";
import Color from "../../assets/color.svg";
import { INote } from "../../interfaces/INote";

interface CardNotesProps {
    data: INote;
  }

const Card: React.FC<CardNotesProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    const handleColor = () => {
        setShow(!show);
    };

    const handleEdit = () => {
        setEdit(true);
        return setEdit(!edit);
    };

    const handleSave = () => {
        setEdit(false);
    };

    return (
        <>
            <Container color={data.color}>
                <TopNote>
                    <Title>{data.title}</Title>
                    <FavoriteNote data={data} />
                </TopNote>
                <Note>
                    {!edit && data.text}
                    {edit && (
                        <EditNote
                            data={data}
                            save={handleSave}
                            text={data.text}
                        />
                    )}
                </Note>

                <FooterCard>
                    <Icons>
                        <Image src={Brush} alt="Brush" onClick={handleEdit} />
                        <Image src={Color} alt="Color" onClick={handleColor} />
                    </Icons>
                    <ColorSelect data={data} show={show} setShow={setShow} />
                    <DeleteNote data={data} />
                </FooterCard>
            </Container>
        </>
    );
};

export default Card;
