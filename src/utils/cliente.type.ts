export interface ClienteProps {
    name: string;
    email: string;
    id: string;
    address: string | null;
    phone: string;
    UserId: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}