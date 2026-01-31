// ================================
// script.js – Perfumy (Simplified & Beautiful)
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen with smooth animation
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);

    // Initialize core functionality
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollEffects();
});

// ================================
// MOBILE MENU
// ================================

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
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
// SCROLL EFFECTS
// ================================

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature, .about-text, .about-image').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Add loading class to body initially
document.body.classList.add('loading');

// Remove loading class after content loads
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .loading {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .product-card, .feature, .about-text, .about-image {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .header {
        transition: transform 0.3s ease;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .nav-menu.active {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// ================================
// FORM INITIALIZATION
// ================================

function initializeForms() {
    // Initialize authentication and form handlers
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }

    // Real-time form validation
    initializeFormValidation();

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }

    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
});   

// Social Login Functions
function socialLogin(provider) {
    // Show loading state
    showNotification(`Connecting to ${provider}...`, 'info');

    // Simulate social login process
    setTimeout(() => {
        const user = {
            firstName: 'Social',
            lastName: 'User',
            email: `user@${provider}.com`,
            provider: provider,
            loggedIn: true
        };

        localStorage.setItem('perfumy_user', JSON.stringify(user));
        showNotification(`Successfully logged in with ${provider}!`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 2000);
}

// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!strengthBar || !strengthText) return;

    let strength = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('Lowercase letter');

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('Uppercase letter');

    // Number check
    if (/\d/.test(password)) strength += 1;
    else feedback.push('Number');

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else feedback.push('Special character');

    // Update UI
    strengthBar.className = 'strength-fill';

    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Medium strength';
        strengthText.style.color = '#f39c12';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#27ae60';
    }
}

// Form Validation
function initializeFormValidation() {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const feedback = field.parentElement.querySelector('.input-feedback');

    if (!feedback) return;

    let isValid = true;
    let message = '';

    switch (field.id) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
        case 'firstName':
        case 'lastName':
            if (field.value.length < 2) {
                isValid = false;
                message = 'Must be at least 2 characters';
            }
            break;
        case 'phone':
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;
        case 'password':
            if (field.value.length < 8) {
                isValid = false;
                message = 'Password must be at least 8 characters';
            }
            break;
        case 'confirmPassword':
            const password = document.getElementById('password');
            if (field.value !== password.value) {
                isValid = false;
                message = 'Passwords do not match';
            }
            break;
    }

    if (!isValid) {
        feedback.textContent = message;
        feedback.classList.add('show');
        field.style.borderColor = '#e74c3c';
    } else {
        feedback.classList.remove('show');
        field.style.borderColor = '#27ae60';
    }

    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const feedback = field.parentElement.querySelector('.input-feedback');

    if (feedback) {
        feedback.classList.remove('show');
        field.style.borderColor = '#e1e5e9';
    }
}

// Enhanced Login Handler
function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const rememberMe = form.querySelector('#rememberMe')?.checked;
    const submitBtn = form.querySelector('#loginBtn');

    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');

    // Simulate login process
    setTimeout(() => {
        // Check if user exists in localStorage (for demo purposes)
        const existingUser = localStorage.getItem('perfumy_user');
        let user;

        if (existingUser) {
            user = JSON.parse(existingUser);
            if (user.email !== email) {
                // Create new user for demo
                user = {
                    email,
                    firstName: email.split('@')[0],
                    loggedIn: true
                };
            }
        } else {
            user = {
                email,
                firstName: email.split('@')[0],
                loggedIn: true
            };
        }

        if (rememberMe) {
            user.rememberMe = true;
        }

        localStorage.setItem('perfumy_user', JSON.stringify(user));

        // Show success animation
        const successAnimation = document.getElementById('successAnimation');
        if (successAnimation) {
            successAnimation.classList.add('show');
        }

        submitBtn.classList.remove('loading');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// Enhanced Signup Handler
function handleSignup(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('#signupBtn');

    // Validate all required fields
    const inputs = form.querySelectorAll('input[required]');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showNotification('Please correct the errors in the form', 'error');
        return;
    }

    const formData = new FormData(form);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Additional password confirmation check
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    // Check terms acceptance
    if (!formData.get('terms')) {
        showNotification('Please accept the Terms & Conditions', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');

    // Simulate signup process
    setTimeout(() => {
        const user = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            newsletter: formData.get('newsletter') ? true : false,
            loggedIn: true,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('perfumy_user', JSON.stringify(user));

        // Show success animation
        const successAnimation = document.getElementById('successAnimation');
        if (successAnimation) {
            successAnimation.classList.add('show');
        }

        submitBtn.classList.remove('loading');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2500);
}

// Forgot Password Handler
function handleForgotPassword(e) {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;

    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    // Simulate password reset process
    showNotification('Password reset link sent to your email!', 'success');
    closeModal();

    setTimeout(() => {
        showNotification('Check your email for password reset instructions', 'info');
    }, 1000);
}

// Modal Functions
function showForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function showTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

function acceptTerms() {
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.checked = true;
    }
    closeModal();
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Enhanced Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
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

// ================================
// AUTH PROMPT MODAL
// ================================

function showAuthPromptIfNeeded() {
    // Only show if user is not logged in and hasn't dismissed the prompt before
    if (!isUserLoggedIn() && !hasDismissedAuthPrompt()) {
        const modal = document.getElementById('authPromptModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
}

function closeAuthPrompt() {
    const modal = document.getElementById('authPromptModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        // Mark as dismissed for this session
        sessionStorage.setItem('authPromptDismissed', 'true');
    }
}

function continueAsGuest() {
    closeAuthPrompt();
    // Show a welcome message for guest users
    setTimeout(() => {
        showNotification('Welcome! You can browse our fragrances as a guest. Sign up to save favorites and make purchases!', 'info');
    }, 500);
}

function hasDismissedAuthPrompt() {
    return sessionStorage.getItem('authPromptDismissed') === 'true';
}

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('auth-prompt-overlay')) {
        closeAuthPrompt();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('authPromptModal');
        if (modal && modal.classList.contains('show')) {
            closeAuthPrompt();
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded – checking forms...");

    const loginForm  = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    console.log("loginForm exists? →", !!loginForm);
    console.log("signupForm exists? →", !!signupForm);

    if (loginForm) {
        console.log("Login form submit listener is attached");
    } else {
        console.error("× loginForm not found in HTML!");
    }

    if (signupForm) {
        console.log("Signup form submit listener is attached");
    } else {
        console.error("× signupForm not found in HTML!");
    }
});