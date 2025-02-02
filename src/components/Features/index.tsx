import React from "react";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";
export function Feature({}) {
  return <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiClock className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Atendimento 24h </h3>
                <p className="text-gray-600">
                  Suporte disponível a qualquer momento para suas necessidades
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiUsers className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão de Equipe</h3>
                <p className="text-gray-600">
                  Organize sua equipe e distribua chamados de forma eficiente
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiCalendar className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Agendamento</h3>
                <p className="text-gray-600">
                  Agende atendimentos e mantenha o controle do seu tempo
                </p>
              </div>
            </div>;
}
  