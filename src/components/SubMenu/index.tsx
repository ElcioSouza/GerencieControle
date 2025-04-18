'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';
type UserSession = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    origin?: string | null;
  };
  expires: string;
};
interface SubmenuItem {
  label: string;
  href: string;
  handleLogout?: () => void
}

interface SubmenuProps {
  title: React.ReactNode;
  items: SubmenuItem[];
  data?: UserSession
}

export function Submenu({ title, items, data }: SubmenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block mr-0 ml-0 sm:mr-0">
      <div className='flex items-center justify-between relative z-10 px-0 md:px-4 py-2 cursor-pointer w-full'  onClick={() => setIsOpen(!isOpen)}>
        <div className='pl-2'>
          <div className="font-medium text-[#14171a] text-[14px] sm:text-[14px]">Ola, {data?.user.name} </div>
          <div className="text-sm text-gray-500 text-[14px] sm:text-[14px]">{data?.user.email} </div>
        </div>
        <div>
          <button
            className="flex items-center gap-0 sm:gap-1 px-0 sm:px-4 py-2 text-gray-700 rounded-md transition-colors">
              <div className='w-[26px] h-[26px] sm:w-[48px] md:h-[48px] '>
                {title} 
              </div>
            
            <FiArrowDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} `}/>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-9 mt-2 w-[14.2rem] sm:w-[14rem] md:w-[17.5rem] top-[-10px] pt-16 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onClick={() => setIsOpen(false)}>
          <div className="py-1" role="menu">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href || ''}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={item.label === "Sair" ? item.handleLogout : undefined} >
                {data?.user.origin === 'USER' ? item.label : item.label.replace('Colaborador', 'Perfil')}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}