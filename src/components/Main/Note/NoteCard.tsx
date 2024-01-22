import { useState } from "react";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { BiSolidPaint } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { Note } from "../../../@types/Note";
import { useMutation, useQueryClient } from "react-query";
import { deleteNote } from "../../../services/notes";
import ColorPicker from "./ColorPicker/ColorPicker";

const NoteCard = (note: Note) => {

    const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

    const client = useQueryClient();
    const deleteMutation = useMutation((id: number) => deleteNote(id), {
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

    if (deleteMutation.isLoading) {
        return <p>Apagando nota...</p>
    }

    return (
        <div className="h-auto flex flex-col m-8 w-[22rem] rounded-2xl shadow-md shadow-gray-400" style={{ backgroundColor: `${note.color}` }}>
            <div className="border-b border-gray-400 p-4 flex justify-between">
                <span className="font-bold">
                    {note.title}
                </span>
                <span className="text-2xl">
                    {note.favorite ? <MdOutlineStarPurple500 className="text-[#FFA000]" /> : <MdOutlineStarOutline />}
                </span>
            </div>
            <div className="p-4 min-h-[20rem] text-gray-600">
                <span>{note.desc}</span>
            </div>
            <div className="flex justify-between p-4 text-2xl text-gray-600">
                <div className="flex gap-2">
                    <BiSolidPaint />
                    <RiPaintFill onClick={() => setIsOpenColorPicker(!isOpenColorPicker)} />
                    {isOpenColorPicker ? <ColorPicker {...note}/> : null}
                </div>
                <BsXLg
                    className="cursor-pointer"
                    onClick={handleDeleteNote} />
            </div>
        </div>
    )
}

export default NoteCard;