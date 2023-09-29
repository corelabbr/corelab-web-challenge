import React, { useEffect, useState } from "react";
import { getNotes, searchByTitle } from "../../services/NoteService";
import { Container, Content, Input, Logo, Hand, Text } from "./styles";
import { INote } from "../../interfaces/INote";
import LogoImg from "../../assets/notes.png";

interface HeaderProps {
    searchNote: (note: INote[]) => void;
    findNotes: (note: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ findNotes, searchNote }) => {
    const [search, setSearch] = useState<string>("");

    const searchByNoteTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        try {
            const response = await searchByTitle(search);
            searchNote(response.data);
            findNotes(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: Error | any) {
            console.error("Erro ao buscar notas:", error);
            if (error.message === "Request failed with status code 404") {
                searchNote([]);
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNotes();
                searchNote(response.data);
            } catch (error) {
                console.error("Erro ao buscar notas:", error);
            }
        };

        if (search === '') {
            fetchData();
        }
    }, [searchNote, search]);

    return (
        <Container>
            <Content>
                <Logo src={LogoImg} />
                <Text>CoreNotes</Text>
                <Input
                    type="text"
                    placeholder="Pesquisar por título"
                    onChange={(e) => searchByNoteTitle(e)} />
                <Hand size={20} />
            </Content>
        </Container>
    );
}

export default Header;
