import { AiOutlineSearch } from "react-icons/ai";
import notesLogo from "../../assets/core-notes.svg";
import "./styles.scss";

interface TopbarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function Topbar({ searchTerm, setSearchTerm }: TopbarProps) {
  return (
    <>
      <header className="header_container">
        <div className="notes_logo">
          <img src={notesLogo} />
          <h4>CoreNotes</h4>
        </div>
        <div className="wrap_search">
          <input
            type="text"
            placeholder="Pesquisar notas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch />
        </div>
      </header>
    </>
  );
}
