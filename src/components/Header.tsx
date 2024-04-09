import Close from '../icons/Close';
import Search from '../icons/Search';

export const Header = () => {
  return (
    <header>
      <nav className="items-center flex flex-row shadow-md px-8 space-x-5 py-4 bg-white">
        <img src="logo.svg" />
        <h1 className="text-[#455A64]">CoreNotes</h1>
        <div className="border rounded-md flex flex-row items-center shadow-md p-[9px] flex-1">
          <input
            className="flex-1 outline-none"
            type="search"
            name="search"
            id="search"
            placeholder="Pesquisar notas"
          />
          <Search className="mr-2 w-5 h-5" />
        </div>
        <div className="flex-1"></div>
        <button>
          <Close />
        </button>
      </nav>
    </header>
  );
};
