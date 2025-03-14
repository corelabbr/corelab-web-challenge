import { Note, NoteProps } from './Note'
import './SectionHome.css'

type SectionProps = {
    title: string
    notes: NoteProps[]
}

export const Section = ({ title, notes }: SectionProps) => {
    return (
        <div className='section-home-container'>
            <span className='section-home-text'>{title}</span>
            <div className='section-home-note'>
                {notes.map((note, index) => (
                    <Note key={index} {...note} />
                ))}
            </div>
        </div>
    )
}
