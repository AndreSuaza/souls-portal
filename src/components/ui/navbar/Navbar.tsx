'use client';

import Link from 'next/link';
import { IoClose, IoLogOutOutline, IoMenu } from 'react-icons/io5';
import { logout } from '@/actions';
import { useState } from 'react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">Souls In Xtinction | TCG</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">

            <Link href="/" className="text-gray-700 hover:text-indigo-500 font-medium transition">
              Inicio
            </Link>
            <Link href="/portal/ventas" className="text-gray-700 hover:text-indigo-500 font-medium transition">
              Ventas
            </Link>
            <Link href="/portal/gastos" className="text-gray-700 hover:text-indigo-500 font-medium transition">
              Gastos
            </Link>
            <button onClick={logout} className="text-gray-700 hover:text-indigo-500 font-medium transition">
              <IoLogOutOutline className='w-6 h-6' />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoClose className="w-6 h-6"/> : <IoMenu className="w-6 h-6"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full transition">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link 
              href="/" className="text-gray-700 hover:text-indigo-500 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/portal/ventas" className="text-gray-700 hover:text-indigo-500 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Ventas
            </Link>
            <Link 
              href="/portal/gastos" className="text-gray-700 hover:text-indigo-500 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Gastos
            </Link>
            <button onClick={logout} className="text-indigo-500 hover:text-indigo-800 font-medium transition">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}