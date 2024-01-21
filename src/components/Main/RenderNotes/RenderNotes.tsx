import NoteCard from "../Note/NoteCard";
import { Note } from "../../../@types/Note";
import { getNotes } from "../../../services/notes";
import { useQuery } from "react-query";

const RenderNotes = () => {

    const key = ["notes"];
    type response = Note[];

    const { isLoading, error, data } = useQuery<response>(key, getNotes);

    if(isLoading){
        return <p>"carregando..."</p>
    }

    if(error){
        return <p>"ERROR..."</p>
    }

    return (
        <div className="flex justify-center flex-wrap">
            {data?.map(note => (
                <NoteCard key={note.id} {...note}/>
            ))}
        </div>
    )
}

export default RenderNotes;