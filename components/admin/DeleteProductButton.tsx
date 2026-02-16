"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-600 hover:text-red-700 font-medium"
        disabled={isDeleting}
      >
        Eliminar
      </button>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ¿Eliminar producto?
            </h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres
              eliminar este producto?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
