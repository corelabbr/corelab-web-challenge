import styled from "styled-components";
import { deleteNote } from "../../services/NoteService";
import DeleteIcon from "../../assets/delete.svg";
import React from "react";
import { toast } from 'react-toastify';

interface DeleteNoteProps {
    data: { id: string };
}

const Image = styled.img`
    cursor: pointer;
`;

const DeleteNote: React.FC<DeleteNoteProps> = ({ data }) => {
    const deleteSelectedNote = async () => {
        try {
            await deleteNote(data.id);
            toast.success('Nota excluída com sucesso!');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: Error | any) {
            toast.error('Erro ao excluir a nota.');
            console.error(error.message);
        }
    };

    return <Image src={DeleteIcon} onClick={deleteSelectedNote} />;
};

export default DeleteNote;
