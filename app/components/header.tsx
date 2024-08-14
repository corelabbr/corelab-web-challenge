import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { SearchBar } from "./search-bar";
export function Header() {
  return (
    <header className=" px-8 w-full h-14 bg-white flex justify-start items-center gap-5 lg:h-18 lg:gap-20">
      <div className="flex flex-row items-center gap-2">
        <Image src={Logo} alt="Logo" width={20} height={20} />
        <h1 className=" text-sm lg:text-base">CoreNotes</h1>
      </div>
      <SearchBar />
    </header>
  );
}
