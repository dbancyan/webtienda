/**
 * CART.JS - Lógica del carrito de compras
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    // Load Cart from LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Render Cart Items
    const renderCart = () => {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="products.html" class="btn-primary">Ver productos</a>
                </div>
            `;
            cartTotal.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-remove" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <p class="item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', updateQuantity);
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
        
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    };

    // Update Item Quantity
    const updateQuantity = (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (!item) return;
        
        if (e.target.classList.contains('minus')) {
            if (item.quantity > 1) item.quantity -= 1;
        } else if (e.target.classList.contains('plus')) {
            item.quantity += 1;
        } else if (e.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) item.quantity = newQuantity;
        }
        
        saveCart();
        renderCart();
        updateCartCount();
    };

    // Remove Item
    const removeItem = (e) => {
        const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        
        saveCart();
        renderCart();
        updateCartCount();
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'alert alert-info';
        confirmation.innerHTML = `
            <i class="fas fa-info-circle alert-icon"></i>
            Producto eliminado del carrito
        `;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    };

    // Save Cart to LocalStorage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Checkout Process
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            // Simulate checkout process
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2 class="modal-title">Confirmar Pedido</h2>
                    <p>Total: ${cartTotal.textContent}</p>
                    <form id="checkout-form">
                        <div class="form-group">
                            <input type="email" placeholder="Email" required>
                        </div>
                        <button type="submit" class="btn-primary">Pagar</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = 'auto';
            });
            
            modal.querySelector('#checkout-form').addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulate payment processing
                modal.querySelector('button').disabled = true;
                modal.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                
                setTimeout(() => {
                    // Clear cart after successful "payment"
                    localStorage.removeItem('cart');
                    modal.remove();
                    document.body.style.overflow = 'auto';
                    
                    // Show success message
                    const confirmation = document.createElement('div');
                    confirmation.className = 'alert alert-success';
                    confirmation.innerHTML = `
                        <i class="fas fa-check-circle alert-icon"></i>
                        ¡Pedido completado! Recibirás un email de confirmación.
                    `;
                    document.body.appendChild(confirmation);
                    
                    setTimeout(() => {
                        confirmation.remove();
                        window.location.href = 'index.html';
                    }, 3000);
                }, 2000);
            });
        });
    }

    // Initialize
    renderCart();
    updateCartCount();
    
    console.log('Cart JS loaded');
});