'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar que el Link se active
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.inStock === false && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Agotado
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{product.category}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating!)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews})
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
