import { FormEvent, useState } from "react";
import { createNote } from "../../services/noteService";
import { Button, Container, Form, Input, Loading, TextArea } from "./styles";
import { AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";

interface FormCreateNoteProps {
    onNoteCreated: () => void;
}

export const FormCreateNote = ({ onNoteCreated }: FormCreateNoteProps) => {
    const [text, setText] = useState<string>("");
    const [color, setColor] = useState<string>("black");
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const colorHandle = () => {
        setColor(color === "orange" ? "black" : "orange");
    };

    const noteCreate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createNote(title, text, color);
            setText("");
            setTitle("");
            setColor("black");
            toast.success("Nota criada com sucesso!");
            onNoteCreated();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar a nota.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={noteCreate}>
                <div>
                    <Input
                        placeholder="Título"
                        value={title}
                        minLength={5}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <AiOutlineStar color={color} onClick={colorHandle} />
                </div>

                <TextArea
                    placeholder="Criar nota..."
                    value={text}
                    required
                    minLength={5}
                    onChange={(e) => setText(e.target.value)}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? <Loading>Criando...</Loading> : "Criar tarefa"}
                </Button>
            </Form>
        </Container>
    );
};
