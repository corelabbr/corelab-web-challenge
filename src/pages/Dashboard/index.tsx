import { useEffect, useState } from "react";
import { INote } from "./../../interfaces/INote";
import { getNotes } from "../../services/noteService";
import Header from "./../../components/Header";
import { FormCreateNote } from "./../../components/FormNote";
import {
    Container,
    ContentNotes,
    TitleOtherAndFavorite,
} from "./../../styles/styles";
import Card from "./../../components/Card";

function Dashboard() {
    const [search, setSearch] = useState<INote[]>([]);
    const [note, setNote] = useState<INote[]>([]);
    const [findByTitle, setFindByTitle] = useState<boolean>(false);

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            const data = response.data.tasks;
            if (Array.isArray(data)) {
                setNote(data);
                fetchNotes();
            } else {
                console.error("Dados inesperados:", data);
            }
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const generateUniqueKey = (id: string) => `${id}`;

    return (
        <>
            <Header searchNote={setSearch} findNotes={setFindByTitle} />
            <FormCreateNote />
            {findByTitle ? (
                <Container>
                    <ContentNotes>
                        {search.length === 0 && (
                            <p>Não há tarefas para esta busca</p>
                        )}
                        {search.map((item) => (
                            <Card
                                key={generateUniqueKey(item.id)}
                                data={item}
                            />
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
                                    <Card
                                        key={generateUniqueKey(item.id)}
                                        data={item}
                                    />
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
                                    <Card
                                        key={generateUniqueKey(item.id)}
                                        data={item}
                                    />
                                ))}
                        </ContentNotes>
                    </Container>
                </>
            )}
        </>
    );
}

export default Dashboard;
