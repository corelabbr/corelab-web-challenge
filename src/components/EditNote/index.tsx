import { FormEvent, useState } from "react";
import { updateNote } from "../../services/NoteService";
import { TextAreaEdit, Form, Button } from "./styles";
import { toast } from "react-toastify";

interface EditNotesProps {
    data: { id: string }
    text: string;
    save: () => void;
}

const EditNote: React.FC<EditNotesProps> = ({ data, text, save }) => {
    const [newValue, setNewValue] = useState<string>('');

    const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
        setNewValue(e.currentTarget.value);
    }

    const edit = async (e: FormEvent) => {
        e.preventDefault();

        try{
            const response = await updateNote(data.id, newValue);
            if(response.status === 200){
                save();
            }
            toast.success('Nota editada com sucesso!');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error: Error | any){
            console.log(error);
            toast.error('Erro ao editar nota!');
        }
    }

    return (
        <Form onSubmit={edit}>
            <TextAreaEdit onChange={handleChange} defaultValue={text} maxLength={256} required/>
            <Button onSubmit={edit}>Salvar</Button>
        </Form>
    )
}

export default EditNote;
