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

export function CardCollaborator({ collaborator, total }: { collaborator: CollaboratorProps[], total: number }) {
    const paginationDefaults =
    { current: 1, pageSize: 6, total: total }
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [collaborators, setCollaborators] = useState<CollaboratorProps[]>(collaborator);
    const [pagination, setPagination] = useState<PaginationType>(paginationDefaults);
    const [selectStatus, setSelectStatus] = useState('Ativo');

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
    async function handlePagination(_pagination: PaginationType) {
        try {
            setPagination(_pagination);
            const offset = (_pagination.current - 1) * _pagination.pageSize;
            const limit = _pagination.pageSize;
            const result = await fetchCollaborator(offset, limit, searchInput);
            console.log(offset, limit, searchInput,result);
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
    function handlePageChange(page: number) {
        handlePagination({ ...pagination, current: page });
        //  setCurrentPage(page);
    }
    return (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                {collaborators.length ? collaborators.map(item => <CollaboratorCard key={item.id} collaborator={item} handleDelete={handleDeleteCollaborator} />)
                    : <p className="font-medium">Nenhum colaborador encontrado</p>}
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