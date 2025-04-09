/**
 * PRODUCTS.JS - Lógica del catálogo de productos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample Product Data (simularía una API real)
    const products = [
        {
            id: 1,
            name: "Ultraboost 22",
            category: "Running",
            price: 180.00,
            oldPrice: 220.00,
            image: "img/products/shoe1.jpg",
            colors: ["black", "white", "blue"],
            sizes: ["38", "39", "40", "41", "42"],
            rating: 4.5,
            isNew: true
        },
        {
            id: 2,
            name: "NMD R1",
            category: "Lifestyle",
            price: 140.00,
            image: "img/products/shoe2.jpg",
            colors: ["black", "white"],
            sizes: ["39", "40", "41", "42", "43"],
            rating: 4.0
        },
        // Más productos...
    ];

    // Render Products
    const renderProducts = (productsToRender) => {
        const grid = document.querySelector('.products-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badge = '';
            if (product.isNew) badge = '<div class="badge badge-primary">Nuevo</div>';
            if (product.oldPrice) badge = '<div class="badge badge-sale">Oferta</div>';
            
            let oldPrice = '';
            if (product.oldPrice) {
                oldPrice = `<span class="original-price">$${product.oldPrice.toFixed(2)}</span>`;
            }
            
            productCard.innerHTML = `
                ${badge}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${oldPrice}
                    </div>
                    <button class="btn-add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                </div>
            `;
            
            grid.appendChild(productCard);
        });
        
        // Add event listeners to new buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    };

    // Filter Products
    const filterProducts = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const search = urlParams.get('search');
        
        let filteredProducts = [...products];
        
        if (category) {
            filteredProducts = filteredProducts.filter(p => 
                p.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.category.toLowerCase().includes(searchTerm)
            );
        }
        
        renderProducts(filteredProducts);
        
        // Update UI for active filter
        if (category) {
            document.querySelectorAll('.main-nav a').forEach(link => {
                if (link.textContent.toLowerCase() === category.toLowerCase()) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Add to Cart Function
    const addToCart = (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (!product) return;
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'alert alert-success';
        confirmation.innerHTML = `
            <i class="fas fa-check-circle alert-icon"></i>
            ${product.name} añadido al carrito
        `;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    };

    // Initialize
    filterProducts();
    updateCartCount();
    
    console.log('Products JS loaded');
});

// Función global para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}