"use client";
import React, { useEffect } from 'react';
import { TicketProps } from '@/utils/ticket.type';
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiLoader, FiEdit, FiEye, FiSearch } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { ModalContext } from '@/providers/modal';
import { Space, Table, Tag, Spin } from 'antd';
import type { TableProps } from 'antd';
import { TicketType } from '@/app/type/tickets.type';
import { useSession } from 'next-auth/react';
import { ButtonRefresh } from '@/app/(private)/dashboard/components/buttonrefresh';
import Link from 'next/link';
import { TicketStatus } from '@/app/(private)/dashboard/components/ticketstatus';
interface Props {
    tickets: TicketType[],
    total: number
}
interface DataType extends TicketType {
    key?: React.Key;
};
interface PaginationType {
    current: number;
    pageSize: number;
    total: number;
}
interface ResponseTickets {
    pack: {
        data: {
            tickets: TicketType[],
            total: number,
            total_fetch: number
        }
    }
}

export function TableTicketDashboard({ tickets: titcketsProps, total }: Props) {
    const paginationDefaults = { current: 1, pageSize: 6, total }
    const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectStatus, setSelectStatus] = useState('');

    useEffect(() => {
        setLoading(false);
    }, [loading]);

    const { status, data } = useSession();
    const [tickets, setTickets] = useState<TicketType[]>(titcketsProps);
    const [pagination, setPagination] = useState<PaginationType>(paginationDefaults);
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);
    async function fetchTickets(offset: number = 0, limit: number = 5, search: string = '', status: string = ''): Promise<ResponseTickets> {
        const response = await fetch(`/api/ticket?offset=${offset}&limit=${limit}&search=${search}&status=${status}`, {
            method: "GET"
        })
        const result = await response.json();
        console.log(search);
        return result;
    }

    async function handlePagination(_pagination: PaginationType) {
        try {
            setLoadingTable(true);
            setPagination(_pagination);
            const offset = (_pagination.current - 1) * _pagination.pageSize;
            const limit = _pagination.pageSize;
            const result = await fetchTickets(offset, limit, searchInput);
            setTickets(result.pack.data.tickets);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingTable(false);
        }
    }

    async function handleSearch(search: string, newSelectStatus: string = '') {
        try {
        
            setSearchInput(search);
            setSelectStatus(newSelectStatus);
            setPagination(paginationDefaults)
            setLoadingTable(true);
            const offset = (paginationDefaults.current - 1) * paginationDefaults.pageSize;
            const limit = paginationDefaults.pageSize;
            const result = await fetchTickets(offset, limit, search, newSelectStatus);
            setTickets(result.pack.data.tickets);
            setPagination({ ...pagination, total: result.pack.data.total_fetch });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingTable(false);
        }
    }

    async function handleChangeStatus(ticket: TicketProps) {
        try {
            if (confirm('Deseja alterar chamado para fechado?')) {
                const response = await fetch(`/api/ticket?id=${ticket.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ id: ticket?.id }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const result = response.json();
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSearchTicket(ticket: TicketType) {
        router.push(`/dashboard/edit/${ticket.id}`);
    }
    function handleOpenModal(ticket: TicketType, e?: React.MouseEvent<HTMLDivElement>) {
        if(window.innerWidth < 992)  {
            handleModalVisible(); 
            setDetailTicket({ ticket, collaborator: ticket.Collaborator });
            return;
        }
        if (!e || !e.target) return;
        
        const evento = e.target as HTMLElement;
        if (evento.closest(".mx-1.edit, .checkstatus")) return;
        
        handleModalVisible(); 
        setDetailTicket({ ticket, collaborator: ticket.Collaborator });
    }

    async function handleClickRowModalShow(record: TicketType, e: React.MouseEvent<HTMLDivElement>) {
        if(window.innerWidth > 992) {
            handleOpenModal(record, e);
         } 
  }


    const columns: TableProps<DataType>['columns'] = [
        {
            title: (<><div className='ont-medium text-left pl-1 text-[23px]'>Colaborador</div></>),
            dataIndex: 'Collaborator',
            key: 'Collaborator',
            onFilter: (value, record) => {
                if (typeof value === 'string') {
                    return String(record.Collaborator.name).toLowerCase().includes(value.toLowerCase())
                        || String(record.Collaborator.created_at).toLowerCase().includes(value.toLowerCase())
                        || String(record.status).toLowerCase().includes(value.toLowerCase())
                } else {
                    return false;
                }
            },
            render: (data,) => <span className='pl-1 text-left'>{data.name}</span>,

        },
        {
            title: (<><div className='ont-medium text-left pl-1 text-[23px]'>Data</div></>),
            key: 'created_at',
            dataIndex: 'created_at',
            render: (date) => {
                const dateFormated = new Date(date).toLocaleDateString('pt-BR');
                return <span className='pl-1 text-left'>{dateFormated}</span>
            }
        },
        {
            title: (<><div className='ont-medium text-left pl-1 text-[23px]'>Status</div></>),
            key: 'status',
            dataIndex: 'status',
            render: (status, record) => (
                <Space size="middle">
                    <TicketStatus status={status} />
                </Space>
            ),
        },
        {
            title: (<><div className='ont-medium text-left pl-1 text-[23px]'>Action</div></>),
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className="checkstatus"  onClick={() => handleChangeStatus(record)}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button className="mx-1 edit" onClick={() => handleSearchTicket(record)}>
                        <FiEdit size={24} color="#131313" />
                    </button>
                    <button className="view" onClick={() => handleOpenModal(record)}>
                        <FiEye size={24} color="#131313" />
                    </button>
                </Space>
            )
        },
    ];

    const dataSource = tickets.map((ticket: TicketType) => ({
        key: ticket.id,
        ...ticket,
    }))
    return <>
        {loading && (<>
            <div className="w-full flex justify-center items-start">
                <button className="animate-spin">
                    <FiLoader size='26' color="#4b5563" />
                </button>
            </div>
        </>)}
        {!loading && (
            <Table
            onRow={(record) => ({
                onClick: (e) => handleClickRowModalShow(record,e),
            })}
                scroll={{ x: 'max-content' }}
                caption={(
                    <div className="flex items-center justify-between my-2">
                        <h1 className="font-bold mx-2 md:mr-0 text-[26px] md:text-3xl">Chamados</h1>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button className="absolute right-2 z-1 top-2" onClick={() => handleSearch(searchInput,selectStatus)}><FiSearch size={18} color="#4b5563" /></button>
                                <input type="text"
                                    placeholder="Pesquisar Chamado"
                                    className="border-2 border-slate-300 rounded-md pr-7 pl-2 p-1 outline-none"
                                    onBlur={() =>handleSearch(searchInput, selectStatus)}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyUp={(e) => e.key === 'Enter' && handleSearch(searchInput,selectStatus)}
                                />
                            </div>
                            <select className="h-[35.6px] w-full md:w-fit border-2 rounded-md px-2 resize-none bg-white"
                                onChange={(e) => handleSearch(searchInput,e.target.value)}>
                                <option value="" selected>Todos</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Fechado">Fechado</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Urgente">Urgente</option>
                                <option value="Baixo">Baixo</option>
                            </select>
                            <ButtonRefresh href="/dashboard" />
                            <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-[#FFF!important] transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"> Abrir chamado </Link>
                        </div>
                    </div>
                )}
                rowClassName={"border-b-2 border-b-slate-200 h-16 last:border-b-0 odd:bg-slate-200 hover:bg-gray-200 duration-300"}
                tableLayout='auto'
                loading={{
                    indicator: (
                        <div className="w-full flex justify-center items-start">
                            <button className="animate-spin">
                                {status === "authenticated" && !loadingTable && <FiLoader size='26' color="#4b5563" />}
                            </button>
                        </div>
                    ), spinning: loadingTable
                }}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                onChange={(_pagination) => {

                    handlePagination(_pagination as PaginationType)
                }} />
        )}


    </>
}   