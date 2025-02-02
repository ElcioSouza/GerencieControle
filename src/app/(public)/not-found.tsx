import Link from "next/link";

export default function NotFound() {
    return (
        <main className="bg-gray-200">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl my-3">Pagina não encontrada!</h1>
                <Link className="text-xl text-blue-600" href="/">Voltar para home</Link>
            </div>
        </main>
    )
}   