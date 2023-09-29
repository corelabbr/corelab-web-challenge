import { FormEvent, useState } from "react";
import { createNote } from "../../services/NoteService";
import { Button, Container, Form, Input, TextArea } from "./styles";
import { AiOutlineStar } from "react-icons/ai";

export const FormCreateNote = () => {
    const [text, setText] = useState<string>("");
    const [color, setColor] = useState<string>("black");
    const [title, setTitle] = useState<string>("");

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

        try {
            await createNote(title, text, color);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Form onSubmit={noteCreate}>
                <div>
                    <Input
                        placeholder="Título"
                        value={title}
                        maxLength={50}
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
                    onChange={(e) => setText(e.target.value)}
                />

                <Button>Criar tarefa</Button>
            </Form>
        </Container>
    );
};
