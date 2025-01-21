import { FiLoader } from "react-icons/fi";
export default function Loading() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-200">
            <button className="animate-spin">
                <FiLoader size={26} color="#4b5563" />
            </button>
        </div>
    );
}
