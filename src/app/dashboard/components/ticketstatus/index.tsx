export function TicketStatus({ status }: { status: string }) {

    const changeStatus = (status: string) => {
        switch (status) {
            case "Em andamento":
                return <span className="bg-yellow-300 px-2 py-1 rounded">{status}</span>
            case "Pendente":
                return <span className="bg-yellow-300 px-2 py-1 rounded">{status}</span>
            case "Urgente":
                return <span className="bg-red-300 px-2 py-1 rounded">{status}</span>
            case "Fechado":
                return <span className="bg-red-300 px-2 py-1 rounded">{status}</span>
            case "Cancelado":
                return <span className="bg-green-300 px-2 py-1 rounded">{status}</span>
            case "Baixo":
                return <span className="bg-pink-300 px-2 py-1 rounded">{status}</span>
        }
    };
    return (
        <>{changeStatus(status)}</>
    );
}
