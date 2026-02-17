import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  try {
    console.log("🔍 Conectando a la base de datos...");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(`✅ Productos encontrados: ${products.length}`);
    return products as unknown as Product[];
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <div id="productos" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra selección de productos tecnológicos de última
            generación
          </p>
        </div>

        {/* Mensaje de debug - solo en desarrollo */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm font-mono">
              Productos encontrados: {products.length}
            </p>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No hay productos disponibles
            </p>
            <p className="text-gray-500 text-sm">
              Verifica la conexión a la base de datos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
