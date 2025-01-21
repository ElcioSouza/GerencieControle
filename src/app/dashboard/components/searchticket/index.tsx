import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormCollaboratorSchema, FormCollaboratorSchemaData } from "../../collaborator/schemas/formCollaboratorSchema";
import Input from "@/components/Input";
import { TicketType } from '../../../type/tickets.type';
export function SearchTicket() {
    const {
        handleSubmit,
        register,
        control,
        setError,
        formState: { errors },
    } = useForm<FormCollaboratorSchemaData>({
        resolver: zodResolver(FormCollaboratorSchema),
        defaultValues: {
            phone: "",
        },
    });
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<TicketType[]>([]);

    useEffect(() => {
        handleSearchTicket({ name: searchText, status: searchText, phone: searchText, address: searchText, email: searchText });
    }, []);


        /**
         * Filtra os tickets com base no valor informado
         * @param tickets Tickets a serem filtrados
         * @param value Valor a ser pesquisado
         */
        function handleSearch(tickets: TicketType[], value: string) {
            const lowerValue = value.toLowerCase();
            const filtered = tickets.filter(item =>
                // Verifica se algum dos valores do ticket é uma string
                // e se essa string contém o valor informado
                Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(lowerValue))
            );
            setFilteredData(filtered);
        }

    async function handleSearchTicket(data: FormCollaboratorSchemaData) {
       const response = await fetch(`/api/ticket`, {
           method: "POST",
           body: JSON.stringify({name: data.name, status: "Aberto"}),
       });
    }

    return <>

    </>
}