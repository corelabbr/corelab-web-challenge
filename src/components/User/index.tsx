import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../../slices/userSlice";
import { RootState } from "../../store";
import AuthService from "../../services/authService";
import styled, { keyframes } from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 24px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
`;

const Avatar = styled.img`
    border-radius: 50%;
    border: 2px solid #455a64;
    margin-right: 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Greeting = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Username = styled.h1`
    font-size: 28px;
    color: #455a64;
    margin: 0;
    font-family: "Inter", sans-serif;
`;

const Button = styled.button`
    background: #455a64;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    cursor: pointer;
    margin-top: 12px;
    &:hover {
        background: #37474f;
    }
`;

const DeleteButton = styled(Button)`
    background: #ff5722;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #e64a19;
    }
`;

const EditButton = styled(Button)`
    background: #007bff;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #0056b3;
    }
`;

const SaveButton = styled(Button)`
    background: #28a745;
    &:hover {
        background: #218838;
    }
`;

const ModalOverlay = styled.div<{ $show: boolean }>`
    display: ${({ $show }) => ($show ? "flex" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    text-align: center;
`;

const CloseButton = styled(Button)`
    background: #ff5722;
    &:hover {
        background: #e64a19;
    }
`;

const BackButton = styled(Button)`
    background: #ffc107;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #ffd54f;
    }
    margin-top: 16px;
`;

const Input = styled.input`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 12px;
    width: 100%;
    margin-bottom: 12px;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 4px #4a90e2;
    }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 4px solid #b3b0b0;
    border-top: 4px solid #455a64;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
    margin: auto;
`;

const UserProfileCard: React.FC = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.user.profile);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [username, setUsername] = useState(profile?.username || "");
    const [email, setEmail] = useState(profile?.email || "");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const response = await AuthService.getProfile();
            dispatch(setProfile(response));
        } catch (error) {
            console.error("Erro ao buscar perfil do usuário:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [dispatch]);

    const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.length < 6) {
            setError("O nome de usuário deve possuir mais de 6 caracteres.");
            return;
        }
        if (!username.trim()) {
            setError("O nome de usuário não pode estar vazio.");
            return;
        }
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setError("Insira um e-mail válido.");
            return;
        }
        try {
            await AuthService.updateUser(profile?.id || 0, { username, email });
            setShowEditModal(false);
            fetchUserProfile();
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            setError("Erro ao atualizar perfil.");
        }
    };

    const handleDelete = async () => {
        try {
            if (profile?.id) {
                await AuthService.deleteUser(profile.id);
                navigate("/signin");
            }
        } catch (error: any) {
            console.error("Erro ao excluir perfil:", error);
        }
    };

    if (!profile)
        return (
            <div>
                <Spinner />
                <p style={{ textAlign: "center" }}>Carregando...</p>
            </div>
        );

    const goToHome = () => {
        navigate("/");
    };

    return (
        <>
            <Container>
                <Avatar
                    src={`https://ui-avatars.com/api/?name=${profile.username}`}
                    alt="Avatar"
                    width={120}
                />
                <Greeting>
                    <Username>Olá, {profile.username}!</Username>
                    <p>E-mail cadastrado: {profile.email}</p>
                    <p>Seu código: {profile.id}</p>
                    <EditButton onClick={() => setShowEditModal(true)}>
                        <MdModeEdit size={15}/> Editar
                    </EditButton>
                    <DeleteButton onClick={() => setShowDeleteModal(true)}>
                        <MdDelete size={15} /> Excluir
                    </DeleteButton>
                    <BackButton onClick={() => goToHome()}>
                        <IoMdArrowRoundBack size={15} /> Voltar para a página
                        inicial
                    </BackButton>
                </Greeting>
            </Container>

            {/* Modal para Editar */}
            <ModalOverlay $show={showEditModal}>
                <ModalContent>
                    <h2>Editar Perfil</h2>
                    <form onSubmit={handleEdit}>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nome de usuário"
                        />
                        <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu novo e-mail"
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <SaveButton type="submit">Salvar</SaveButton>
                        <CloseButton
                            type="button"
                            onClick={() => {
                                setError(null); // Limpar o erro ao fechar o modal
                                setShowEditModal(false);
                            }}
                        >
                            Fechar
                        </CloseButton>
                    </form>
                </ModalContent>
            </ModalOverlay>

            {/* Modal para Excluir */}
            <ModalOverlay $show={showDeleteModal}>
                <ModalContent>
                    <h2>Excluir Perfil</h2>
                    <p>Tem certeza de que deseja excluir seu perfil?</p>
                    <Button type="button" onClick={handleDelete}>
                        Confirmar
                    </Button>
                    <CloseButton
                        type="button"
                        onClick={() => {
                            setShowDeleteModal(false);
                        }}
                    >
                        Cancelar
                    </CloseButton>
                </ModalContent>
            </ModalOverlay>
        </>
    );
};

export default UserProfileCard;
