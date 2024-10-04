// NotesEdit.tsx
import React from 'react'
import { ImPencil } from 'react-icons/im'

interface SvgButtonProps {
    onClick: () => void
}

const NotesEdit: React.FC<SvgButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ width: '1.25rem', height: '1.25rem' }}
    >
        <ImPencil size="1.25rem" /> {}
    </button>
)

export default NotesEdit
