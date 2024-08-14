"use client";
import { Close, Edit, Star, StarBorder } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { FileUploader } from "./subcomponents/file-uploader";
import bucket from "@/app/assets/bucket.svg";
import { ColorMenu } from "./subcomponents/color-menu";
import { DeleteNoteDialog } from "./subcomponents/delete-note-dialog";
import { updateNote } from "../api/note/update-note";
import { useSession } from "../context/session-id-context";
import { useNotes } from "../context/notes-context";

interface CardProps {
  id: string;
  title: string;
  fav: boolean;
  file?: string;
  color: number;
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

export function Card({ title, fav, file, color, id }: CardProps) {
  const { userId } = useSession();
  const [buttonColorOpen, setButtonColorOpen] = useState(false);
  const [buttonEditOpen, setButtonEditOpen] = useState(false);
  const [buttonDeleteOpen, setButtonDeleteOpen] = useState(false);
  const { notes, setNotes } = useNotes();
  const [inputValue, setInputValue] = useState("");

  function onButtonEditClick() {
    setButtonEditOpen(!buttonEditOpen);
  }

  function onButtonColorClick() {
    setButtonColorOpen(!buttonColorOpen);
  }

  function onButtonDeleteClick() {
    setButtonDeleteOpen(!buttonDeleteOpen);
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  async function handleStarClick() {
    await updateNote({
      id,
      fav: !fav,
      user_id: userId || "",
    }).then(() => {
      const newNotes = notes.map((note) =>
        note.id === id ? { ...note, fav: !fav } : note
      );
      setNotes(newNotes);
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateNote({
      id,
      title: inputValue,
      user_id: userId || "",
    }).then(() => {
      const newNotes = notes.map((note) =>
        note.id === id ? { ...note, title: inputValue } : note
      );
      setNotes(newNotes);
      setButtonEditOpen(false);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="border border-[#D9D9D9] bg-white w-72 min-h-72 mt-5 rounded-2xl flex flex-col justify-between lg:w-[32rem]"
        style={color ? { backgroundColor: colors[color] } : {}}
      >
        <section>
          <div
            className="flex flex-row items-center justify-between border-b px-4"
            style={{ borderColor: color ? "#FFF" : "#E5E5E5" }}
          >
            {buttonEditOpen ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="bg-transparent text-xl font-bold leading-10 border-none p-0 outline-none w-56"
                  placeholder={title}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </form>
            ) : (
              <h1 className="text-xl font-bold leading-10">{title}</h1>
            )}
            <button onClick={handleStarClick}>
              <Box
                position="relative"
                display="inline-flex"
                alignItems="center"
                marginTop={1}
              >
                <StarBorder sx={{ color: "#455a64", fontSize: 30 }} />
                {fav && (
                  <Star
                    sx={{
                      color: "#ffa000",
                      fontSize: 19,
                      position: "absolute",
                      top: 5.5,
                      left: 5.5,
                    }}
                  />
                )}
              </Box>
            </button>
          </div>
          <div className="flex flex-row items-center justify-center mt-2 px-4">
            {file ? (
              <Image
                src={`http://${file}`}
                alt="file"
                width={250}
                height={250}
              />
            ) : (
              <FileUploader noteId={id} />
            )}
          </div>
        </section>
        <footer className="mt-auto px-4 flex flex-row justify-between pb-2">
          <div className="flex flex-row gap-2">
            <button onClick={onButtonEditClick}>
              <Edit
                sx={buttonEditOpen ? { color: "#000" } : { color: "#455a64" }}
              />
            </button>
            <button
              onClick={onButtonColorClick}
              className="rounded-full w-8 h-8 border-none flex items-center justify-center"
              style={buttonColorOpen ? { backgroundColor: "#E5E5E5" } : {}}
            >
              <Image src={bucket} alt="bucket" width={22.5} height={22.5} />
            </button>
          </div>
          <button onClick={onButtonDeleteClick}>
            <Close className="hover:text-red-600" />
          </button>
        </footer>
      </div>
      {buttonColorOpen && (
        <div className="px-1 py-1 bg-white rounded-lg shadow-lg z-10 flex flex-wrap w-56 mt-[-10px]">
          {colors.map((color, index) => (
            <ColorMenu
              colorIndex={index}
              color={color}
              key={index}
              noteId={id}
            />
          ))}
        </div>
      )}
      <DeleteNoteDialog
        buttonDeleteOpen={buttonDeleteOpen}
        onButtonDeleteClick={onButtonDeleteClick}
        id={id}
      />
    </div>
  );
}
