import React from 'react'

interface SvgButtonProps {
    onClick: () => void
}

const NotesDelete: React.FC<SvgButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ width: '1.25rem', height: '1.25rem' }}
    >
        <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6146 1.777L12.2909 0.453369L7.04337 5.70095L1.7958 0.453369L0.472168 1.777L5.71974 7.02457L0.472168 12.2722L1.7958 13.5958L7.04337 8.3482L12.2909 13.5958L13.6146 12.2722L8.367 7.02457L13.6146 1.777Z" fill="#51646E" />
        </svg>
    </button>
)

export default NotesDelete
