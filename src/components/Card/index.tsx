import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Card.module.scss";
import { Palette, Star, Trash2 } from "lucide-react";
import { deleteTodos, toggleFavoritedTodos, updateTodos } from "../../lib/api";
import PaletteColor from "../PalleteColor";
import { createPortal } from "react-dom";

// Interface do Card
interface ICard {
  id: number;
  title: string;
  description: string;
  favorited: boolean;
  color: string;
  onToggleFavorite: (todoId: number, newFavoritedStatus: boolean) => void;
  onUpdate: (
    todoId: number,
    data: { title: string; description: string; color: string }
  ) => void;
  onDelete: (todoId: number) => void;
}

// Componente Card otimizado com React.memo
const Card: React.FC<ICard> = React.memo(
  ({
    id,
    title,
    description,
    favorited,
    color,
    onToggleFavorite,
    onUpdate,
    onDelete,
  }) => {
    // Estado de edição
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // Estado do formulário
    const [formData, setFormData] = useState<{
      title: string;
      description: string;
      color: string;
    }>({
      title,
      description,
      color,
    });
    // Estado da paleta de cores
    const [showPalette, setShowPalette] = useState<boolean>(false);
    // Posição da paleta
    const [palettePosition, setPalettePosition] = useState<"top" | "bottom">(
      "top"
    );

    // Refs
    const paletteRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Calcula a posição ideal da paleta
    const calculatePalettePosition = useCallback(() => {
      if (buttonRef.current && cardRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const cardRect = cardRef.current.getBoundingClientRect();

        const spaceAbove = buttonRect.top - cardRect.top;
        const spaceBelow = cardRect.bottom - buttonRect.bottom;

        setPalettePosition(
          spaceAbove < 120 || spaceBelow > spaceAbove ? "bottom" : "top"
        );
      }
    }, []);

    // Fecha a paleta ao clicar fora
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          paletteRef.current &&
          !paletteRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setShowPalette(false);
        }
      };

      if (showPalette) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showPalette]);

    // Alterna favorito
    const handleStarClick = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
          const updated = await toggleFavoritedTodos(id);
          onToggleFavorite(id, updated.favorited);
        } catch (error) {
          console.error("Erro ao alterar favorito:", error);
        }
      },
      [id, onToggleFavorite]
    );

    // Atualiza o todo
    const handleUpdate = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
          await updateTodos(id, formData);
          onUpdate(id, formData);
          setIsEditing(false);
          setShowPalette(false);
        } catch (error) {
          console.error("Erro ao atualizar:", error);
        }
      },
      [id, formData, onUpdate]
    );

    // Deleta o todo
    const handleDelete = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
          await deleteTodos(id);
          onDelete(id);
          setIsEditing(false);
          setShowPalette(false);
        } catch (error) {
          console.error("Erro ao deletar:", error);
        }
      },
      [id, onDelete]
    );

    // Seleciona cor rapidamente
    const handleSelectColor = useCallback((selected: string) => {
      setFormData((prev) => ({ ...prev, color: selected }));
      setShowPalette(false);
    }, []);

    // Calcula o estilo da paleta
    const getPaletteStyle = useCallback((): React.CSSProperties => {
      if (!buttonRef.current) return {};
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      return {
        position: "absolute",
        left: buttonRect.left + buttonRect.width / 2,
        top:
          palettePosition === "bottom"
            ? buttonRect.bottom + scrollY + 8
            : buttonRect.top + scrollY - 120,
        transform: "translateX(-50%)",
        zIndex: 10000,
      };
    }, [palettePosition]);

    return (
      <div
        ref={cardRef}
        className={styles.Card}
        onClick={() => setIsEditing(true)}
        style={{ backgroundColor: formData.color || "#fff" }}
      >
        {/* Botão de favorito */}
        <button
          className={styles.StarButton}
          onClick={handleStarClick}
          aria-label="Star"
        >
          <Star size={15} fill={favorited ? "#ffd700" : "transparent"} />
        </button>

        {/* Exibição normal */}
        {!isEditing ? (
          <div className={styles.Header}>
            <div className={styles.TextContent}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        ) : (
          // Modo edição
          <div className={styles.InputContainer}>
            <div className={styles.InputHeader}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                style={{ backgroundColor: formData.color || "#fff" }}
              />
            </div>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              style={{ backgroundColor: formData.color || "#fff" }}
            />
            <div className={styles.ContainerButton}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {/* Botão da paleta */}
                <div className={styles.PaletteContainer}>
                  <button
                    ref={buttonRef}
                    className={styles.PaletteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      calculatePalettePosition();
                      setShowPalette((prev) => !prev);
                    }}
                  >
                    <Palette size={15} />
                  </button>
                  {/* Paleta de cores renderizada via portal */}
                  {showPalette &&
                    createPortal(
                      <div ref={paletteRef} style={getPaletteStyle()}>
                        <PaletteColor
                          selectedColor={formData.color}
                          onSelectColor={handleSelectColor}
                        />
                      </div>,
                      document.body
                    )}
                </div>

                {/* Botão deletar */}
                <button
                  className={styles.TrashButton}
                  onClick={handleDelete}
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Botões de ação */}
              <div className={styles.ActionButtons}>
                <button
                  className={styles.ButtonCancel}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                    setShowPalette(false);
                  }}
                >
                  Cancel
                </button>
                <button className={styles.ButtonSave} onClick={handleUpdate}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Card;
