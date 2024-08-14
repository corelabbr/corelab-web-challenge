import styled from "styled-components";

export const Overlay = styled.div<{ $isOpen: boolean }>`
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: opacity 0.3s ease;
`;

export const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 0.3rem;
    width: 90%;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const ModalHeader = styled.div`
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.h5`
    margin: 0;
    font-size: 1.25rem;
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6c757d;
    &:hover {
        color: #000;
    }
`;

export const ModalBody = styled.div`
    flex: 1;
    margin-bottom: 10px;
`;

export const ModalFooter = styled.div`
    border-top: 1px solid #dee2e6;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
`;

export const ModalButton = styled.button<{ $primary?: boolean }>`
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    background-color: ${props => (props.$primary ? '#dc3545' : '#6c757d')};
    color: white;

    &:hover {
        opacity: 0.9;
    }
`;

export const Alert = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 0.3rem;
    margin-bottom: 15px;
    border: 1px solid #f5c6cb;
    font-size: 1rem;
    text-align: center;
`;
