import { useState } from "react";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { createNote } from "../../../services/notes";

const CreateNote = () => {

    const [favorite, setFavorite] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const data = {
            title,
            desc,
            color: "fff",
            favorite
        }

        await createNote(data);

        setFavorite(false);
        setTitle("");
        setDesc("");

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-md shadow-gray-400 sm: w-[80%] lg:w-[30%] border border-gray-400 my-8 mx-auto bg-white">
            <div className="flex justify-between border-b border-gray-400 py-2 px-2 items-center">
                <input
                    type="text" 
                    placeholder='Título'
                    value={title}
                    onChange={e => setTitle(e.currentTarget.value)}
                    className="focus:outline-none w-4/5 placeholder:text-black"
                    required />
                <div
                    className="text-2xl"
                    onClick={() => setFavorite(!favorite)}>
                    {favorite ? <MdOutlineStarPurple500 className="text-[#FFA000]"/> : <MdOutlineStarOutline />}
                </div>
            </div>
            <input
                type="text"
                placeholder="Criar nota..."
                value={desc} onChange={e => setDesc(e.currentTarget.value)}
                className="focus:outline-none pb-6 px-2 "
                required />
        </form>
    )
}

export default CreateNote;