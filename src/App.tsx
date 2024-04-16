import { useEffect, useState } from "react";
import { INote } from "./interfaces/INote";
import { getNotes } from "./services/NoteService";
import Header from "./components/Header";
import { FormCreateNote } from "./components/FormNote";
import {
    Container,
    ContentNotes,
    TitleOtherAndFavorite,
} from "./styles/styles";
import Card from "./components/Card";

function App() {
    const [search, setSearch] = useState<INote[]>([]);
    const [note, setNote] = useState<INote[]>([]);
    const [findByTitle, setFindByTitle] = useState<boolean>(false);

    useEffect(() => {
        const getNote = async () => {
            const { data } = await getNotes();
            setNote(data);
        };
        getNote();
    }, [note, setNote]);

    const generateUniqueKey = (id: string) => `note_${id}`;

    return (
        <>
            <Header searchNote={setSearch} findNotes={setFindByTitle} />
            <FormCreateNote />
            {findByTitle ? (
                <Container>
                    <ContentNotes>
                        {search.length === 0 && (
                            <p>Não há tarefas com este título</p>
                        )}
                        {search.map((item) => (
                            <Card key={generateUniqueKey(item.id)} data={item} />
                        ))}
                    </ContentNotes>
                </Container>
            ) : (
                <>
                    <Container>
                        <TitleOtherAndFavorite>Favoritos</TitleOtherAndFavorite>
                        <ContentNotes>
                            {note.length === 0 && <p>Não há tarefas</p>}
                            {note
                                .filter((item) => item.isFavorite)
                                .map((item) => (
                                    <Card key={generateUniqueKey(item.id)} data={item} />
                                ))}
                        </ContentNotes>
                    </Container>

                    <Container>
                        <TitleOtherAndFavorite>Outros</TitleOtherAndFavorite>
                        <ContentNotes>
                            {note.length === 0 && <p>Não há tarefas</p>}
                            {note
                                .filter((item) => !item.isFavorite)
                                .map((item) => (
                                    <Card key={generateUniqueKey(item.id)} data={item} />
                                ))}
                        </ContentNotes>
                    </Container>
                </>
            )}
        </>
    );
}

export default App;
