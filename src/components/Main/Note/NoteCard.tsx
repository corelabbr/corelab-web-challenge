import { useEffect, useState } from "react";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { BiSolidPaint } from "react-icons/bi";
import { IoCheckmark } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";
import { Note } from "../../../@types/Note";
import { useMutation, useQueryClient } from "react-query";
import { deleteNote, updateNote } from "../../../services/notes";
import ColorPicker from "./ColorPicker/ColorPicker";
import { AnimatePresence, motion } from "framer-motion";

const NoteCard = (note: Note) => {

    const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const client = useQueryClient();
    const deleteMutation = useMutation((id: number) => deleteNote(id), {
        onSuccess: () => {
            client.invalidateQueries(["notes"])
        }
    });

    const UpdateMutation = useMutation((data: Note) => updateNote(data), {
        onSuccess: () => {
            client.invalidateQueries(["notes"])
        }
    });

    const handleDeleteNote = () => {
        deleteMutation.mutate(note.id);
    }

    const handleUpdaFavoriteteNote = () => {
        const { title, favorite, desc, color, id } = note;
        UpdateMutation.mutate({ title, desc, color, id, favorite: !favorite });
    }

    const handleUpdateNote = (e: React.SyntheticEvent) => {

        e.preventDefault();

        const { color, favorite, id } = note;
        UpdateMutation.mutate({ title, desc, color, id, favorite });

        setEdit(false);
    }

    useEffect(() => {
        setIsOpenColorPicker(false);
    }, [note])

    return (
        <AnimatePresence>
            <motion.form
                transition={{
                    layout: { duration: 0.4 },
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleUpdateNote}
                className="h-auto flex flex-col w-[22rem] rounded-2xl shadow-md shadow-gray-400"
                style={{ backgroundColor: `${note.color}` }}
            >
                <div className="border-b border-gray-400 p-4 flex justify-between">
                    {isEdit ?
                        <input
                            placeholder="Titulo"
                            className="focus:outline-none bg-transparent placeholder:text-gray-600"
                            type="text"
                            onChange={e => setTitle(e.currentTarget.value)}
                            value={title}
                            required />
                        :
                        <span className="font-bold">
                            {note.title}
                        </span>}
                    <span
                        className="text-2xl cursor-pointer hover:scale-110 transition-all duration-500"
                        onClick={handleUpdaFavoriteteNote}
                    >
                        {note.favorite ? <MdOutlineStarPurple500 className="text-[#FFA000]" /> : <MdOutlineStarOutline />}
                    </span>
                </div>
                <div className="p-4 min-h-[20rem] text-gray-600">
                    {isEdit ?
                        <input
                            placeholder="Criar nota..."
                            type="text"
                            className="focus:outline-none bg-transparent placeholder:text-gray-600"
                            onChange={e => setDesc(e.currentTarget.value)}
                            value={desc}
                            required
                        />
                        :
                        <span>{note.desc}</span>}
                </div>
                <div className="flex justify-between p-4 text-2xl text-gray-600">
                    <div className="flex gap-2">
                        <div
                            className="p-1 rounded-full cursor-pointer hover:scale-110 transition-all duration-500 m-auto"
                            style={isEdit ? { backgroundColor: "#FFA000" } : {}}
                            onClick={() => setEdit(!isEdit)}
                        >
                            <BiSolidPaint />
                        </div>
                        <div
                            className="p-1 rounded-full cursor-pointer hover:scale-110 transition-all duration-500"
                            style={isOpenColorPicker ? { backgroundColor: "#FFA000" } : {}}
                            onClick={() => setIsOpenColorPicker(!isOpenColorPicker)}
                        >
                            <RiPaintFill />
                        </div>
                        {isOpenColorPicker ? <ColorPicker {...note} /> : null}
                    </div>
                    <div className="flex items-center gap-2">
                        {isEdit ?
                            <button
                                type="submit"
                                className="cursor-pointer hover:scale-110 transition-all duration-500"
                            >
                                <IoCheckmark />
                            </button> : null}
                        <BsXLg
                            className="cursor-pointer hover:scale-110 transition-all duration-500"
                            onClick={handleDeleteNote}
                        />
                    </div>
                </div>
            </motion.form>
        </AnimatePresence>
    )
}

export default NoteCard;