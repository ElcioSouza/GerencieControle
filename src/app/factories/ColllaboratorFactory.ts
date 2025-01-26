import { stat } from "fs"
import { CollaboratorType } from "../type/collaborator.type"

export const colllaboratorFactory = (data:any): CollaboratorType[] =>{
    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        address: item.address,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
        UserId: item.UserId,
    }))
}
