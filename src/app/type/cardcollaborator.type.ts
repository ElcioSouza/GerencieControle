import { CollaboratorProps } from "@/utils/cardCollaborator.type";

export interface PaginationType {
    current: number;
    pageSize: number;
    total: number;
}
export interface ResponseCollaborator {
    pack: {
        data: {
            collaborator: CollaboratorProps[],
            total: number,
            total_fetch: number
        }
    }
}