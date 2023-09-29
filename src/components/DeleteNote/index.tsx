import styled from "styled-components";
import { deleteNote } from "../../services/NoteService";
import DeleteIcon from "../../assets/delete.svg";
import React from "react";

interface DeleteNoteProps {
    data: { _id: string };
}

const Image = styled.img`
    cursor: pointer;
`;

const DeleteNote: React.FC<DeleteNoteProps> = ({ data }) => {
    const deleteSelectedNote = async () => {
        try {
            await deleteNote(data._id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: Error | any) {
            console.error(error.message);
        }
    };

    return <Image src={DeleteIcon} onClick={deleteSelectedNote} />;
};

export default DeleteNote;
