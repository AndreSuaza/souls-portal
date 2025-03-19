'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoLogOutOutline } from 'react-icons/io5';
import { logout } from '@/actions';


export default function Navbar() {

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex flex-grow">
        <Image
            src={`/souls-in-xtinction-logo-sm.png`}
            alt={'logo-icono-souls-in-xtinction'}
            className='w-12 h-12'
            width={40}
            height={40}
        />
        <span className={`antialiased font-bold my-auto ml-2`}> Souls In Xtinction | TCG</span>
        </div>

        {/* Nav Links */}
        <div className={`md:flex md:items-center space-x-6`}>
          <Link href="/portal/ventas" className="hover:text-gray-400">Ventas</Link>
          <Link href="/portal/gastos" className="hover:text-gray-400">Gastos</Link>
          <button onClick={logout} className='cursor-pointer'><IoLogOutOutline className='w-6 h-6' /></button>
        </div>
      </div>
    </nav>
  );
}