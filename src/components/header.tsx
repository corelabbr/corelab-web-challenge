"use client";
import React from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";

import Logo from "../images/logo-tasks.png";
import { useSearchBar } from "../store/searchBar";
import { useTaskStore } from "../store/taskStore";

export function Header() {
  const setSearchBarValue = useSearchBar((store) => store.setSearchBarValue);
  const searchBarValue = useSearchBar((state) => state.searchBarValue);
  const filterTasks = useTaskStore((store) => store.filterTasks);

  return (
    <header className="bg-white flex justify-between gap-4 h-24 w-full ps-6 pe-6 shadow-md shadow-zinc-400 items-center">
      <div className="flex gap-4 w-full items-center">
        <Image src={Logo} alt="Logo do CoreNotes" />
        <span className="mr-1">CoreNotes</span>
        <div className="flex items-center justify-between max-w-lg w-full p-2 rounded-md shadow-md shadow-zinc-400 hover:shadow-zinc-500">
          <input
            type="text"
            placeholder="Pesquisar notas"
            className="bg-white border-none w-full h-full text-sm placeholder-zinc-400 focus-visible:outline-none"
            value={searchBarValue}
            onChange={(event) => {
              setSearchBarValue(event.target.value);
              filterTasks(event.target.value);
            }}
          />
          {searchBarValue.length > 0 ? (
            <X
              color="#464646"
              className="cursor-pointer"
              onClick={() => {
                setSearchBarValue("");
                filterTasks("");
              }}
            />
          ) : (
            <Search color="#464646" className="cursor-pointer" />
          )}
        </div>
      </div>
      <X
        color="#464646"
        className="cursor-pointer"
        onClick={() => window.close()}
      />
    </header>
  );
}
