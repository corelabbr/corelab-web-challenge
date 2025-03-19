import React from "react";
import {
    CloseButton,
    ModalBody,
    ModalButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Overlay,
    Alert
} from "./styles";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm?: () => void;
    title: string;
    children: React.ReactNode;
    alertMessage?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onRequestClose,
    onConfirm,
    title,
    children,
    alertMessage,
}) => {
    return (
        <Overlay $isOpen={isOpen} onClick={onRequestClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={onRequestClose}>&times;</CloseButton>
                </ModalHeader>
                {alertMessage && <Alert>{alertMessage}</Alert>}
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    {onConfirm && (
                        <ModalButton onClick={onConfirm} $primary={true}>
                            Confirmar
                        </ModalButton>
                    )}
                    <ModalButton onClick={onRequestClose}>Fechar</ModalButton>
                </ModalFooter>
            </ModalContent>
        </Overlay>
    );
};

export default Modal;
