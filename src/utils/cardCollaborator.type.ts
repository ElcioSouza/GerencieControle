export interface CollaboratorProps {
    name: string;
    email: string;
    lastName: string;
    id: string;
    address: string | null;
    phone: string;
    status?: string | null;
    UserId: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}