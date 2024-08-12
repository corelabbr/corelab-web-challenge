"use client";

import { MouseEvent, useEffect, useState } from "react";
import { BiSolidColorFill } from "react-icons/bi";
import { GoPencil, GoStar, GoStarFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

import { Note } from "@/@types/note";
import ColorSelect from "@/app/components/color-select";
import useNotes from "@/app/hooks/notes";
import cn from "@/lib/clsx";

import TextSearch from "../input";
import TextArea from "../textarea";

type Props = {
  note?: Note;
  colors?: string[];
};

export default function Card({ note, colors }: Props) {
  const {
    addFavoriteNote,
    updateColorNote,
    updateNote,
    createNote,
    deleteNote,
  } = useNotes();
  const [editableText, setEditableText] = useState<boolean>(false);
  const [editableColor, setEditableColor] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<string>(note?.content ?? "");
  const [titleValue, setTitleValue] = useState<string>(note?.title ?? "");
  const [colorValue, setColorValue] = useState<string | null>(null);
  const [favoriteValue, setFavoriteValue] = useState<boolean>(
    note?.favorite ?? false,
  );
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleFavoriteCard = async () => {
    await addFavoriteNote({
      ...note!,
      favorite: !note!.favorite,
    });
  };
  const handleEditCard = () => {
    setEditableText((prev) => {
      const state = !prev;
      if (!state) {
        handleUpdateCard();
      }
      return state;
    });
  };
  const handleUpdateCard = async () => {
    const newNote = {
      ...note!,
      title: titleValue,
      content: contentValue,
      favorite: favoriteValue,
    };
    await updateNote(newNote);
  };
  const handleUpdateColorCard = async (color: string) => {
    await updateColorNote({
      ...note!,
      color,
    });
    setEditableColor(false);
  };
  const handleDeleteCard = async () => {
    await deleteNote(note!);
  };
  const handleCreateNote = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();

    const newNote = {
      title: titleValue,
      content: contentValue,
      favorite: favoriteValue,
      color: "#FFFFFF",
    };
    if (!newNote.title || !newNote.content) return;

    await createNote(newNote as Note);

    setTitleValue("");
    setContentValue("");
    setFavoriteValue(false);
  };

  useEffect(() => {}, [colorValue]);
  useEffect(() => {
    if (titleValue && contentValue) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [titleValue, contentValue]);

  if (!note)
    return (
      <div
        className={cn(
          "w-full min-w-[320px] max-w-xl self-center",
          "bg-white dark:bg-primary",
          "shadow-card",
          "rounded-md",
          "px-6 py-4",
          "flex flex-col",
          "relative",
        )}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={cn("w-full", "flex justify-between gap-4")}>
            <div className="w-full">
              <TextSearch
                withShadow={false}
                withBorder={false}
                className="text-sm font-bold bg-transparent focus:shadow-inner"
                placeholder="Título"
                value={titleValue}
                allowDark
                onChange={(e) => setTitleValue(e.target.value)}
              />
            </div>
            <button
              onClick={() => setFavoriteValue((prev) => !prev)}
              type="button"
            >
              {!favoriteValue ? (
                <GoStar
                  className={cn("w-5 h-5", "text-primary dark:text-white")}
                />
              ) : (
                <GoStarFill className={cn("w-5 h-5", "text-accent-yellow")} />
              )}
            </button>
          </div>
          {/* Divider */}
          <div
            className={cn(
              "absolute inset-x-0 top-12",
              "border border-primary-light dark:border-primary-dark",
            )}
          />
          <div className="flex mt-5">
            <TextArea
              placeholder={"Criar nota..."}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            />
          </div>
          {showButton && (
            <button
              type="button"
              onClick={(e) => handleCreateNote(e)}
              className={cn(
                "w-full mt-2 py-3 rounded-sm",
                "bg-primary-light dark:bg-primary-dark",
                "text-primary dark:text-white text-base font-bold",
                "hover:bg-accent-yellow dark:hover:bg-accent-yellow hover:text-white",
                "transition-all duration-200",
              )}
              disabled={!showButton}
            >
              Send
            </button>
          )}
        </form>
      </div>
    );
  return (
    <div
      className={cn(
        "w-full min-w-[320px] max-w-card",
        "aspect-[0.892]",
        "bg-white",
        "shadow-card",
        "rounded-3xl",
        "px-6 py-4",
        "flex flex-col",
        "relative",
        "transition-colors duration-100",
      )}
      style={{
        backgroundColor: colorValue ?? note.color,
      }}
    >
      <div className={cn("w-full", "flex justify-between gap-3")}>
        <div className="w-full">
          <TextSearch
            withShadow={false}
            withBorder={false}
            className={cn(
              "bg-transparent w-full",
              "text-sm font-bold",
              "focus:outline-none",
              "text-primary",
              "placeholder:text-zinc-600",
            )}
            placeholder="Título"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            disabled={!editableText}
          />
        </div>
        <button onClick={handleFavoriteCard}>
          {!note.favorite ? (
            <GoStar className={cn("w-5 h-5", "text-primary")} />
          ) : (
            <GoStarFill className={cn("w-5 h-5", "text-accent-yellow")} />
          )}
        </button>
      </div>
      {/* Divider */}
      <div
        className={cn(
          "absolute inset-x-0 top-12",
          "border",
          note.color !== "#FFFFFF" ? "border-white" : "border-primary-light",
        )}
      />
      <div className="flex flex-1 mt-6">
        <TextArea
          rows={10}
          className={cn(
            "text-primary dark:text-primary",
            "placeholder:text-primary",
          )}
          placeholder={
            "Adicione um conteúdo para sua nota... (máx. 225 caracteres)"
          }
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          disabled={!editableText}
        />
      </div>
      <div className={cn("flex justify-between", "w-full", "relative")}>
        <div>
          <button className="cursor-pointer" onClick={handleEditCard}>
            <GoPencil className="w-6 h-6 text-primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => setEditableColor((prev) => !prev)}
          >
            <BiSolidColorFill className="w-6 h-6 text-primary" />
          </button>
        </div>
        <div>
          <button className="cursor-pointer" onClick={handleDeleteCard}>
            <IoCloseOutline className="w-7 h-7 text-primary" />
          </button>
        </div>
        <div
          className={cn(
            "hidden absolute left-10 top-full",
            editableColor && "block",
          )}
        >
          <ColorSelect
            colors={colors}
            updateColor={handleUpdateColorCard}
            hover={setColorValue}
          />
        </div>
      </div>
    </div>
  );
}
