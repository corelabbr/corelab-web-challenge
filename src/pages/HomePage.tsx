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
        <div className="App flex items-center flex-col">
            <Nav />
            <NewItem />
            <div className="mt-7 w-full px-[5%]  lg:px-[7%] xl:px-[7%] 2xl:px-[7%] ">
                <span className="ms-8">
                    Favoritos
                </span>
                <div className="flex gap-7 justify-center flex-wrap lg:justify-start xl:justify-start 2xl:justify-start">
                    <Note {...note3} />
                </div>
            </div>
            <div className="mt-7 w-full px-[5%]  lg:px-[7%] xl:px-[7%] 2xl:px-[7%]">
                <span className="ms-16">
                    Outras
                </span>
                <div className="flex gap-7 flex-wrap justify-center lg:justify-start xl:justify-start 2xl:justify-start mb-4">
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