import { FormEvent, useState } from "react";
import { updateNote } from "../../services/NoteService";
import { TextAreaEdit, Form, Button } from "./styles";

interface EditNotesProps {
    data: { _id: string }
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
            const response = await updateNote(data._id, newValue);
            if(response.status === 200){
                save();
            }
        } catch(error){
            console.log(error);
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
