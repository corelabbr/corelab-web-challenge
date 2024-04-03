const AppHeader = () => {
    return (
        <nav className="flex flex-row shadow-sm px-8 space-x-8 py-4 bg-white">
            <div>CoreNotes</div>
            <input type="search" name="search" id="search" placeholder="Pesquisar notas"/>
            <div className="flex-1"></div>
            <button>X</button>
        </nav>
    )
}

export default AppHeader