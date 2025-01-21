import { CollaboratorType } from "./collaborator.type";

 
  export type TicketType = {
    id: string;
    name: string;
    description: string;
    status: 'Aberto' | 'Fechado';
    created_at: Date;
    updated_at: Date;
    ClienteId: string;
    UserId: string;
    Collaborator: CollaboratorType;
  };