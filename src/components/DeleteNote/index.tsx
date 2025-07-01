import React, { useState } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';
import { deleteNote } from "../../services/noteService";
import DeleteIcon from "../../assets/delete.svg";
import Modal from "../Modal";

interface DeleteNoteProps {
    data: { id: string };
    onDelete: (id: string) => void;
}

const Image = styled.img`
    cursor: pointer;
`;

const DeleteNote: React.FC<DeleteNoteProps> = ({ data, onDelete }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const deleteSelectedNote = async () => {
        try {
            await deleteNote(data.id);
            toast.success('Nota excluída com sucesso!');
            onDelete(data.id);
            closeModal();
        } catch (error: Error | any) {
            toast.error('Erro ao excluir a nota.');
            console.error(error.message);
            closeModal();
        }
    };

    return (
        <>
            <Image src={DeleteIcon} onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onConfirm={deleteSelectedNote}
                title="Confirmar Exclusão"
                alertMessage="Esta ação não pode ser desfeita."
            >
                <p>Tem certeza que deseja excluir esta nota?</p>
            </Modal>
        </>
    );
};

export default DeleteNote;
