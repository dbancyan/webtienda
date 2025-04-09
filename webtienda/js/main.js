/**
 * MAIN.JS - Funcionalidades globales de la tienda
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = () => {
        const menuBtn = document.createElement('button');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.classList.add('mobile-menu-btn');
        document.querySelector('.header-top').prepend(menuBtn);
        
        menuBtn.addEventListener('click', () => {
            document.querySelector('.main-nav').classList.toggle('active');
        });
    };

    // Search Functionality
    const initSearch = () => {
        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;
        
        searchBox.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchBox.querySelector('input').value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
    };

    // Initialize Modal
    const initModal = () => {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        if (!modalTriggers.length) return;
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
        
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    };

    // Initialize Components
    mobileMenuToggle();
    initSearch();
    initModal();
    
    console.log('Main JS loaded');
});