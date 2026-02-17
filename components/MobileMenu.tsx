"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  userName: string;
}

export default function MobileMenu({
  isAdmin,
  isLoggedIn,
  userName,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Botón Hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
        aria-label="Abrir menú"
      >
        {isOpen ? (
          // Icono X
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Icono Hamburguesa
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />
      )}

      {/* Menú desplegable */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del menú */}
        <div className="bg-indigo-600 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-lg">TechStore</p>
            {isLoggedIn && (
              <p className="text-indigo-200 text-sm">Hola, {userName}</p>
            )}
          </div>
          <button
            onClick={closeMenu}
            className="text-white hover:text-indigo-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links del menú */}
        <nav className="flex flex-col py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-b border-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">Inicio</span>
          </Link>

          <Link
            href="/#productos"
            onClick={closeMenu}
            className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-b border-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="font-medium">Productos</span>
          </Link>

          <Link
            href="/cart"
            onClick={closeMenu}
            className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-b border-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="font-medium">Carrito</span>
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-b border-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">Panel Admin</span>
            </Link>
          )}
        </nav>

        {/* Footer del menú */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          {isLoggedIn ? (
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg hover:bg-red-100 transition-colors font-semibold"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Cerrar Sesión
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
