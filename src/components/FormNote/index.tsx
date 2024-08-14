import { FormEvent, useState } from "react";
import { createNote } from "../../services/noteService";
import { Button, Container, Form, Input, Loading, TextArea } from "./styles";
import { AiOutlineStar } from "react-icons/ai";
import { toast } from 'react-toastify';

export const FormCreateNote = () => {
    const [text, setText] = useState<string>("");
    const [color, setColor] = useState<string>("black");
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const colorHandle = () => {
        if (color === "orange") {
            return setColor("black");
        }

        if (color === "black") {
            return setColor("orange");
        }
    };

    const noteCreate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createNote(title, text, color);
            setText("");
            setTitle("");
            setColor("black");
            toast.success('Nota criada com sucesso!');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: Error | any) {
            console.error(error);
            toast.error('Erro ao criar a nota.');
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

                    <AiOutlineStar
                        color={color}
                        onClick={colorHandle}
                    />
                </div>

                <TextArea
                    placeholder="Criar nota..."
                    value={text}
                    required
                    minLength={5}
                    onChange={(e) => setText(e.target.value)}
                />

                <Button type="submit" disabled={loading}>
                        {loading ? (
                            <Loading>Criando...</Loading>
                        ) : (
                            <>
                                Criar tarefa
                            </>
                        )}
                    </Button>
            </Form>
        </Container>
    );
};
