"use client";
import { useState } from "react";
import { CollaboratorProps } from "@/utils/cardCollaborator.type";
import { useRouter } from "next/navigation";
import { Pagination } from 'antd';
import { FiSearch } from "react-icons/fi";
import { ButtonRefresh } from "@/app/dashboard/components/buttonrefresh";
import Link from "next/link";
import Item from "antd/es/list/Item";
import { set } from "zod";
interface Props {
  // tickets: TicketType[],
    total: number
}
interface PaginationType {
    current: number;
    pageSize: number;
    total: number;
}
interface ResponseCollaborator {
    pack: {
        data: {
            collaborator: CollaboratorProps[],
            total: number,
            total_fetch: number
        }
    }
}
export function CardCollaborator({ collaborator,total }: { collaborator: CollaboratorProps[], total: number }) {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [collaborators, setCollaborators] = useState<CollaboratorProps[]>(collaborator);
    const [pagination, setPagination] = useState<PaginationType>({ current: 1, pageSize: 6, total });
    const [selectStatus, setSelectStatus] = useState('Ativo');
    async function fetchCollaborator(offset: number = 0, limit: number = 5, search: string = '', status: string = ''): Promise<ResponseCollaborator> {
        
        const response = await fetch(`/api/collaborator?offset=${offset}&limit=${limit}&search=${search}&status=${status}`, {
            method: "GET"
        })
        const result = await response.json();
        return result;
    }
 

    async function handlePagination(_pagination: PaginationType) {
        try {
            setPagination(_pagination);
            const offset = (_pagination.current - 1) * _pagination.pageSize;
            const limit = _pagination.pageSize;
            const result = await fetchCollaborator(offset, limit, searchInput);
            setCollaborators(result.pack.data.collaborator);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSearch(search: string, newSelectStatus: string = '') {
        try {
            setSearchInput(search);
            setSelectStatus(newSelectStatus);
            setPagination({current: 1, pageSize: 5, total: 0})
            const offset = (pagination.current - 1) * pagination.pageSize;
            const limit = pagination.pageSize;
            const result = await fetchCollaborator(offset, limit, search, newSelectStatus);
            setCollaborators(result.pack.data.collaborator);
            setPagination({...pagination, total: result.pack.data.total_fetch});
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteCollaborator(id: string) {
        try {
            if (confirm("Deseja deletar o colaborador?")) {
                const response = await fetch(`/api/collaborator?id=${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                if (result?.pack?.status === "Em andamento" || result?.pack?.status === "Urgente" || result?.pack?.status === "Baixo" || result?.pack?.status === "Pendente") {
                    alert(result?.pack?.error);
                }
                router.refresh();
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    function handlePageChange(page: number) {
        handlePagination({ ...pagination, current: page });
      //  setCurrentPage(page);
    }
    return (
        <>
          <div className="flex items-center flex-col md:flex-row gap-3 justify-between ">
                <h1 className="font-bold text-[20px] md:text-3xl">Meus Colaboradores</h1>
                <div className="flex items-center flex-col md:flex-row gap-3">
                    <div className="relative">
                    <button className="absolute right-2 z-1 top-2" onClick={()=> handleSearch(searchInput, selectStatus)}><FiSearch size={18} color="#4b5563" /></button>
                    <input type="text"
                           placeholder="Pesquisar Colaborador"
                           className="border-2 border-slate-300 rounded-md pr-7 pl-2 p-1 outline-none"
                           onChange={(e) => setSearchInput(e.target.value)}
                           onKeyUp={(e)=> e.key === 'Enter' && handleSearch(searchInput,selectStatus)} />
                    </div>
                    <select className="h-[35.6px] w-full md:w-fit border-2 rounded-md px-2 resize-none bg-white" 
                    onChange={(e)=>handleSearch(searchInput, e.target.value)}>
                         <option value="">Todos</option>
                        <option value="Ativo" selected>Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                    <ButtonRefresh href="/dashboard/collaborator" />
                    <Link href="/dashboard/collaborator/new" className="bg-blue-500 px-4 py-1 rounded text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Novo Colaborador
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                {collaborators.map((item) => (
                    <article key={item.id} className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
                        <h2>
                            <a className="font-bold">Nome:</a> {item.name}
                        </h2>
                        <p>
                            <a className="font-bold">Email:</a> {item.email}
                        </p>
                        <p>
                            <a className="font-bold">Telefone:</a> {item.phone}
                        </p>
                        <p>
                            <a className="font-bold">Status:</a> {item.status}
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => { handleDeleteCollaborator(item.id) }} className="rounded-md bg-red-600 py-1 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none self-start">
                                Deletar
                            </button>
                            <button onClick={() => { router.push(`/dashboard/collaborator/editar/${item.id}`) }} className="rounded-md bg-blue-600 py-1 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none self-start">
                                Editar
                            </button>
                        </div>
                    </article>
                ))}
                {collaborators.length === 0 && <p className="font-medium">Nenhum colaborador encontrado</p>}
            </div>
            
            <div className="flex justify-end">
                <Pagination
                    current={pagination.current}
                    total={pagination.total}
                    pageSize={pagination.pageSize}
                    onChange={(page) => handlePageChange(page)}
                />
            </div>
        </>
    )
}