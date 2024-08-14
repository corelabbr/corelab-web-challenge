"use client";
import { useEffect } from "react";
import { Card } from "./components/card";
import { Header } from "./components/header";
import { InputCard } from "./components/input-card";
import { createUser } from "./api/user/create-user";
import { Main } from "./components/main";
import { SessionProvider } from "./context/session-id-context";
import { NotesProvider } from "./context/notes-context";

export default function Home() {
  return (
    <div className="bg-[#F0F2F5] h-max">
      <SessionProvider>
        <NotesProvider>
          <Header />
          <Main />
        </NotesProvider>
      </SessionProvider>
    </div>
  );
}
