import { useEffect, useState } from "react";
import { INote } from "../../interfaces/INote";
import { getNotes } from "../../services/noteService";
import Header from "../../components/Header";
import { FormCreateNote } from "../../components/FormNote";
import {
    Container,
    ContentNotes,
    TitleOtherAndFavorite,
} from "../../styles/styles";
import Card from "../../components/Card";

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

    const toggleFavorite = (id: string) => {
        setNote((prevNotes) =>
            prevNotes.map((item) =>
                item.id === id
                    ? { ...item, isFavorite: !item.isFavorite }
                    : item
            )
        );
    };

    const updateNoteColor = (id: string, color: string) => {
        setNote((prevNotes) =>
            prevNotes.map((item) =>
                item.id === id ? { ...item, color } : item
            )
        );
    };

    const deleteNote = (id: string) => {
        setNote((prevNotes) => prevNotes.filter((item) => item.id !== id));
    };

    const editNote = (id: string, newText: string) => {
        setNote((prevNotes) =>
            prevNotes.map((item) =>
                item.id === id ? { ...item, text: newText } : item
            )
        );
    };

    const favoriteNotes = note.filter((item) => item.isFavorite);
    const otherNotes = note.filter((item) => !item.isFavorite);

    return (
        <>
            <Header searchNote={setSearch} findNotes={setFindByTitle} />
            <FormCreateNote onNoteCreated={fetchNotes} />

            {findByTitle ? (
                <Container>
                    <ContentNotes>
                        {search.length === 0 && (
                            <p>Não há tarefas para esta busca</p>
                        )}
                        {search.map((item) => (
                            <Card
                                key={item.id}
                                data={item}
                                onToggleFavorite={toggleFavorite}
                                onUpdateColor={updateNoteColor}
                                onDelete={deleteNote}
                                onEdit={editNote}
                            />
                        ))}
                    </ContentNotes>
                </Container>
            ) : (
                <>
                    <Container>
                        <TitleOtherAndFavorite>Favoritos</TitleOtherAndFavorite>
                        <ContentNotes>
                            {favoriteNotes.length > 0 ? (
                                favoriteNotes.map((item) => (
                                    <Card
                                        key={item.id}
                                        data={item}
                                        onToggleFavorite={toggleFavorite}
                                        onUpdateColor={updateNoteColor}
                                        onDelete={deleteNote}
                                        onEdit={editNote}
                                    />
                                ))
                            ) : (
                                <p>Não há tarefas favoritas</p>
                            )}
                        </ContentNotes>
                    </Container>

                    <Container>
                        <TitleOtherAndFavorite>Outros</TitleOtherAndFavorite>
                        <ContentNotes>
                            {otherNotes.length > 0 ? (
                                otherNotes.map((item) => (
                                    <Card
                                        key={item.id}
                                        data={item}
                                        onToggleFavorite={toggleFavorite}
                                        onUpdateColor={updateNoteColor}
                                        onDelete={deleteNote}
                                        onEdit={editNote}
                                    />
                                ))
                            ) : favoriteNotes.length === 0 ? (
                                <p>Não há tarefas</p>
                            ) : null}
                        </ContentNotes>
                    </Container>
                </>
            )}
        </>
    );
}

export default Dashboard;
