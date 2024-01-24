"use client";
import React from "react";
import Image from "next/image";
import LogoImg from "../../../public/images/logo.svg";
import SearchImg from "../../../public/images/search.svg";
import CloseImg from "../../../public/images/close.svg";
import { HeaderProps } from "@/types/Header";

const Header = ({ setSearch }: HeaderProps) => {
  return (
    <header className="bg-white flex justify-between items-center py-2 px-8">
      <div className="flex items-center w-full md:w-1/2">
        <Image src={LogoImg} alt="Image Logo" priority />
        <p className="ml-2 mr-6 text-m text-[#455A64]">CoreNotes</p>
        <div className="border-[1px] border-slate-200 flex items-center w-full shadow-3xl">
          <input
            type="text"
            placeholder="Pesquisar notas"
            className="p-1 pl-3 w-full outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Image
            src={SearchImg}
            alt="Image Logo"
            priority
            className="text-[#9E9E9E] size-7 pr-3 cursor-pointer"
          />
        </div>
      </div>
      <Image
        src={CloseImg}
        alt="Image Logo"
        priority
        className="cursor-pointer"
      />
    </header>
  );
};

export default Header;
