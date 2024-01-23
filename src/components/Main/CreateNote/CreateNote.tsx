import { useState } from "react";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { createNote } from "../../../services/notes";
import { useMutation, useQueryClient } from "react-query";
import { Note } from "../../../@types/Note";
import { AnimatePresence, motion } from "framer-motion";

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
            alert("Essa nota já existe");
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
        <AnimatePresence>
            <form
                onSubmit={handleSubmit}
                className="items-end flex flex-col gap-4 shadow-md shadow-gray-400 sm: w-[80%] lg:w-[30%] border border-gray-400 my-8 mx-auto bg-white"
            >
                <div
                    className="flex justify-between border-b border-gray-400 py-2 px-2 items-center w-full"
                >
                    <input
                        type="text"
                        placeholder='Título'
                        value={title}
                        onChange={e => setTitle(e.currentTarget.value)}
                        className="focus:outline-none w-4/5 placeholder:text-black"
                        required />
                    <div
                        className="text-2xl"
                        onClick={() => setFavorite(!favorite)}
                    >
                        {favorite ? <MdOutlineStarPurple500 className="text-[#FFA000]" /> : <MdOutlineStarOutline />}
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Criar nota..."
                    value={desc} onChange={e => setDesc(e.currentTarget.value)}
                    className="focus:outline-none pb-5 px-2 w-full"
                    required
                />
                {title.length && desc.length ?
                    <motion.button
                        type="submit"
                        transition={{
                            layout: { duration: 0.4 },
                        }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 5, opacity: 0 }}
                        className="my-2 mx-4 p-2 bg-green-500 rounded-md text-gray-100 cursor-pointer hover:scale-110 transition-all duration-500"
                    >
                        Adicionar
                    </motion.button> :
                    null}
            </form>
        </AnimatePresence>
    )
}

export default CreateNote;