import NoteCard from "../Note/NoteCard";
import { Note } from "../../../@types/Note";
import { getNotes } from "../../../services/notes";
import { useQuery } from "react-query";
import { useFilterColors } from "../../../hooks/useFilterColors";
import { useSearchStore } from "../../../store/searchStore";

const RenderNotes = () => {

    const key = ["notes"];
    type response = Note[];

    const { data } = useQuery<response>(key, getNotes);

    const searchValue = useSearchStore((store) => store.searchValue);
    const colorsFilter = useFilterColors();
    const filteredNotes = data?.filter((note: Note) => {

        return (
            note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            note.desc.toLowerCase().includes(searchValue.toLowerCase()) ||
            colorsFilter[searchValue.toLowerCase()]?.includes(note.color)
        )
    })

    return (
        <div className="flex flex-col sm:mx-20 mx-10 sm:pl-10 gap-10 justify-center sm:justify-start mb-10">
            <span className="text-xl">Favoritos</span>
            <div className="flex justify-center sm:justify-start flex-wrap gap-10">
                {filteredNotes?.filter(item => item.favorite).map(note => (
                    <NoteCard key={note.id} {...note} />
                ))}
            </div>
            <span className="text-xl">Outros</span>
            <div className="flex justify-center sm:justify-start flex-wrap gap-10">
                {filteredNotes?.filter(item => !item.favorite).map(note => (
                    <NoteCard key={note.id} {...note} />
                ))}
            </div>
        </div>
    )
}

export default RenderNotes;