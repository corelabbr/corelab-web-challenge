import { useTasksStore } from "@/libs/zustend";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  // const [searchTask, setSearchTask] = useState("");
  const { setSearchQuery } = useTasksStore();

  // useEffect(() => {
  //   SET_DEFAULT_LIST(tasks);
  //   // console.log("000");
  //   // DEFAULT_LIST = tasks;
  //   // console.log("--", DEFAULT_LIST);
  // }, []);

  function handleSearch(searchText: string) {
    const text = searchText.toLowerCase();
    setSearchQuery(text)
    // const showTask = tasks.filter((task) => task.title.toLowerCase().includes(text) || task.content.toLowerCase().includes(text));
    // if (text.length != 0) {
      // console.log("111");
      // console.log("--", DEFAULT_LIST);
      // setTasks(showTask);
    // } else {
      // console.log("222", DEFAULT_LIST);
// 
      // setTasks(DEFAULT_LIST);
    // }
  }

  return (
    <div className="bg-white w-full py-4 px-6 flex justify-between gap-x-2 items-center shadow-md *:text-[#455a64]">
      <div className="flex items-center gap-x-4">
        <Image src="/logo.png" alt="" width={36} height={36} />
        <p className="">CoreNotes</p>
        <div className="flex items-center md:min-w-[530px] shadow p-2 rounded-md">
          <input type="text" placeholder="Pesquisar notas" className="w-full outline-none " onChange={({ target }) => handleSearch(target.value)} />
          <Search size={18} />
        </div>
      </div>

      <X />
    </div>
  );
}
