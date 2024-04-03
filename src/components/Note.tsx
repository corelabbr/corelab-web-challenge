const Note = () => {
    return (
        <div className="w-96 bg-white rounded-3xl shadow-md">
            <div className="p-4 flex">
                <input className="placeholder:font-bold placeholder:text-black flex-1 focus:outline-none font-bold" type="text" name="title" id="title" placeholder="Titulo"/>
                <input type="checkbox" name="favorite" id="favorite" />
            </div>
            <hr />
            <textarea className="p-4 w-full resize-none focus:outline-none" name="body" id="body" rows={10} placeholder="Clique ou arraste o arquivo para esta arae para fazer upload"></textarea>
            <div className="flex flex-row space-x-2 p-4">
                <button>Edit</button>
                <input type="color" name="color" id="color" />
                <div className="flex-1"></div>
                <button>X</button>
            </div>
        </div>
    )
}

export default Note