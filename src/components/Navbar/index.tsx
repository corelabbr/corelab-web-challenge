import Logo from "../../assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { useSearchStore } from "../../store/searchStore";


const index = () => {

  const setSearchValue = useSearchStore((store) => store.setSearchValue);

  return (
    <div className='bg-white flex justify-between items-center px-2 sm:px-8 py-2 shadow-md shadow-gray-400'>
      <div className="flex gap-2 sm:gap-5 items-center min-w-[50%]">
        <img src={Logo} alt="" />
        <span className="text-gray-600 font-sans sm:text-lg">CoreNotes</span>
        <div className="flex items-center shadow-sm shadow-gray-400 rounded-sm border border-gray-300 w-[80%] py-1 px-3">
          <input
            onChange={e => setSearchValue(e.target.value)}
            type="text"
            placeholder='Pesquisar notas'
            className="w-full text-[.7rem]  sm:text-[.8rem] focus:outline-none"
          />
          <AiOutlineSearch />
        </div>
      </div>
      <BsXLg className="border font-medium sm:text-2xl border-none" />
    </div>
  )
}

export default index;