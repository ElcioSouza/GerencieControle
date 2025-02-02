
"use client";
interface CardSelectProps {
    handleSearch: (search: string, newSelectStatus: string) => void,
    searchInput: string
}

export function CardSelect({ handleSearch, searchInput }: CardSelectProps) {
    return (
        <select className="h-[35.6px] w-full md:w-fit border-2 rounded-md px-2 resize-none bg-white"
            onChange={(e) => handleSearch(searchInput, e.target.value)}>
            <option value="">Todos</option>
            <option value="Ativo" selected>Ativo</option>
            <option value="Inativo">Inativo</option>
        </select>
    )
}