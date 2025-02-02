"use client";
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

interface ButtonRefreshProps {
    href?: string;
}

export function ButtonRefresh({ href = "/" }: ButtonRefreshProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.push(href);
                router.refresh();
            }}
            className="bg-gray-900 px-4 py-1 rounded text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            <FiRefreshCcw size={24} color="#fff" />
        </button>
    );
}
