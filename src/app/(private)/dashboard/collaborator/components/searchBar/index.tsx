
"use client";
import { FiSearch } from "react-icons/fi";

interface searchBarProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (search: string, newSelectStatus: string) => void;
    selectStatus: string;
}

export function SearchBar({ searchInput, setSearchInput, handleSearch, selectStatus }: searchBarProps) {
    return (
        <div className="relative">
            <button className="absolute right-2 z-1 top-2" onClick={() => handleSearch(searchInput, selectStatus)}>
                <FiSearch size={18} color="#4b5563" />
            </button>
            <input
                type="text"
                placeholder="Pesquisar Colaborador"
                className="border-2 border-slate-300 rounded-md pr-7 pl-2 p-1 outline-none"
                value={searchInput}
                onBlur={() =>handleSearch(searchInput, selectStatus)}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch(searchInput, selectStatus)}
            />
        </div>
    );
}