import Link from "next/link";
import { auth } from "@/auth";
import { ShoppingCartIcon } from "./Icons";
import UserMenu from "./UserMenu";
import CartCounter from "./CartCounter";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="text-xl font-bold hidden sm:block">TechStore</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Productos
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="hover:text-indigo-200 transition-colors duration-200 font-medium"
              >
                Admin
              </Link>
            )}

            <Link
              href="/cart"
              className="relative hover:text-indigo-200 transition-colors duration-200"
            >
              <div className="flex items-center space-x-1">
                <ShoppingCartIcon />
                <span className="font-medium">Carrito</span>
              </div>
              <CartCounter />
            </Link>

            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Link
                href="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>

          {/* Mobile: Carrito + Menú hamburguesa */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Carrito visible en móvil */}
            <Link
              href="/cart"
              className="relative hover:text-indigo-200 transition-colors duration-200 p-1"
            >
              <ShoppingCartIcon />
              <CartCounter />
            </Link>

            {/* Avatar en móvil si está logueado */}
            {session?.user && <UserMenu user={session.user} />}

            {/* Botón hamburguesa */}
            <MobileMenu
              isAdmin={isAdmin}
              isLoggedIn={!!session?.user}
              userName={session?.user?.name || ""}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
