// ================================
// script.js – Perfumy (FIXED)
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initializeUserState();
    initializeProductInteractions();
    initializeAuthForms();
    initializeMobileMenu();
    initializeSmoothScrolling();
    updateCartCount();
});

// ================================
// USER STATE
// ================================

function isUserLoggedIn() {
    const user = localStorage.getItem('perfumy_user');
    if (!user) return false;
    try {
        const parsed = JSON.parse(user);
        return parsed.loggedIn === true;
    } catch {
        return false;
    }
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('perfumy_user'));
}

function initializeUserState() {
    const authLinks = document.getElementById('authLinks');
    const userActions = document.getElementById('userActions');
    const username = document.getElementById('username');

    if (isUserLoggedIn()) {
        const user = getCurrentUser();
        if (authLinks) authLinks.style.display = 'none';
        if (userActions) userActions.style.display = 'flex';
        if (username) username.textContent = user.firstName || 'Account';
    } else {
        if (authLinks) authLinks.style.display = 'block';
        if (userActions) userActions.style.display = 'none';
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => logout();
    }
}

function logout() {
    localStorage.removeItem('perfumy_user');
    localStorage.removeItem('perfumy_cart');
    localStorage.removeItem('perfumy_favorites');
    window.location.href = 'index.html';
}

// ================================
// AUTH FORMS (LOGIN & SIGNUP)
// ================================

function initializeAuthForms() {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const contactForm = document.querySelector('.contact-form');

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;

            if (!email || !password) {
                alert('Enter email and password');
                return;
            }

            const user = {
                email,
                firstName: email.split('@')[0],
                loggedIn: true
            };

            localStorage.setItem('perfumy_user', JSON.stringify(user));
            window.location.href = 'index.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(signupForm);

            const user = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                loggedIn: true
            };

            localStorage.setItem('perfumy_user', JSON.stringify(user));
            window.location.href = 'index.html';
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            // In a real application, this would send the data to a server
            showNotification('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
}

// ================================
// PRODUCTS
// ================================

function getProductById(id) {
    const products = [
        { id: 1, name: "Elegant Rose", price: 3999, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Rose & vanilla blend" },
        { id: 2, name: "Midnight Jasmine", price: 3499, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Jasmine & sandalwood" },
        { id: 3, name: "Citrus Breeze", price: 2999, image: "https://tse1.mm.bing.net/th/id/OIP.ZWzP-beK0QjTRbC7OwXvJAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Fresh citrus scent" },
        { id: 4, name: "Ocean Mist", price: 4499, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Marine freshness" },
        { id: 5, name: "Amber Nights", price: 4999, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Warm amber & spice" },
        { id: 6, name: "Lavender Dreams", price: 2499, image: "https://images.unsplash.com/photo-1587304655801-beb15c4dfd25?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Lavender calm" },
        { id: 7, name: "Spicy Oud", price: 6499, image: "https://images.unsplash.com/photo-1696218092661-973ab1fed5b8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Rich oud wood with cardamom and cinnamon" },
        { id: 8, name: "Fresh Mint", price: 1999, image: "https://images.unsplash.com/photo-1458538977777-0549b2370168?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Cool mint leaves with green tea and citrus" },
        { id: 9, name: "Vanilla Orchid", price: 3499, image: "https://tse2.mm.bing.net/th/id/OIP.APC1Bedupd0Uo97ZazalqgHaIf?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Sweet vanilla orchid with coconut and musk" }
    ];
    return products.find(p => p.id === id);
}

// ================================
// CART
// ================================

function addToCartById(productId) {
    const product = getProductById(productId);
    if (product) addToCart(product);
}

function addToCart(product) {
    if (!isUserLoggedIn()) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('perfumy_cart') || '[]');
    const item = cart.find(i => i.id === product.id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('perfumy_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('perfumy_cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = count;
}

// ================================
// FAVORITES
// ================================

function initializeProductInteractions() {
    document.addEventListener('click', e => {
        if (e.target.closest('.add-to-cart')) {
            addToCartById(parseInt(e.target.closest('.add-to-cart').dataset.productId));
        }

        if (e.target.closest('.like-btn')) {
            toggleFavorite(parseInt(e.target.closest('.like-btn').dataset.productId), e.target.closest('.like-btn'));
        }
    });

    loadFavoritesState();
}

function toggleFavorite(productId, btn) {
    if (!isUserLoggedIn()) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('perfumy_favorites') || '[]');

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        btn.querySelector('.like-icon').textContent = '🤍';
    } else {
        favorites.push(productId);
        btn.querySelector('.like-icon').textContent = '❤️';
    }

    localStorage.setItem('perfumy_favorites', JSON.stringify(favorites));
}

function loadFavoritesState() {
    const favorites = JSON.parse(localStorage.getItem('perfumy_favorites') || '[]');
    document.querySelectorAll('.like-btn').forEach(btn => {
        const id = parseInt(btn.dataset.productId);
        if (favorites.includes(id)) {
            btn.querySelector('.like-icon').textContent = '❤️';
        }
    });
}

// ================================
// MOBILE MENU
// ================================

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

function showNotification(message) {
    const div = document.createElement('div');
    div.textContent = message;
    div.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
}

// ================================
// SMOOTH SCROLLING
// ================================

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
