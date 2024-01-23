import { useState } from "react";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { BiSolidPaint } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { Note } from "../../../@types/Note";
import { useMutation, useQueryClient } from "react-query";
import { deleteNote, updateNote } from "../../../services/notes";
import ColorPicker from "./ColorPicker/ColorPicker";

const NoteCard = (note: Note) => {

    const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const client = useQueryClient();
    const deleteMutation = useMutation((id: number) => deleteNote(id), {
        onSuccess: () => {
            client.invalidateQueries(["notes"])
        },
        onError: () => {
            console.log("ERROR!");
        }
    });

    const UpdateMutation = useMutation((data: Note) => updateNote(data), {
        onSuccess: () => {
            client.invalidateQueries(["notes"])
        },
        onError: () => {
            console.log("ERROR!");
        }
    });

    const handleDeleteNote = () => {
        deleteMutation.mutate(note.id);
    }

    const handleUpdaFavoriteteNote = () => {
        const {title, favorite, desc, color, id} = note;
        UpdateMutation.mutate({title, desc, color, id, favorite: !favorite});
    }

    const handleUpdateNote = (e: React.SyntheticEvent) => {

    console.log("pegou");

        e.preventDefault();

        const {color, favorite, id} = note;
        UpdateMutation.mutate({title, desc, color, id, favorite});

        setEdit(false);
    }

    return (
        <form onSubmit={handleUpdateNote} className="h-auto flex flex-col m-8 w-[22rem] rounded-2xl shadow-md shadow-gray-400" style={{ backgroundColor: `${note.color}` }}>
            <div className="border-b border-gray-400 p-4 flex justify-between">
                {isEdit ? 
                <input 
                placeholder="Titulo"
                className="focus:outline-none bg-transparent" 
                type="text"
                onChange={e => setTitle(e.currentTarget.value)}
                value={title}
                required/> : 
                <span className="font-bold">
                    {note.title}
                </span>}
                <span className="text-2xl" onClick={handleUpdaFavoriteteNote}>
                    {note.favorite ? <MdOutlineStarPurple500 className="text-[#FFA000]" /> : <MdOutlineStarOutline />}
                </span>
            </div>
            <div className="p-4 min-h-[20rem] text-gray-600">
                {isEdit ? 
                <input
                placeholder="Criar nota..."
                type="text"
                className="focus:outline-none bg-transparent"
                onChange={e => setDesc(e.currentTarget.value)}
                value={desc}
                required
                /> : 
                <span>{note.desc}</span>}
            </div>
            <div className="flex justify-between p-4 text-2xl text-gray-600">
                <div className="flex gap-2">
                    <BiSolidPaint onClick={() => setEdit(!isEdit)}/>
                    <RiPaintFill onClick={() => setIsOpenColorPicker(!isOpenColorPicker)} />
                    {isOpenColorPicker ? <ColorPicker {...note}/> : null}
                </div>
                <BsXLg
                    className="cursor-pointer"
                    onClick={handleDeleteNote} />
            </div>
            <input type="submit" value="" className="border-none h-0" />
        </form>
    )
}

export default NoteCard;