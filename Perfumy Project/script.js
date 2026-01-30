// ================================
// script.js – Perfumy (FIXED)
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initializeUserState();
    initializeProductInteractions();
    initializeAuthForms();
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
}

// ================================
// PRODUCTS
// ================================

function getProductById(id) {
    const products = [
        { id: 1, name: "Elegant Rose", price: 3999, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539", description: "Rose & vanilla blend" },
        { id: 2, name: "Midnight Jasmine", price: 3499, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de", description: "Jasmine & sandalwood" },
        { id: 3, name: "Citrus Breeze", price: 2999, image: "https://tse1.mm.bing.net/th/id/OIP.ZWzP-beK0QjTRbC7OwXvJAHaHa", description: "Fresh citrus scent" },
        { id: 4, name: "Ocean Mist", price: 4499, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f", description: "Marine freshness" },
        { id: 5, name: "Amber Nights", price: 4999, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108", description: "Warm amber & spice" },
        { id: 6, name: "Lavender Dreams", price: 2499, image: "https://images.unsplash.com/photo-1587304655801-beb15c4dfd25", description: "Lavender calm" }
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
// UI NOTIFICATION
// ================================

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
