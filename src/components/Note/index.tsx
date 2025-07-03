import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Pencil, Star, X } from "phosphor-react";
import {
  NoteContainer,
  NoteHeader,
  NoteTitle,
  NoteContent,
  NoteFooter,
  DeleteCard,
  EditCard,
  ColorsContent,
} from "./style";
import { RiPaintFill } from "react-icons/ri";
import { FavoriteButton } from "../NewNote/style";
import { useNote } from "../../contexts/useNote";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface NoteProps {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  colorProp: string;
}

export function Note({
  id,
  title,
  description,
  colorProp,
  favorite: initialFavorite,
}: NoteProps) {
  const [showPalette, setShowPalette] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [palettePosition, setPalettePosition] = useState({ top: 0, left: 0 });
  const [favorite, setFavorite] = useState(initialFavorite);
  const { updateNote, deleteNote, toggleFavorite, toggleColor } = useNote();
  const [color, setColor] = useState<string>(colorProp);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLayoutEffect(() => {
    if (showPalette && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPalettePosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showPalette]);

  async function handleUpdateNote() {
    try {
      await updateNote(id, editableTitle, editableDescription);
      toast.success("Nota atualizada com sucesso!");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
      toast.error("Erro ao atualizar nota.");
    }
  }

  async function handleToggleFavorite(id: string) {
    await toggleFavorite(id);
    setFavorite((prev) => !prev);
  }

  async function handleDeleteNote(id: string) {
    await deleteNote(id);
    toast.success("Nota deletada com sucesso!");
  }

  const colors = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD6FF",
    "#ECA1FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];

  return (
    <NoteContainer color={color}>
      <NoteHeader>
        <NoteTitle>{title}</NoteTitle>
        <FavoriteButton
          type="button"
          onClick={() => handleToggleFavorite(id)}
          aria-label="Favoritar nota"
        >
          <Star
            size={18}
            weight={favorite ? "duotone" : "regular"}
            color="#455A64"
            style={{ fill: favorite ? "#FFA000" : "#FFF" }}
          />
        </FavoriteButton>
      </NoteHeader>

      <NoteContent>{description}</NoteContent>

      <NoteFooter>
        <div
          ref={buttonRef}
          style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <form>
              <DialogTrigger asChild>
                <EditCard aria-label="Editar nota" onClick={() => setIsDialogOpen(true)}>
                  <Pencil size={18} />
                </EditCard>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] dialog-content">
                <DialogHeader>
                  <DialogTitle>Editar Nota</DialogTitle>
                  <DialogDescription>
                    Atualize o título e a descrição da sua nota. Clique em
                    salvar quando terminar.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor={`title-${id}`}>Título</Label>
                    <Input
                      id={`title-${id}`}
                      value={editableTitle}
                      onChange={(e) => setEditableTitle(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`description-${id}`}>Descrição</Label>
                    <Input
                      id={`description-${id}`}
                      value={editableDescription}
                      onChange={(e) => setEditableDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit" onClick={() => handleUpdateNote()}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

          <RiPaintFill
            size={18}
            onClick={() => setShowPalette((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <DeleteCard onClick={() => handleDeleteNote(id)}>
          <X size={14} />
        </DeleteCard>
      </NoteFooter>

      {showPalette &&
        createPortal(
          <ColorsContent
            style={{
              top: `${palettePosition.top}px`,
              left: `${palettePosition.left}px`,
            }}
          >
            {colors.map((c) => (
              <div
                key={c}
                onClick={async() => {
                  setColor(c);
                  setShowPalette(false);
                  try {
                    await toggleColor(id, c);
                  } catch (error) {
                    console.error("Erro ao trocar cor:", error);
                    toast.error("Erro ao trocar cor.");
                  }
                }}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "1px solid #999",
                  cursor: "pointer",
                }}
              />
            ))}
          </ColorsContent>,
          document.getElementById("root")!
        )}
    </NoteContainer>
  );
}
