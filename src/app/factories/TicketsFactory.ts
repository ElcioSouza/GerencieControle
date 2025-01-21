import { TicketType } from "../type/tickets.type"

export const ticketsFactory = (data:any): TicketType[] =>{
    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
        CollaboratorId: item.CollaboratorId,
        UserId: item.UserId,
        Collaborator: item.Collaborator
    }))
}
