Adidas Store – E-commerce Frontend

Este proyecto representa una tienda en línea de Adidas con enfoque minimalista, deportivo y premium. Se ha diseñado pensando en la experiencia del usuario, la escalabilidad y el rendimiento web.

Estructura del Proyecto:

/adidas-store/ │ ├── index.html - Página principal
├── products.html - Catálogo de productos
├── cart.html - Carrito de compras
│ ├── /css/ │ ├── styles.css - Estilos principales
│ └── components.css - Estilos de componentes reutilizables
│ ├── /js/ │ ├── main.js - Funcionalidad general
│ ├── products.js - Lógica de productos
│ └── cart.js - Manejo del carrito
│ └── /img/ - Assets visuales
├── logo.png - Logo Adidas
├── hero-bg.jpg - Imagen principal (Hero)
├── /products/ - Imágenes de productos
└── /icons/ - Iconos SVG

Identidad Visual:

Paleta de colores: blanco y negro como base, rojo como acento (badges, contador del carrito)

Tipografía: Inter, moderna y legible

Estructura de Navegación:

Header sticky con búsqueda y acceso rápido a cuenta/carrito

Menú principal categorizado por tipo de producto

Diseño responsive, adaptado a móviles (mobile-first)

Secciones Clave:

Hero Banner: imagen impactante con llamada a la acción (CTA)

Categorías destacadas: grid visual con imágenes de fondo

Nuevos lanzamientos: tarjetas de producto con información esencial

Brand Story: sección emotiva con fondo negro

Newsletter: captación de leads

Footer: múltiples columnas de navegación y enlaces a redes sociales

Técnicas Avanzadas Implementadas:

CSS:

Variables CSS para consistencia

Sistema de grid para layouts complejos

Transiciones suaves en efectos hover

Efectos de zoom en imágenes

Sombras para profundidad

Flexbox para alineación precisa

UX:

Jerarquía visual clara

Contraste adecuado en todos los elementos

Espaciado consistente (sistema de 8px)

Microinteracciones como feedback visual

CTAs prominentes

Diseño mobile-first

Flujo de Usuario Optimizado:

Descubrimiento: Hero banner + categorías destacadas

Exploración: grid de productos con filtros visuales

Decisión: información clara de precios y descuentos

Conversión: botones de CTA siempre visibles

Retención: formulario de newsletter + redes sociales

Consideraciones de Rendimiento:

Imágenes optimizadas (formatos modernos como WebP, lazy loading)

CSS crítico cargado en el head

JavaScript no bloqueante (defer)

Fuentes web precargadas

Assets estáticos servidos desde CDN

Escalabilidad:

Estructura de componentes reutilizables

CSS modular y organizado

JavaScript dividido por funcionalidades

Sistema de diseño consistente y mantenible
