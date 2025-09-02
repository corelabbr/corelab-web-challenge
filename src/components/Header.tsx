import { Search } from "lucide-react";

export default function Header({ searchQuery, setSearchQuery }: any) {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-3xl md:text-2xl text-gray-900">
        <span className="block min-[500px]:inline">Core</span>{" "}
        <span className="block min-[500px]:inline">Notes</span>
      </h1>

      <div className="relative flex-1 items-center max-w-[250px] sm:max-w-xs md:max-w-md ml-3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-1 md:py-2 bg-white border border-gray-300 rounded-md focus:shadow-[0px_0px_0px_4px_rgba(0,_0,_0,_0.2)] focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ease-in-out duration-200 text-sm md:text-base"
        />
      </div>
    </header>
  );
}
