import { useState } from "react";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { createNote } from "../../../services/notes";
import { useMutation, useQueryClient } from "react-query";
import { Note } from "../../../@types/Note";

const CreateNote = () => {

    const [favorite, setFavorite] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    const client = useQueryClient();
    const createMutation = useMutation(async (data: Partial<Note>) => await createNote(data), {
        onSuccess: () => {
            client.invalidateQueries(["notes"])
        },
        onError: () => {
            <p>Erro ao tentar criar a nota</p>
        }
    });

    const handleSubmit = async (e: React.SyntheticEvent) => {

        e.preventDefault();

        const data = {
            title,
            desc,
            color: "#ffffff",
            favorite
        }

        createMutation.mutate(data);

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
                    {favorite ? <MdOutlineStarPurple500 className="text-[#FFA000]" /> : <MdOutlineStarOutline />}
                </div>
            </div>
            <input
                type="text"
                placeholder="Criar nota..."
                value={desc} onChange={e => setDesc(e.currentTarget.value)}
                className="focus:outline-none pb-5 px-2 "
                required />
            <input type="submit" value="" className="border-none h-0" />
        </form>
    )
}

export default CreateNote;