"use client";
import SearchIcon from "@/assets/icons/searchIcon";
import { useRouter } from "next/navigation";
import { ChangeEvent, ComponentProps, useState } from "react";
import { Input } from "../ui/input";

function Search({ className }: ComponentProps<"search">) {
  const router = useRouter();
  const [inputValue, setValue] = useState("");

  // função para lidar com a mudança de valor do input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  // função para lidar com a pesquisa
  const handleSearch = () => {
    if (inputValue) return router.push(`/?title=${inputValue}`);

    if (!inputValue) return router.push("/");
  };

  // função para lidar com o pressionamento da tecla Enter
  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 border-1 border-gray-300  ${className}`}
    >
      <Input
        placeholder="Pesquisar notas por (titulo)"
        type="text"
        value={inputValue ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="border-0 w-full focus-visible:border-none focus-visible:ring-[none] px-0 text-[13px]  text-[#4F4F4D]"
      />

      <SearchIcon
        className="w-[13px] h-[13px] cursor-pointer"
        color="#9E9E9E"
        onClick={handleSearch}
      />
    </div>
  );
}

export default Search;
