import Link from "next/link";
import { auth } from "@/auth";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCartIcon } from "./Icons";
import UserMenu from "./UserMenu";
import CartCounter from "./CartCounter";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">TechStore</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="hover:text-indigo-200 transition-colors duration-200"
            >
              Productos
            </Link>
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="hover:text-indigo-200 transition-colors duration-200"
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
                <span>Carrito</span>
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
        </div>
      </div>
    </header>
  );
}
