import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface SvgButtonProps {
    isFavorite: boolean;
    onClick: () => void;
}

const NotesFavorite: React.FC<SvgButtonProps> = ({ isFavorite, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-transform duration-300 ease-in-out ${isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:scale-105 focus:outline-none`}
        aria-label="Toggle Favorite"
        style={{ width: '1.5rem', height: '1.5rem', position: 'absolute', top: '0.625rem', right: '0.625rem' }}
    >
        {isFavorite ? <FaStar size="1.5rem" /> : <FaRegStar size="1.5rem" />} {}
    </button>
);

export default NotesFavorite;
