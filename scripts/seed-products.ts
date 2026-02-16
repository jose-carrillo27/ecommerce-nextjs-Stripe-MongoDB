import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Laptop Gaming Pro',
    description: 'Laptop de alto rendimiento con RTX 4070 y procesador Intel i9',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
    ],
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
    reviews: 234,
    specifications: {
      'Procesador': 'Intel Core i9-13900H',
      'RAM': '32GB DDR5',
      'Almacenamiento': '1TB NVMe SSD',
      'GPU': 'NVIDIA RTX 4070 8GB',
      'Pantalla': '15.6" QHD 240Hz',
      'Batería': '90Wh',
      'Peso': '2.3 kg',
    },
    features: [
      'Pantalla QHD de 240Hz para gaming fluido',
      'Teclado RGB personalizable',
      'Sistema de refrigeración avanzado',
      'WiFi 6E y Thunderbolt 4',
      'Audio certificado por THX',
    ],
  },
  {
    name: 'Auriculares Bluetooth',
    description: 'Auriculares inalámbricos con cancelación de ruido activa',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
    ],
    category: 'Audio',
    inStock: true,
    rating: 4.6,
    reviews: 189,
    specifications: {
      'Conectividad': 'Bluetooth 5.3',
      'Batería': 'Hasta 30 horas',
      'Cancelación de ruido': 'ANC Adaptativa',
      'Drivers': '40mm',
      'Peso': '250g',
      'Carga rápida': '10 min = 5 horas',
    },
    features: [
      'Cancelación de ruido adaptativa',
      'Modo transparencia',
      'Audio espacial con seguimiento de cabeza',
      'Controles táctiles intuitivos',
      'Estuche de carga incluido',
    ],
  },
  {
    name: 'Smartwatch Elite',
    description: 'Reloj inteligente con monitoreo de salud y GPS',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800',
    ],
    category: 'Wearables',
    inStock: true,
    rating: 4.7,
    reviews: 312,
    specifications: {
      'Pantalla': 'AMOLED 1.4"',
      'Batería': 'Hasta 7 días',
      'Resistencia': '5ATM',
      'GPS': 'Dual frecuencia',
      'Sensores': 'Frecuencia cardíaca, SpO2, ECG',
      'Compatibilidad': 'iOS y Android',
    },
    features: [
      'Monitoreo continuo de salud 24/7',
      'Más de 100 modos deportivos',
      'GPS preciso de doble frecuencia',
      'Llamadas Bluetooth',
      'Pagos sin contacto',
    ],
  },
  {
    name: 'Cámara Mirrorless 4K',
    description: 'Cámara profesional con grabación 4K y estabilización',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
      'https://images.unsplash.com/photo-1606933248010-ef2d2e6f4e06?w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
    ],
    category: 'Photography',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    specifications: {
      'Sensor': 'Full Frame 24.2MP',
      'Video': '4K 60fps',
      'ISO': '100-51200',
      'Estabilización': '5 ejes IBIS',
      'Pantalla': 'Táctil 3.2" abatible',
      'Enfoque': '693 puntos AF',
    },
    features: [
      'Sensor Full Frame retroiluminado',
      'Estabilización de imagen en 5 ejes',
      'Video 4K sin recorte',
      'Enfoque automático en tiempo real',
      'Doble ranura de tarjetas SD',
    ],
  },
  {
    name: 'Teclado Mecánico RGB',
    description: 'Teclado gaming con switches mecánicos y iluminación RGB',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    ],
    category: 'Accessories',
    inStock: true,
    rating: 4.5,
    reviews: 423,
    specifications: {
      'Switches': 'Mecánicos Red/Blue/Brown',
      'Iluminación': 'RGB por tecla',
      'Conectividad': 'USB-C desmontable',
      'Anti-ghosting': 'NKRO',
      'Material': 'Aluminio',
      'Layout': 'TKL (87 teclas)',
    },
    features: [
      'Switches mecánicos de alta calidad',
      'Iluminación RGB personalizable',
      'Diseño compacto TKL',
      'Reposamuñecas magnético',
      'Software de personalización',
    ],
  },
  {
    name: 'Mouse Gaming Inalámbrico',
    description: 'Mouse ergonómico con sensor de alta precisión',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800',
      'https://images.unsplash.com/photo-1586850979599-7b0a0a60c99b?w=800',
    ],
    category: 'Accessories',
    inStock: true,
    rating: 4.6,
    reviews: 267,
    specifications: {
      'Sensor': 'Óptico 25,600 DPI',
      'Conectividad': 'Wireless 2.4GHz + Bluetooth',
      'Batería': 'Hasta 70 horas',
      'Peso': '80g',
      'Botones': '8 programables',
      'Polling rate': '1000Hz',
    },
    features: [
      'Sensor de alta precisión',
      'Doble conectividad inalámbrica',
      'Diseño ergonómico',
      'Switches de 80 millones de clics',
      'Peso ajustable',
    ],
  },
  {
    name: 'Monitor 4K 32"',
    description: 'Monitor profesional con panel IPS y HDR10',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800',
    ],
    category: 'Displays',
    inStock: true,
    rating: 4.8,
    reviews: 198,
    specifications: {
      'Tamaño': '32 pulgadas',
      'Resolución': '3840 x 2160 (4K UHD)',
      'Panel': 'IPS',
      'Tasa de refresco': '60Hz',
      'HDR': 'HDR10',
      'Cobertura de color': '99% sRGB, 95% DCI-P3',
      'Puertos': 'HDMI 2.0, DisplayPort 1.4, USB-C',
    },
    features: [
      'Panel IPS con precisión de color',
      'Soporte HDR10',
      'USB-C con 65W Power Delivery',
      'Modo de cuidado ocular',
      'Ajuste de altura y pivote',
    ],
  },
  {
    name: 'Tablet Pro 12.9"',
    description: 'Tablet premium con lápiz óptico y teclado incluido',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      'https://images.unsplash.com/photo-1585789575347-32d86b58e8a8?w=800',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
    ],
    category: 'Mobile',
    inStock: true,
    rating: 4.7,
    reviews: 289,
    specifications: {
      'Pantalla': '12.9" OLED 120Hz',
      'Procesador': 'Chip de 8 núcleos',
      'RAM': '8GB',
      'Almacenamiento': '256GB',
      'Cámaras': '12MP + 10MP ultra wide',
      'Batería': 'Hasta 10 horas',
      'Conectividad': 'WiFi 6E, 5G opcional',
    },
    features: [
      'Pantalla OLED ProMotion 120Hz',
      'Lápiz óptico de segunda generación incluido',
      'Teclado magnético con trackpad',
      'Cámaras profesionales con LiDAR',
      'Altavoces estéreo de 4 parlantes',
    ],
  },
];

async function main() {
  console.log('🌱 Iniciando seed de productos...');

  // Limpiar productos existentes
  await prisma.product.deleteMany();
  console.log('🗑️  Productos existentes eliminados');

  // Crear productos
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`✅ Producto creado: ${product.name}`);
  }

  console.log('🎉 Seed completado! Total de productos: ' + products.length);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });