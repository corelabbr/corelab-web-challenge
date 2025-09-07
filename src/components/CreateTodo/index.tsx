import { useState, useRef, useEffect } from "react";
import styles from "./CreateTodo.module.scss";
import { PaletteIcon, Star } from "lucide-react";
import { createTodos } from "../../lib/api";
import PaletteColor from "../PalleteColor";

// Props do componente CreateTodo
interface ICreateTodoProps {
  onCreate: (newTodo: any) => void; // Callback chamado após criar um novo todo
}

// Tipagem do formulário
interface IFormData {
  title: string;
  description: string;
  color: string;
  favorited: boolean;
}

const CreateTodo: React.FC<ICreateTodoProps> = ({ onCreate }) => {
  // Estado para saber se estamos criando uma nota
  const [isCreating, setIsCreating] = useState<boolean>(false);
  // Estado para favorito
  const [favorite, setFavorite] = useState<boolean>(false);
  // Estado do formulário
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    color: "",
    favorited: false,
  });
  // Estado para mostrar paleta de cores
  const [showPalette, setShowPalette] = useState<boolean>(false);

  // Refs para detectar clique fora da paleta
  const paletteRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fecha o seletor de cores ao clicar fora
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

    if (showPalette) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPalette]);

  // Alterna o estado da estrela (favorito)
  const handleStarClick = () => {
    const newStateFavorite = !favorite;
    setFavorite(newStateFavorite);
    setFormData({ ...formData, favorited: newStateFavorite });
  };

  // Seleciona cor da paleta
  const handleSelectColor = (selected: string) => {
    setFormData({ ...formData, color: selected });
    setShowPalette(false);
  };

  // Cria novo todo
  const handleCreate = async () => {
    try {
      const created = await createTodos(formData); // Cria no backend
      onCreate(created); // Chama callback do pai
      setIsCreating(false); // Fecha formulário
      setFavorite(false); // Reseta estrela
      setFormData({ title: "", description: "", color: "", favorited: false }); // Limpa campos
    } catch (error) {
      console.error("Erro ao criar todo:", error);
    }
  };

  return (
    <div
      className={styles.CreateTodo}
      style={{ backgroundColor: formData.color || "white" }}
    >
      {/* Estado inicial: apenas placeholder */}
      {!isCreating ? (
        <p onClick={() => setIsCreating(true)}>Take a note...</p>
      ) : (
        <div
          className={styles.CreateTodoArea}
          style={{ backgroundColor: formData.color || "white" }}
        >
          {/* Título */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            style={{ backgroundColor: formData.color || "white" }}
          />

          {/* Descrição */}
          <textarea
            placeholder="Take a note..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{ backgroundColor: formData.color || "white" }}
          />

          {/* Área inferior com paleta e botões */}
          <div
            className={styles.CreateTodoBottom}
            style={{ backgroundColor: formData.color || "white" }}
          >
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              {/* Botão da paleta */}
              <div style={{ position: "relative" }}>
                <button
                  ref={buttonRef}
                  className={styles.PaletteButton}
                  onClick={() => setShowPalette(!showPalette)}
                  aria-label="Selecionar cor"
                >
                  <PaletteIcon size={15} />
                </button>
                {showPalette && (
                  <div
                    ref={paletteRef}
                    style={{
                      position: "absolute",
                      bottom: "110%",
                      left: 0,
                      zIndex: 100,
                      background: "white",
                      padding: "0.5rem",
                      borderRadius: "6px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    <PaletteColor
                      selectedColor={formData.color}
                      onSelectColor={handleSelectColor}
                    />
                  </div>
                )}
              </div>

              {/* Botão estrela */}
              <button
                className={styles.StarButton}
                onClick={handleStarClick}
                aria-label="Color"
              >
                <Star
                  data-testid="lucide-star"
                  size={15}
                  fill={favorite ? "#ffd700" : "transparent"}
                />
              </button>
            </div>

            {/* Botões cancelar e salvar */}
            <div className={styles.CreateButtonGroup}>
              <button onClick={() => setIsCreating(false)}>cancel</button>
              <button onClick={handleCreate}>save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTodo;
