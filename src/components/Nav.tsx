import { MagnifyingGlass, X } from '@phosphor-icons/react';
import logo from '../images/icon.png';

const Nav = () => {
    return (
        <nav className="w-full bg-white flex h-[57px] shadow-md items-center">
            <div className="gap-7 flex ms-4 items-center">
                <div className="flex items-center text-lg gap-4">
                    <img src={logo} className="w-[36.31px] h-[36.31px]" alt="Logotipo" />
                    <span>CoreNotes</span>
                </div>
                <div className="flex items-center  flex-1 lg:w-[33.1356rem] xl:w-[33.1356rem] 2xl:w-[33.1356rem]">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="flex-1 outline-none p-2"
                        placeholder="Pesquisar nota"
                    />
                    <button>
                        <MagnifyingGlass size={20} color="#9E9E9E" />
                    </button>
                </div>
            </div>
            <div className="flex items-center flex-1 justify-end me-3">
                <button>
                    <X size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
