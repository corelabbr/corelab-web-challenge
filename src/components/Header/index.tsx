import { useState } from "react";
import IconButton from "../IconButton";
import Search from "../Search";
import styles from "./Header.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useTasks } from "../../contexts/TasksContext";

const Header = () => {
  const { page, fetchTasks } = useTasks();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    fetchTasks(page, 10, search);
  };

  return (
    <header className={styles.Container}>
      <img src="../corenote-icon.png" alt="Corenotes-icon" />
      <p className={styles.corenotes}>CoreNotes</p>

      <Search onChange={handleSearch} value={search} setValue={setSearch} />
      <IconButton
        Icon={AiOutlineClose}
        onClick={() => {
          setSearch("");
          fetchTasks();
        }}
      />
    </header>
  );
};

export default Header;
