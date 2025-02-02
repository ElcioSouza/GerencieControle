import { CollaboratorType } from "@/app/type/collaborator.type";

 
  export type TicketType = {
    id: string;
    name: string;
    description: string;
    status: 'Em andamento' | 'Pendente' | 'Urgente' | 'Fechado';
    created_at: Date;
    updated_at: Date;
    ClienteId: string;
    UserId: string;
    Collaborator: CollaboratorType;
  };