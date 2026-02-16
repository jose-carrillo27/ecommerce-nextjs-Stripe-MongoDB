'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckIcon } from '@/components/Icons';
import { useCartStore } from '@/store/cartStore';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (sessionId) {
      // Limpiar el carrito
      clearCart();

      // Verificar la sesión de pago
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No se encontró información del pago
          </h2>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon />
            <span className="text-green-600 text-3xl">✓</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pago Exitoso!
          </h1>

          <p className="text-gray-600 mb-8">
            Gracias por tu compra. Recibirás un correo de confirmación pronto.
          </p>

          {session.customerEmail && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Email:</strong> {session.customerEmail}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total pagado:</strong> $
                {(session.amountTotal / 100).toFixed(2)}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
            >
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
