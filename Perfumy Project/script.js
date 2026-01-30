// ================================
// script.js – Perfumy (FIXED)
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            setTimeout(() => loadingScreen.remove(), 500);
        }
    }, 1500);

    initializeUserState();
    initializeProductInteractions();
    initializeAuthForms();
    initializeMobileMenu();
    initializeSmoothScrolling();
    updateCartCount();
    initializeCartPage();
    initializeSearch();
    initializeFilters();
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

    // Password toggle functionality
    const toggleButtons = document.querySelectorAll('#togglePassword');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const passwordInput = btn.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                btn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                btn.textContent = '👁️';
            }
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;

            if (!email || !password) {
                showNotification('Please enter email and password');
                return;
            }

            const user = {
                email,
                firstName: email.split('@')[0],
                loggedIn: true
            };

            localStorage.setItem('perfumy_user', JSON.stringify(user));
            showNotification('Login successful! Welcome back!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(signupForm);

            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            if (password !== confirmPassword) {
                showNotification('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                showNotification('Password must be at least 8 characters long');
                return;
            }

            const user = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                loggedIn: true
            };

            localStorage.setItem('perfumy_user', JSON.stringify(user));
            showNotification('Account created successfully! Welcome to Perfumy!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
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
        { id: 1, name: "Elegant Rose", price: 3999, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Rose & vanilla blend", category: "floral" },
        { id: 2, name: "Midnight Jasmine", price: 3499, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Jasmine & sandalwood", category: "floral" },
        { id: 3, name: "Citrus Breeze", price: 2999, image: "https://tse1.mm.bing.net/th/id/OIP.ZWzP-beK0QjTRbC7OwXvJAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Fresh citrus scent", category: "citrus" },
        { id: 4, name: "Ocean Mist", price: 4499, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Marine freshness", category: "citrus" },
        { id: 5, name: "Amber Nights", price: 4999, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Warm amber & spice", category: "oriental" },
        { id: 6, name: "Lavender Dreams", price: 2499, image: "https://images.unsplash.com/photo-1587304655801-beb15c4dfd25?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Lavender calm", category: "floral" },
        { id: 7, name: "Spicy Oud", price: 6499, image: "https://images.unsplash.com/photo-1696218092661-973ab1fed5b8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Rich oud wood with cardamom and cinnamon", category: "woody" },
        { id: 8, name: "Fresh Mint", price: 1999, image: "https://images.unsplash.com/photo-1458538977777-0549b2370168?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Cool mint leaves with green tea and citrus", category: "citrus" },
        { id: 9, name: "Vanilla Orchid", price: 3499, image: "https://tse2.mm.bing.net/th/id/OIP.APC1Bedupd0Uo97ZazalqgHaIf?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Sweet vanilla orchid with coconut and musk", category: "oriental" }
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

function showNotification(message, type = 'success') {
    const div = document.createElement('div');
    div.className = `notification ${type}`;
    div.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;

    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    document.body.appendChild(div);

    // Trigger animation
    setTimeout(() => div.classList.add('show'), 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 300);
    }, 3000);
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

// ================================
// CART PAGE
// ================================

function initializeCartPage() {
    // Only run on cart page
    if (window.location.pathname.includes('cart.html')) {
        if (!isUserLoggedIn()) {
            showNotification('Please login to access your cart');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
            return;
        }

        loadCartItems();
        initializeCartEventListeners();
    }
}

function initializeCartEventListeners() {
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('🚀 Checkout functionality coming soon! Stay tuned for amazing features!');
        });
    }
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('perfumy_cart') || '[]');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (!cartItems) return; // Not on cart page

    // Clear existing items
    cartItems.querySelectorAll('.cart-item').forEach(i => i.remove());

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" data-product-id="${item.id}" data-delta="-1">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" data-product-id="${item.id}" data-delta="1">+</button>
                </div>
            </div>
            <div class="cart-item-total">₹${(item.price * item.quantity).toLocaleString()}</div>
            <button class="remove-item" data-product-id="${item.id}">🗑️</button>
        `;
        cartItems.appendChild(div);
    });

    updateCartSummary(subtotal);

    // Add event listeners for quantity controls and remove buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const delta = parseInt(e.target.dataset.delta);
            changeCartQuantity(productId, delta);
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            removeFromCart(productId);
        });
    });
}

function changeCartQuantity(productId, delta) {
    const cart = JSON.parse(localStorage.getItem('perfumy_cart') || '[]');
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    localStorage.setItem('perfumy_cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification(`Updated ${item.name} quantity`);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('perfumy_cart') || '[]');
    const item = cart.find(i => i.id === productId);
    const itemName = item ? item.name : 'item';

    cart = cart.filter(i => i.id !== productId);
    localStorage.setItem('perfumy_cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification(`Removed ${itemName} from cart`);
}

function updateCartSummary(subtotal) {
    const shipping = subtotal > 500 ? 0 : 100;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `₹${shipping}`;
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
}

// ================================
// SEARCH FUNCTIONALITY
// ================================

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value.trim());
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value.trim());
            }
        });

        // Real-time search with debounce
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(searchInput.value.trim());
            }, 300);
        });
    }
}

function performSearch(query) {
    const productCards = document.querySelectorAll('.product-card');

    if (!query) {
        // Show all products if search is empty
        productCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
        return;
    }

    let visibleCount = 0;

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('p').textContent.toLowerCase();

        if (productName.includes(query.toLowerCase()) || productDesc.includes(query.toLowerCase())) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });

    // Show notification with search results
    if (visibleCount === 0) {
        showNotification(`No products found for "${query}"`, 'error');
    } else {
        showNotification(`Found ${visibleCount} product${visibleCount === 1 ? '' : 's'} for "${query}"`);
    }
}

// ================================
// PRODUCT FILTERING
// ================================

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            filterProducts(filter);
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const product = getProductById(productId);

        if (!product) return;

        if (category === 'all' || product.category === category) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });

    // Show notification
    const visibleCards = document.querySelectorAll('.product-card[style*="display: block"]');
    if (category !== 'all') {
        showNotification(`Showing ${visibleCards.length} ${category} fragrance${visibleCards.length === 1 ? '' : 's'}`);
    }
}
