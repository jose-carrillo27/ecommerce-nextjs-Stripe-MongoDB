"use client";

import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import ImageCarousel from "@/components/ImageCarousel";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "features"
  >("description");
  const [buyLoading, setBuyLoading] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          notFound();
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const images = product.images || [product.image];

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    const button = document.getElementById("add-to-cart-btn");
    if (button) {
      button.textContent = "¡Agregado! ✓";
      setTimeout(() => {
        button.textContent = "Agregar al Carrito";
      }, 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!product.inStock) return;

    setBuyLoading(true);

    try {
      const items = [{ ...product, quantity }];

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        alert(`Error: ${error}`);
        setBuyLoading(false);
        return;
      }

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        alert(`Error: ${stripeError.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            Inicio
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            {product.category}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Carrusel de imágenes */}
          <div>
            <ImageCarousel images={images} productName={product.name} />
          </div>

          {/* Información del producto */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-indigo-600 font-semibold uppercase">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-6">{product.description}</p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(product.rating!)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
            )}

            {/* Precio */}
            <div className="mb-8">
              <span className="text-5xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  En stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-red-600 font-semibold">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Agotado
                </span>
              )}
            </div>

            {/* Selector de cantidad */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl font-semibold">−</span>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center text-lg font-semibold border-x-2 border-gray-300 py-3 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl font-semibold">+</span>
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Agregar al Carrito
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock || buyLoading}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {buyLoading ? "Procesando..." : "Comprar Ahora"}
              </button>
            </div>

            {/* Garantías y envío */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Garantía</p>
                  <p className="text-xs text-gray-600">1 año</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Pago Seguro</p>
                  <p className="text-xs text-gray-600">Stripe</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Envío Gratis</p>
                  <p className="text-xs text-gray-600">En 24-48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de información */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "description"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Descripción
            </button>
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                    activeTab === "specifications"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Especificaciones
                </button>
              )}
            {product.features && product.features.length > 0 && (
              <button
                onClick={() => setActiveTab("features")}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === "features"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Características
              </button>
            )}
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specifications" && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-900">{key}</span>
                    <span className="text-gray-700">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "features" && product.features && (
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
