"use client";
import { useState, useEffect } from "react";
import { CollaboratorProps } from "@/utils/cardCollaborator.type";
import { PaginationType, ResponseCollaborator } from "@/app/type/cardcollaborator.type";
import { useRouter } from "next/navigation";
import { Pagination } from 'antd';
import { ButtonRefresh } from "@/app/(private)/dashboard/components/buttonrefresh";
import Link from "next/link";
import { SearchBar } from "@/app/(private)/dashboard/collaborator/components/searchBar";
import { CollaboratorCard } from "../collaboratorCard";
import { CardSelect } from "@/app/(private)/dashboard/collaborator/components/cardSelect";
import Loading from "@/app/loading";
import { FiEdit, FiLoader, FiMail, FiPhone } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { CiCalendar } from "react-icons/ci";

export function CardCollaborator({ collaborator, total }: { collaborator: CollaboratorProps[], total: number }) {
    const paginationDefaults = { current: 1, pageSize: 6, total: total }
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [collaborators, setCollaborators] = useState<CollaboratorProps[]>(collaborator);
    const [pagination, setPagination] = useState<PaginationType>(paginationDefaults);
    const [selectStatus, setSelectStatus] = useState<string>('');
    const { data: session } = useSession();

    useEffect(() => {
        setLoading(false);
    }, [loading]);

    async function fetchCollaborator(offset: number = 0, limit: number = 6, search: string = '', status: string = ''): Promise<ResponseCollaborator> {
        const response = await fetch(`/api/collaborator?offset=${offset}&limit=${limit}&search=${search}&status=${status}`, {
            method: "GET"
        })
        const result = await response.json();
        return result;
    }
    async function handlePagination(_pagination: PaginationType, newSelectStatus: string = '') {
        try {
            setPagination(_pagination);
            setSelectStatus(newSelectStatus);
            const offset = (_pagination.current - 1) * _pagination.pageSize;
            const limit = _pagination.pageSize;
            const result = await fetchCollaborator(offset, limit, searchInput, newSelectStatus);
            setCollaborators(result.pack.data.collaborator);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSearch(search: string, newSelectStatus: string = '') {
        try {
            setSearchInput(search);
            setSelectStatus(newSelectStatus);
            setPagination(paginationDefaults)
            const offset = (paginationDefaults.current - 1) * paginationDefaults.pageSize;
            const limit = paginationDefaults.pageSize;
            const result = await fetchCollaborator(offset, limit, search, newSelectStatus);
            setCollaborators(result.pack.data.collaborator);
            setPagination({ ...pagination, total: result.pack.data.total_fetch });
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
    function handlePageChange(page: number, newSelectStatus: string) {

        handlePagination({ ...pagination, current: page }, newSelectStatus);
    }
    function getUserFirstAndSecondLetter() {
        const name = session?.user.name;
        const fullName = `${name}`;
        const userName = fullName?.split(" ");
        const userNameLetter = userName?.map((item) => item.charAt(0).toUpperCase())
        return userNameLetter;
    }
    return (
        <>
            {session?.user.origin == "USER" ? (
                <>
                    <div className="flex items-center flex-col md:flex-row gap-3 justify-between ">
                        <h1 className="font-bold text-[20px] md:text-3xl">Meus Colaboradores</h1>
                        <div className="flex items-center flex-col md:flex-row gap-3">
                            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} handleSearch={handleSearch} selectStatus={selectStatus} />
                            <CardSelect handleSearch={handleSearch} searchInput={searchInput} />
                            <ButtonRefresh href="/dashboard/collaborator" />
                            <Link href="/dashboard/collaborator/new" className="bg-blue-500 px-4 py-1 rounded text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                Novo Colaborador
                            </Link>
                        </div>
                    </div>
                    {loading ? (
                        <div className="w-full flex justify-center items-start mt-16">
                            <button className="animate-spin">
                                <FiLoader size='26' color="#4b5563" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                                {collaborators.length ? collaborators.map(item => <CollaboratorCard key={item.id} collaborator={item} handleDelete={handleDeleteCollaborator} />)
                                    : <p className="font-medium">Nenhum colaborador encontrado</p>}
                            </div>
                            <div className="flex justify-end">
                                {pagination.total > 0 && (
                                    <Pagination
                                        current={pagination.current}
                                        total={pagination.total}
                                        pageSize={pagination.pageSize}
                                        onChange={(page) => handlePageChange(page, selectStatus)} />
                                )}

                            </div>

                        </>
                    )}

                </>

            ) : (
                <>
                    <h1 className="font-bold text-[20px] md:text-3xl text-center mb-5">Meu perfil </h1>
                    {
                        collaborators.length ? collaborators.map(item => (
                            <div key={item.id} className="py-5 max-w-xl mx-auto shadow-lg rounded-xl overflow-hidden border-2 border-purple-100 hover:border-purple-200 transition-all duration-300">
                        <div className="rounded-lg bg-card text-card-foreground border-0 shadow-none">
                            <div className="p-0 md:px-6">
                                <div className="flex flex-col items-center mb-8">
                                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24 mb-4">
                                        <span className="flex h-full w-full items-center justify-center rounded-full  bg-gray-200">{getUserFirstAndSecondLetter()}</span>
                                    </span>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                                    </div>
                                </div>
                                <div className="mt-0 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                                    <div className="mt-0 pt-0 border-t border-purple-100">
                                        <div className="flex flex-col space-y-4">
                                            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                                              <FiMail size={24} className="" /> 
                                                <span className="text-gray-700 font-medium">{item.email}</span>
                                            </div>
                                            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                                                <FiPhone size={24} /> 
                                                <span className="text-gray-700 font-medium">{item.phone}</span>
                                            </div>
                                            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                                              <CiCalendar size={24} />
                                                <span className="text-gray-700 font-medium">Cadastrado em: {item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-200/80 text-sm px-4 py-1">Perfil {item.status}</div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button 
                                onClick={() => router.push(`/dashboard/collaborator/editar/${item.id}`)}
                                className="flex justify-center items-center gap-2 w-full max-w-[220px] bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                 <FiEdit size={24} className="cursor-pointer" /> 
                                <span>Editar Informações</span>    
                                </button>
                                
                            </div>
                        </div>
                    </div>
                        )): (
                            <p className="font-medium">Nenhum colaborador encontrado</p>
                        )
                    }
                   
                </>
            )}


        </>
    )
}
