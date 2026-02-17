"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductFormProps {
  product?: any;
  isEdit?: boolean;
}

export default function ProductForm({
  product,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    image: product?.image || "",
    images: product?.images?.join("\n") || "",
    inStock: product?.inStock ?? true,
    rating: product?.rating || "",
    reviews: product?.reviews || "",
    specifications: JSON.stringify(product?.specifications || {}, null, 2),
    features: product?.features?.join("\n") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Actualizar preview de imagen
      if (name === "image") {
        setImagePreview(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Procesar datos
      const processedData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
        images: formData.images.split("\n").filter((url: string) => url.trim()),
        inStock: formData.inStock,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        reviews: formData.reviews ? parseInt(formData.reviews) : null,
        specifications: formData.specifications
          ? JSON.parse(formData.specifications)
          : {},
        features: formData.features.split("\n").filter((f: string) => f.trim()),
      };

      const url = isEdit ? `/api/products/${product.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información básica */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Información Básica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="Ej: Laptop Gaming Pro"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="Descripción detallada del producto"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Precio ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="1299.99"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            >
              <option value="">Seleccionar categoría</option>
              <option value="Electronics">Electronics</option>
              <option value="Audio">Audio</option>
              <option value="Wearables">Wearables</option>
              <option value="Photography">Photography</option>
              <option value="Accessories">Accessories</option>
              <option value="Displays">Displays</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="4.8"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de Reseñas
            </label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="234"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Producto en Stock
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Imágenes</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL de Imagen Principal *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="https://images.unsplash.com/photo-..."
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                <div className="relative w-48 h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={() => setImagePreview("")}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URLs de Imágenes Adicionales (una por línea)
            </label>
            <textarea
              name="images"
              value={formData.images}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-sm"
              placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2...&#10;https://images.unsplash.com/photo-3..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Agrega una URL por línea. Estas se usarán en el carrusel de
              imágenes.
            </p>
          </div>
        </div>
      </div>

      {/* Especificaciones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Especificaciones Técnicas
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Especificaciones (JSON)
          </label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-sm"
            placeholder={`{
  "Procesador": "Intel Core i9",
  "RAM": "32GB DDR5",
  "GPU": "NVIDIA RTX 4070"
}`}
          />
          <p className="text-sm text-gray-500 mt-2">
            Formato JSON. Ejemplo: {`{"Procesador": "Intel i9", "RAM": "32GB"}`}
          </p>
        </div>
      </div>

      {/* Características */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Características Destacadas
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Características (una por línea)
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="Pantalla QHD de 240Hz&#10;Teclado RGB personalizable&#10;Sistema de refrigeración avanzado"
          />
          <p className="text-sm text-gray-500 mt-2">
            Agrega una característica por línea. Se mostrarán como viñetas.
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? "Guardando..."
            : isEdit
              ? "Actualizar Producto"
              : "Crear Producto"}
        </button>
      </div>
    </form>
  );
}
