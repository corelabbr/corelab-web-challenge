"use client";

import Image from "next/image";
import { useCallback } from "react";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { ToastContainer } from "react-toastify";

import TextSearch from "@/app/components/input";
import debounce from "@/app/helpers/debounce";
import useNotes from "@/app/hooks/notes";
import useUser from "@/app/hooks/user";
import useTheme from "@/app/hooks/useTheme";
import cn from "@/lib/clsx";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { userId } = useUser();
  const { searchNote, listNotes } = useNotes();

  const handleSearch = useCallback(
    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length === 0) {
        if (userId) {
          await listNotes(userId);
        }
        return;
      }
      await searchNote(value);
    }, 300),
    [userId],
  );

  return (
    <header
      className={cn(
        "w-full h-[57px]",
        "flex items-center gap-2 md:gap-7",
        "px-4 md:px-12",
        "bg-white dark:bg-primary",
        "shadow-header",
      )}
    >
      <div className="flex gap-4 items-center">
        <Image src="/logo.png" alt="Logo" width={36} height={36} />
        <h3 className="text-primary text-sm font-normal dark:text-white cursor-default hidden md:block">
          CoreNotes
        </h3>
      </div>
      <div className="flex-grow">
        <TextSearch
          placeholder="Pesquisar notas"
          allowDark
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div>
        <button className="cursor-pointer" onClick={toggleTheme}>
          {theme === "dark" ? (
            <IoMoon className="w-7 h-7 text-primary dark:text-white" />
          ) : (
            <IoSunnySharp className="w-7 h-7 text-accent-yellow dark:text-white" />
          )}
          {/* <IoSunnySharp className="w-7 h-7 text-primary" />
          <IoMoon className="w-7 h-7 text-primary" /> */}
        </button>
      </div>
      <ToastContainer />
    </header>
  );
}
