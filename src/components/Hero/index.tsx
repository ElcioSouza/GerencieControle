import React from "react";
import { FiArrowRight } from "react-icons/fi";

interface HeroProps {
  signIn: () => void,
  status: string,
}
export function Hero({ signIn, status }: HeroProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Sistema de Chamados Inteligente
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Gerencie seus atendimentos de forma eficiente e profissional
      </p>
      {status === "unauthenticated" && (
        <button onClick={() => signIn()} className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center">
          Começar Agora
          <FiArrowRight className="ml-2 h-5 w-5" />
        </button>
      )}

    </div>);
}
