import React from 'react';
import './WarningMessage.scss';

interface WarningMessageProps {
    message: string;
    onCancel: () => void;
    onDelete: () => void;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ message, onCancel, onDelete }) => {
    return (
        <div className="warning-overlay">
            <div className="warning-box">
                <p>{message}</p>
                <div className="warning-actions">
                    <button className="cancel-button" onClick={onCancel}>Cancelar</button>
                    <button className="delete-button" onClick={onDelete}>Deletar</button>
                </div>
            </div>
        </div>
    );
}

export default WarningMessage;
