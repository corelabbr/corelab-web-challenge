import { useState } from "react";
import ColorSelect from "../ColorSelect";
import styles from "./NewCard.module.scss";
import { Star } from "lucide-react";
import { createTodo } from "../../lib/api";
import { Todo } from "../../types/Todo";
import { toast } from "react-toastify";

type NewCardProps = {
    createdTodo: (todo: Todo) => void;
};

const NewCard = ({ createdTodo }: NewCardProps) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [colorSelected, setColorSelected] = useState<string>("#FFF");
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleColor = (color: string) => {
        setColorSelected(color);
    };
    const handleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleCancel = () => {
        setIsOpen(false);
        setTitle("");
        setDescription("");
        setColorSelected("#FFF");
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Color:', colorSelected);
        console.log('Is Favorite:', isFavorite);

        if (title.trim() === "" || description.trim() === "") {
            toast.error("Title and Description are required");
            return;
        }
        try {
            const response = await createTodo({ title, description, color: colorSelected, is_favorite: isFavorite });
            if (!response.ok) {
                toast.error(response.message || "Failed to create todo");
                return;
            }
            createdTodo(response.data);
            handleCancel();

        } catch (error) {
            toast.error("Failed to create todo: Connection to API failed");
        }
        handleCancel();


    };
    return (
        <form className={styles.NewCard} style={{ backgroundColor: colorSelected }} onClick={!isOpen ? handleOpen : undefined}>
            <input type="text" placeholder={isOpen ? "Title" : "Take a note..."} style={{ backgroundColor: colorSelected }} value={title} onChange={(e) => setTitle(e.target.value)} />
            {isOpen && (
                <>
                    <textarea placeholder="Take a note..." value={description} style={{ backgroundColor: colorSelected }} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <div className={styles.buttonActions}>
                        <div className={styles.left}>
                            <ColorSelect onChange={toggleColor} />
                            <input type="hidden" value={colorSelected} />
                            <Star
                                size={16}
                                className={`${styles.star} ${isFavorite ? styles.starred : ''}`}
                                onClick={handleFavorite}
                            />
                            <input type="hidden" value={isFavorite ? "1" : "0"} />
                        </div>
                        <div className={styles.right}>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="submit" onClick={handleSubmit} className={styles.btnSave}>Save</button>
                        </div>

                    </div>
                </>)}
        </form>
    )
}

export default NewCard;