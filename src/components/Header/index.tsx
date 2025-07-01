import React, { useState, useCallback, useEffect } from "react";
import {
    getNotes,
    searchByTitle,
    fetchTasksByColor,
} from "../../services/noteService";
import AuthService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Content,
    InputWrapper,
    Input,
    SearchButton,
    Logo,
    Hand,
    Text,
    Profile,
    Dropdown,
    DropdownContent,
    ColorButton,
} from "./styles";
import { INote } from "../../interfaces/INote";
import LogoImg from "../../assets/notes.png";
import SelectColor from "../SelectColor";
import { setProfile } from "../../slices/userSlice";
import { IoMdColorPalette } from "react-icons/io";
import { toast } from "react-toastify";

interface HeaderProps {
    searchNote: (note: INote[]) => void;
    findNotes: (note: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ findNotes, searchNote }) => {
    const [search, setSearch] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(
        (state: { user: { profile: any } }) => state.user.profile
    );

    const fetchSearchResults = async () => {
        try {
            const response = await searchByTitle(search);
            searchNote(response.data);
            findNotes(true);
        } catch (error: Error | any) {
            console.error("Erro ao buscar notas:", error);
            if (error.message === "Request failed with status code 404") {
                searchNote([]);
                findNotes(false);
            }
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === "") {
            restoreOriginalNotes(); // Restaurar notas originais quando o campo estiver vazio
        }
    };

    const handleSearchClick = () => {
        if (search.trim() !== "") {
            fetchSearchResults();
        }
        if (search.trim() === "") {
            toast.info("Digite algo para pesquisar");
            // Exibir mensagem de aviso se o campo de pesquisa estiver vazio
        }
    };

    const handleColorSelect = async (color: string) => {
        setSelectedColor(color);
        setShowColorPicker(false);

        try {
            const response = await fetchTasksByColor(color);
            searchNote(response!.data);
            findNotes(true);
        } catch (error) {
            console.error("Erro ao buscar tarefas por cor:", error);
            searchNote([]);
            findNotes(false);
        }
    };

    const restoreOriginalNotes = async () => {
        try {
            const response = await getNotes();
            searchNote(response!.data);
            findNotes(false);
        } catch (error) {
            console.error("Erro ao restaurar notas originais:", error);
        }
    };

    const handleLogout = useCallback(() => {
        AuthService.logout();
        navigate("/signin");
    }, [navigate]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await AuthService.getProfile();
                dispatch(setProfile(profileData));
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
            }
        };

        fetchProfile();
    }, [dispatch]);

    useEffect(() => {
        if (search === "" && !selectedColor) {
            restoreOriginalNotes();
        }
    }, [search, selectedColor]);

    return (
        <Container>
            <Content>
                <Logo src={LogoImg} />
                <Text>CoreNotes</Text>

                <InputWrapper>
                    <Input
                        type="search"
                        placeholder="Pesquisar notas"
                        value={search}
                        onChange={handleSearchChange}
                        required={true}
                    />
                    <SearchButton onClick={handleSearchClick} title="Pesquisar">
                        <Hand size={20} />
                    </SearchButton>
                </InputWrapper>

                <ColorButton
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    title="Pesquisar por cor"
                >
                    <IoMdColorPalette size={20} />
                </ColorButton>

                {showColorPicker && (
                    <SelectColor
                        data={{ id: "color-picker" }}
                        show={showColorPicker}
                        setShow={setShowColorPicker}
                        onSelectColor={handleColorSelect}
                    />
                )}

                <Profile>
                    {profile && (
                        <>
                            <img
                                src={`https://ui-avatars.com/api/?name=${profile.fullName}`}
                                alt="Avatar"
                                width={32}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                }}
                                onClick={() => setShowDropdown(!showDropdown)}
                                onError={(e) => {
                                    console.error(
                                        "Erro ao carregar a imagem do avatar:",
                                        e
                                    );
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${profile.fullName}`;
                                }}
                            />
                            {showDropdown && (
                                <Dropdown>
                                    <DropdownContent>
                                        <button onClick={handleLogout}>
                                            Logout
                                        </button>
                                        <Link to="/profile">
                                            <button>Ir para o perfil</button>
                                        </Link>
                                    </DropdownContent>
                                </Dropdown>
                            )}
                        </>
                    )}
                </Profile>
            </Content>
        </Container>
    );
};

export default Header;
