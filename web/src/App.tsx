import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import logo from "./assets/corelab-logo.svg";
import closeIcon from "./assets/icons/close.svg";
import { Dashboard } from "./components/Dashboard";
import { ListTasks } from "./components/ListTasks";
import { useTask } from "./hooks/useTask";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchedTasks, isSearching } = useTask(searchQuery);

  return (
    <main className="min-h-dvh w-full bg-accent p-18 pt-8 max-md:pt-32">
      <header className="fixed z-50 top-0 w-full flex items-center gap-4 justify-around py-3 px-3 bg-white shadow-lg">
        <div className="flex items-center max-md:flex-col gap-2 max-md:gap-1 font-light text-xl">
          <img className="h-12 w-auto" src={logo} alt="CoreNotes Logo" />
          <span>CoreNotes</span>
        </div>
        <div className="relative flex items-center">
          <MagnifyingGlass
            className="absolute right-2"
            color="gray"
            size={24}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tarefas..."
            className="bg-white border shadow-md w-[60vw] max-md:w-full border-gray-300 pr-12 rounded-md px-3 py-2 text-lg font-light"
          />
        </div>
        <button onClick={() => setSearchQuery("")} className={`${ isSearching ? "visible" : "invisible" }`}>
          <img className="h-6 w-auto" src={closeIcon} alt="close-icon" />
        </button>
      </header>

      <section>
        {isSearching ? (
          <div className="px-16 pt-16 max-md:p-4">
            {searchedTasks.length === 0 ? (
              <div>Nenhuma tarefa encontrada para "{searchQuery}"</div>
            ) : (
              <ListTasks tasks={searchedTasks} />
            )}
          </div>
        ) : (
          <Dashboard />
        )}
      </section>
    </main>
  );
}
