"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Usuario"}
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-indigo-600 font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* Info del usuario */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Opciones de menú */}
          <div className="py-2">
            <Link
              href="/orders"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Mis Pedidos
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Mi Perfil
            </Link>
          </div>

          {/* Cerrar sesión */}
          <div className="border-t border-gray-200 pt-2">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
