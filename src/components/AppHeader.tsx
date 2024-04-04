import Close from "../icons/Close"
import Search from "../icons/Search"

const AppHeader = () => {
    return (
        <nav className="items-center flex flex-row shadow-sm px-8 space-x-8 py-4 bg-white">
            <img src="logo.svg" />
            <div>CoreNotes</div>
            <div className="border rounded-md flex flex-row items-center shadow p-2 flex-1">
                <input className="flex-1" type="search" name="search" id="search" placeholder="Pesquisar notas"/>
                <Search/>
            </div>
            <div className="flex-1"></div>
            <button>
                <Close/>
            </button>
        </nav>
    )
}

export default AppHeader