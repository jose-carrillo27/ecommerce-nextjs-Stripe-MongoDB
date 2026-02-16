"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const techWords = [
    "la Innovación",
    "la Tecnología",
    "la Calidad",
    "el Futuro",
    "la Experiencia",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % techWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      {/* Fondo animado con círculos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Contenido principal */}
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge animado */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fadeIn">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-sm font-semibold">
              Envío Gratis en todos los pedidos
            </span>
          </div>

          {/* Título principal con palabra animada */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Descubre{" "}
            <span className="inline-block">
              <span className="relative">
                <span className="absolute inset-0 bg-white/20 blur-xl"></span>
                <span className="relative bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent animate-fadeIn">
                  {techWords[currentWord]}
                </span>
              </span>
            </span>
            <br />
            en cada producto
          </h1>

          {/* Descripción */}
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
            Los mejores productos de tecnología al alcance de tus manos. Calidad
            premium, precios increíbles.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#productos"
              className="group bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                Explorar Productos
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>

            <Link
              href="/cart"
              className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Ver Carrito
                {totalItems > 0 && (
                  <span className="bg-yellow-400 text-indigo-900 px-2 py-0.5 rounded-full text-sm font-bold">
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">8+</div>
              <div className="text-white/80">Productos Premium</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">5★</div>
              <div className="text-white/80">Calificación</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24h</div>
              <div className="text-white/80">Envío Express</div>
            </div>
          </div>
        </div>
      </div>

      {/* Onda inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249, 250, 251)"
          />
        </svg>
      </div>
    </div>
  );
}
