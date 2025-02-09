import React from "react";
interface CtaProps {
  signIn: () => void,
  status: string,
}
export function Cta({
  signIn, status
}: CtaProps) {
  return (<div className="mt-20 bg-blue-500 rounded-2xl p-8 text-center text-white">
    <h2 className="text-3xl font-bold mb-4">
      Comece a gerenciar seus chamados hoje
    </h2>
    <p className="text-xl mb-8">
      Experimente gratuitamente o sistema sem compromisso
    </p>
    {status === "unauthenticated" && (
      <button onClick={() => signIn()} className="bg-white text-blue-500 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
        Começar Agora
      </button>
    )}

  </div>);
}
