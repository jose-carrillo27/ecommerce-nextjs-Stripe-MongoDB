'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { TrashIcon } from '@/components/Icons';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);

    try {
      // Crear sesión de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        alert(`Error: ${error}`);
        setLoading(false);
        return;
      }

      // Redirigir a Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        alert(`Error: ${stripeError.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega algunos productos para comenzar
          </p>
          <Link
            href="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 inline-block"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b last:border-b-0"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Proceder al Pago'}
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
