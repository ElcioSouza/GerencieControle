import { FiHome, FiMail } from "react-icons/fi";

export function Benefits() {
  return (<div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">
                Por que escolher nossa plataforma?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <FiHome className="h-5 w-5 text-blue-500" /> 
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Automatização Inteligente
                    </h3>
                    <p className="text-gray-600">
                      Automatize processos repetitivos e foque no que realmente importa
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <FiMail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Notificações em Tempo Real
                    </h3>
                    <p className="text-gray-600">
                      Mantenha-se informado sobre o status dos seus chamados
                    </p>
                  </div>
                </div>
              </div>
            </div>);
}
  