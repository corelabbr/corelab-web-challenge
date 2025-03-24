"use client";

import { Edit2, Star } from "lucide-react";
import Styles from "./card.module.scss";
import ColorPicker from "../pickerColor";
import { useEffect, useState } from "react";
import HttpClient from "@/app/http/httpClient";
import { Todo } from "@/app/types/todoType";

interface CardProps {
    showFavoritesOnly: boolean;
    todos: Todo[];
    deletedTask: (id: string) => void;
    toggleFavorite: (id: string) => void;
    handleEdit: (todo: Todo) => void;
    startEditing: (todo: Todo) => void;
    cancelEditing: () => void;
    isEditing: string;
    editText: string;
    setEditText: (text: string) => void;
    editColor: string;
    setEditColor: (color: string) => void;
}

export default function Card({
    todos,
    showFavoritesOnly,
    deletedTask,
    toggleFavorite,
    handleEdit,
    startEditing,
    cancelEditing,
    isEditing,
    editText,
    setEditText,
    editColor,
    setEditColor
}: CardProps) {
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchFilteredTodos = async () => {
            if (showFavoritesOnly) {
                const favoriteTodos = await HttpClient.get<Todo[]>("task/star/favorite");
                setFilteredTodos(favoriteTodos);
            } else {
                setFilteredTodos(todos);
            }
        };

        fetchFilteredTodos();
    }, [showFavoritesOnly, todos]);

    return (
        <div className={Styles.cardContainer}>
            {filteredTodos.map(todo => (
                <div
                    className={Styles.card}
                    key={todo.id}
                    style={{ '--card-color': todo.color } as React.CSSProperties}
                >
                    {isEditing === todo.id ? (
                        <div className={Styles.editMode}>
                            <input
                                type="text"
                                className={Styles.input}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleEdit(todo)}
                                autoFocus
                                placeholder="Digite o título..."
                            />

                            <div className={Styles.editContent}>
                                <div className={Styles.colorPickerSection}>
                                    <span className={Styles.label}>Cor do card:</span>
                                    <ColorPicker
                                        selectedColor={editColor}
                                        onColorChange={setEditColor}
                                    />
                                </div>

                                <div className={Styles.editActions}>
                                    <button
                                        className={`${Styles.button} ${Styles['button--save']}`}
                                        onClick={() => handleEdit(todo)}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className={`${Styles.button} ${Styles['button--cancel']}`}
                                        onClick={cancelEditing}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={`${Styles.button} ${Styles['button--delete']}`}
                                        onClick={() => deletedTask(todo.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={Styles.viewMode}>
                            <div className={Styles.cardHeader}>
                                <h3 className={Styles.cardTitle}>{todo.title}</h3>
                                <div className={Styles.cardActions}>
                                    <button
                                        className={`${Styles.actionButton} ${Styles['actionButton--edit']}`}
                                        onClick={() => startEditing(todo)}
                                        title="Editar tarefa"
                                    >
                                        <Edit2 />
                                    </button>
                                    <button
                                        className={`${Styles.actionButton} ${Styles['actionButton--favorite']} ${todo.is_favorite ? Styles.active : ''}`}
                                        onClick={() => toggleFavorite(todo.id)}
                                        title={todo.is_favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                    >
                                        <Star />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {filteredTodos.length === 0 && (
                <p className={Styles.emptyMessage}>Nenhuma tarefa encontrada.</p>
            )}
        </div>
    );
}
