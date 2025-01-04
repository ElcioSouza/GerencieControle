"use client";
import { ClienteProps } from '@/utils/cliente.type';
import { TicketProps } from '@/utils/ticket.type';
import { useRouter } from "next/navigation";
import  {FiFile, FiCheckSquare, FiTrash2} from 'react-icons/fi'; 
import {useContext} from 'react';
import {ModalContext} from '@/providers/modal';

interface TicketItemProps {
  ticket: TicketProps;
  cliente: ClienteProps | null;
}


export function TicketItem({ cliente, ticket}: TicketItemProps) {
      const router = useRouter();
      const  {handleModalVisible, setDetailTicket} = useContext(ModalContext); 
  async function handleChangeStatus() {
      try {
        if(confirm('Deseja deletar um chamado?')){
          const response = await fetch(`/api/ticket?id=${ticket.id}`, {
            method: "PATCH",
            body: JSON.stringify({id: ticket.id})
         })
         router.refresh();
        }
      } catch(error) {
        console.log(error);
      }
  }

  function handleOpenModal() {    
    handleModalVisible();
    setDetailTicket({ticket, cliente});
  }

    return  <>
              <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">{cliente?.name}</td>
                <td className="text-left">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left">
                  <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
                </td>
                <td className="text-left">
                  <button className="mr-3" onClick={handleChangeStatus}>
                    <FiTrash2 size={24} color="#131313"/>
                  </button>
                  <button onClick={handleOpenModal}>
                    <FiFile size={24} color="#3b82f6"/>
                  </button>
                </td>
              </tr>
            </>
}   