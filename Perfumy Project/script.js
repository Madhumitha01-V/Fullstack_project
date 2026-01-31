// =============================================
// Perfumy – Cleaned & Fixed – January 2026
// =============================================

let currentUser = null;

// ─── Utility ────────────────────────────────────────
function getCurrentUser() {
    try {
        const data = localStorage.getItem('perfumy_user');
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

function isUserLoggedIn() {
    return !!getCurrentUser()?.loggedIn;
}

function showNotification(message, type = 'success') {
    // Remove previous notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const div = document.createElement('div');
    div.className = `notification ${type}`;
    div.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(div);

    // Auto-remove
    setTimeout(() => {
        div.classList.add('fade-out');
        setTimeout(() => div.remove(), 400);
    }, 4000);

    // Close on click
    div.querySelector('.notification-close').onclick = () => {
        div.classList.add('fade-out');
        setTimeout(() => div.remove(), 400);
    };
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error:   'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info:    'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

// ─── Mobile Menu ────────────────────────────────────
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', e => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ─── Smooth Scrolling ───────────────────────────────
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ─── Scroll Effects (hide header on scroll down) ────
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > lastScroll && current > 120) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = current <= 0 ? 0 : current;
    });
}

// ─── Cart count badge ───────────────────────────────
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('perfumy_cart') || '[]');
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'inline-flex' : 'none';
    }
}

// ─── User interface state (login/logout) ────────────
function updateUserInterfaceBasedOnLoginState() {
    currentUser = getCurrentUser();
    const isLoggedIn = isUserLoggedIn();

    const authContainer = document.querySelector('.auth-buttons');
    const userActions   = document.querySelector('.user-actions, #userActions');

    if (isLoggedIn) {
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="account.html" class="auth-btn">Hi, ${currentUser.firstName || 'User'}</a>
                <button class="auth-btn" id="logoutBtn">Logout</button>
            `;
            document.getElementById('logoutBtn')?.addEventListener('click', () => {
                localStorage.removeItem('perfumy_user');
                localStorage.removeItem('perfumy_cart'); // optional
                window.location.href = 'index.html';
            });
        }
    } else {
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="login.html" class="auth-btn">Login</a>
                <a href="signup.html" class="auth-btn signup">Sign Up</a>
            `;
        }
    }

    if (userActions) {
        userActions.style.display = isLoggedIn ? 'flex' : 'none';
    }

    updateCartCount();
}

// ─── Main initialization ────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    console.log("Perfumy initialized — 2026 version");

    // 1. Remove loading screen
    setTimeout(() => {
        const loading = document.getElementById('loadingScreen');
        if (loading) loading.style.display = 'none';
    }, 1200);

    // 2. Initialize features
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollEffects();

    // 3. Cart & product interactions (if on relevant pages)
    updateCartCount();

    // 4. Auth / UI state
    updateUserInterfaceBasedOnLoginState();

    // 5. Page-specific init
    if (window.location.pathname.includes('cart.html')) {
        if (!isUserLoggedIn()) {
            showNotification('Please login to view your cart', 'warning');
            setTimeout(() => window.location.href = 'login.html', 1800);
        } else {
            // call your loadCartItems() here
            loadCartItems?.();        // safe call if function exists
        }
    }

    if (window.location.pathname.includes('account.html')) {
        // initializeAccountPage?.();   // implement when needed
    }
});

// Make some functions available globally if needed by inline onclick
window.showNotification = showNotification;