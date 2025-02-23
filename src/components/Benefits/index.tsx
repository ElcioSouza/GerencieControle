import { FiHome, FiMail, FiSettings } from "react-icons/fi";
import { Tabs } from "@/components/Tabs"
import { CiHome, CiUser } from "react-icons/ci";

export function Benefits() {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CiHome className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Welcome Home</h2>
          </div>
          <p className="text-gray-600">
            This is the home tab content. You can put anything here.
          </p>
        </div>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CiUser className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">User Profile</h2>
          </div>
          <p className="text-gray-600">
            This is the profile tab content. You can customize this section.
          </p>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FiSettings className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Settings</h2>
          </div>
          <p className="text-gray-600">
            This is the settings tab content. Configure your preferences here.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-20">
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
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">React Tabs Example</h1>
        <div className="bg-white rounded-lg shadow p-6">
          
        </div>
      </div>
    </div>
    );
}
