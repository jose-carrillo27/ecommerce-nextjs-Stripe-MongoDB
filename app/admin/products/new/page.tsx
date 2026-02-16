import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/products"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 mb-4"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver a Productos
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Nuevo Producto</h1>
          <p className="text-gray-600 mt-2">
            Completa la información para agregar un nuevo producto al catálogo
          </p>
        </div>

        <ProductForm />
      </div>
    </div>
  );
}
