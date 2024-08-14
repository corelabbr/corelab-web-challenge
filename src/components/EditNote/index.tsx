import { FormEvent, useState } from "react";
import { updateNote } from "../../services/noteService";
import { TextAreaEdit, Form, Button } from "./styles";
import { toast } from "react-toastify";

interface EditNotesProps {
    data: { id: string };
    text: string;
    save: () => void;
}

const EditNote: React.FC<EditNotesProps> = ({ data, text, save }) => {
    const [newValue, setNewValue] = useState<string>(text); // Inicializa com o texto existente

    const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
        setNewValue(e.currentTarget.value);
    };

    const edit = async (e: FormEvent) => {
        e.preventDefault();

        if (!newValue.trim()) { // Verifica se o campo está vazio ou contém apenas espaços
            toast.error("Campo não pode ficar vazio");
            return; // Evita o envio do formulário
        }

        try {
            const response = await updateNote(data.id, newValue);
            if (response.status === 200) {
                save();
                toast.success("Nota editada com sucesso!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Erro ao editar nota!");
        }
    };

    return (
        <Form onSubmit={edit}>
            <TextAreaEdit
                onChange={handleChange}
                value={newValue}
                maxLength={256}
            />
            <Button type="submit">Salvar</Button>
        </Form>
    );
};

export default EditNote;
