"use client";
import { useEffect } from 'react';
import { TicketProps } from '@/utils/ticket.type';
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiLoader, FiEdit, FiEye } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { ModalContext } from '@/providers/modal';
import { Space, Table, Tag, Spin } from 'antd';
import type { TableProps } from 'antd';
import { TicketType } from '../../../type/tickets.type';
import { useSession } from 'next-auth/react';
import { ButtonRefresh } from '../buttonrefresh';
import Link from 'next/link';
import { TicketStatus } from '../ticketstatus';
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
export function TableTicketDashboard({ tickets: titcketsProps, total }: Props) {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Após 5 segundos, define loading como false
        }, 1000);

        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado antes dos 5 segundos
    }, [loading]); // Executa apenas uma vez, equivalente a componentDidMoun

    const { status, data } = useSession();
    const [tickets, setTickets] = useState<TicketType[]>(titcketsProps);
    const [pagination, setPagination] = useState<PaginationType>({ current: 1, pageSize: 5, total: 0 });
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);
    async function handlePagination(_pagination: PaginationType) {
        try {

            const response = await fetch(`/api/ticket?offset=${(_pagination.current - 1) * _pagination.pageSize}&limit=${_pagination.pageSize}`, {
                method: "GET"
            })
            const result = await response.json();
            setTickets(result.pack.data.tickets);
            if (result.pack.data.length > 0) {
                setPagination(result.pack.data.pagination as PaginationType)
                return;
            } else {
                setPagination(result.pack.data.pagination as PaginationType)
            }
        } catch (error) {
            console.log(error);
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
    function handleOpenModal(ticket: TicketType) {

        handleModalVisible();
        setDetailTicket({ ticket, collaborator: ticket.Collaborator });
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: (<><div className='ont-medium text-left pl-1 text-[23px]'>Colaborador</div></>),
            dataIndex: 'Collaborator',
            key: 'Collaborator',
            filteredValue: [search],
            onFilter: (value, record) => {
                if(typeof value === 'string'){
                    return String(record.Collaborator.name).toLowerCase().includes(value.toLowerCase()) 
                    ||  String(record.Collaborator.created_at).toLowerCase().includes(value.toLowerCase())
                    ||  String(record.status).toLowerCase().includes(value.toLowerCase())
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
                    <button onClick={() => handleChangeStatus(record)}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button className="mx-1" onClick={() => handleSearchTicket(record)}>
                        <FiEdit size={24} color="#131313" />
                    </button>
                    <button onClick={() => handleOpenModal(record)}>
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
       
            <Table
                size="large"
                caption={(
                    <div className="flex items-center justify-between my-2">
                        <h1 className="text-3xl font-bold ">Chamados</h1>
                        <div className="flex items-center gap-3">
                            <input type="text"
                                placeholder="Pesquisar Chamado"
                                className="border-2 border-slate-300 rounded-md p-1 outline-none"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
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
                                {status === "authenticated" && loading && <FiLoader size='26' color="#4b5563" />}
                            </button>
                        </div>
                    ), spinning: loading
                }}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                onChange={(_pagination) => {
                    setSearch(search);
                    setLoading(true);
                    handlePagination(_pagination as PaginationType)
                }} />
   
    </>
}   