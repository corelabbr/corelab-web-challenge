import LogoIcon from "@/assets/icons/logoIcon";
import Search from "../../Search";
import XIcon from "@/assets/icons/xIcon";

function Header() {
  return (
    <header className="bg-white shadow-sm shadow-[#95959540] py-4  lg:px-20 px-4">
      <div className="flex items-center justify-between gap-4 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 flex-1/2">
          <LogoIcon />
          <h1 className="text-[14px] text-[#455A64]">CoreNotes</h1>
          <Search className="sm:w-1/2 p-[5px] shadow-md rounded-[3px]" />
        </div>
        <XIcon className="w-[13px] h-[13px] cursor-pointer" color="#9E9E9E" />
      </div>
    </header>
  );
}

export default Header;
