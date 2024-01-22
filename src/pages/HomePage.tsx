import Nav from '../components/Nav'
import NewItem from '../components/NewItem'
import Note from '../components/Note';




export default function Home() {
    const note =
    {
        title: "Título",
        description: "Clique ou arraste o arquivo para esta área para fazer upload",
        color: "bg-[#BAE2FF]",
        star: false
    }
    const note3 = {
        title: 'Título',
        description: 'Clique ou arraste o arquivo para esta área para fazer upload',
        color: 'bg-[#fff]',
        star: false
    };
    return (
        <div className="App">
            <Nav />
            <NewItem />
            <div className="w-full px-32">
                <span className="ms-8">
                    Favoritos
                </span>
                <div className="flex gap-8 flex-wrap">
                    <Note {...note3} />
                </div>
            </div>
            <div className="mt-7 w-full px-32">
                <span className="ms-8">
                    Outras
                </span>
                <div className="flex gap-8 flex-wrap mb-4">
                    <Note {...note} />
                    <Note {...note} />
                    <Note {...note} />
                    <Note {...note} />
                    <Note {...note} />
                </div>
            </div>
        </div>
    );
}