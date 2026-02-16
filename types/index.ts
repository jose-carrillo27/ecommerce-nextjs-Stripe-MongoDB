export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Múltiples imágenes para el carrusel
  category: string;
  specifications?: {
    [key: string]: string;
  };
  features?: string[];
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Tipos de autenticación
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
   role?: string;
}

export interface Session {
  user?: User;
  expires: string;
}

declare module "next-auth" {
  interface Session {
    user?: User;
  }
  
  interface User {
    role?: string;
  }
}