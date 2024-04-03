const CreateNote = () => {
    return (
        <form action="" className="w-[530px] bg-white rounded-md shadow-md">
            <div className="p-4 flex">
                <input className="placeholder:font-bold placeholder:text-black flex-1 focus:outline-none font-bold" type="text" name="title" id="title" placeholder="Titulo"/>
                <input type="checkbox" name="favorite" id="favorite" />
            </div>
            <hr />
            <textarea className="p-4 w-full resize-none focus:outline-none" name="body" id="body" rows={1} placeholder="Criar nota..."></textarea>
        </form>
    )
}

export default CreateNote