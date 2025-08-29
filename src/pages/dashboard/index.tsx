import { useState } from "react";
import { Header } from "../../components/Header";
import { NoteInput } from "../../components/NoteInput";
import { TodoList } from "../../components/TodoList";
import "./index.scss";

export const DashboardPage = () => {
    const [updateItems, setUpdateItems] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleUpdate = () => {
      setUpdateItems(!updateItems);
    };
  
    return (
      <main className="main-conteiner">
        <Header
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
        <NoteInput onCreate={handleUpdate} />
        <TodoList updateItems={updateItems} search={searchTerm} />
      </main>
    );
};
  