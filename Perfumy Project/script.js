// script.js - JavaScript for Perfumy website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simple form validation
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        if (name && email && message) {
            // In a real application, you'd send this data to a server
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Add to cart functionality (for demonstration)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h3').textContent;
            alert(`${productName} added to cart!`);
            // In a real application, you'd update a cart state
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe about section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(30px)';
        aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutContent);
    }

    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });

    // Image lazy loading (for better performance)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Authentication Form Handling
    initializeAuthForms();
});

// Authentication Functions
function initializeAuthForms() {
    // Password toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });

    // Login form validation and submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm(this)) {
                submitAuthForm(this, 'login');
            }
        });
    }

    // Signup form validation and submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSignupForm(this)) {
                submitAuthForm(this, 'signup');
            }
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'google' :
                           this.classList.contains('facebook-btn') ? 'facebook' : 'apple';
            handleSocialLogin(provider);
        });
    });

    // Real-time validation
    const inputs = document.querySelectorAll('.auth-form input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateLoginForm(form) {
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    let isValid = true;

    // Email validation
    if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError(email);
    }

    // Password validation
    if (password.value.length < 6) {
        showFieldError(password, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        clearFieldError(password);
    }

    return isValid;
}

function validateSignupForm(form) {
    const firstName = form.querySelector('input[name="firstName"]');
    const lastName = form.querySelector('input[name="lastName"]');
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');
    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirmPassword"]');
    const terms = form.querySelector('input[name="terms"]');
    let isValid = true;

    // First name validation
    if (firstName && firstName.value.trim().length < 2) {
        showFieldError(firstName, 'First name must be at least 2 characters');
        isValid = false;
    } else if (firstName) {
        clearFieldError(firstName);
    }

    // Last name validation
    if (lastName && lastName.value.trim().length < 2) {
        showFieldError(lastName, 'Last name must be at least 2 characters');
        isValid = false;
    } else if (lastName) {
        clearFieldError(lastName);
    }

    // Email validation
    if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError(email);
    }

    // Phone validation
    if (phone && !isValidPhone(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    } else if (phone) {
        clearFieldError(phone);
    }

    // Password validation
    if (password.value.length < 8) {
        showFieldError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else if (!isStrongPassword(password.value)) {
        showFieldError(password, 'Password must contain uppercase, lowercase, and number');
        isValid = false;
    } else {
        clearFieldError(password);
    }

    // Confirm password validation
    if (confirmPassword && confirmPassword.value !== password.value) {
        showFieldError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else if (confirmPassword) {
        clearFieldError(confirmPassword);
    }

    // Terms validation
    if (terms && !terms.checked) {
        showFieldError(terms, 'You must accept the terms and conditions');
        isValid = false;
    } else if (terms) {
        clearFieldError(terms);
    }

    return isValid;
}

function validateField(field) {
    const value = field.value;
    const name = field.name;

    switch (name) {
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            } else {
                clearFieldError(field);
            }
            break;
        case 'password':
            if (value.length < 6) {
                showFieldError(field, 'Password must be at least 6 characters');
            } else {
                clearFieldError(field);
            }
            break;
        case 'firstName':
        case 'lastName':
            if (value.trim().length < 2) {
                showFieldError(field, `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`);
            } else {
                clearFieldError(field);
            }
            break;
        case 'phone':
            if (!isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
            } else {
                clearFieldError(field);
            }
            break;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#dc3545';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        display: block;
    `;
    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#e1e5e9';
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

async function submitAuthForm(form, type) {
    const submitBtn = form.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Add form type
        data.type = type;

        // Simulate API call (replace with actual backend endpoint)
        const response = await simulateAuthAPI(data);

        if (response.success) {
            showMessage(form, 'success', response.message);
            if (type === 'login') {
                // Redirect to dashboard or home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        } else {
            showMessage(form, 'error', response.message);
        }
    } catch (error) {
        showMessage(form, 'error', 'An error occurred. Please try again.');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

async function simulateAuthAPI(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (data.type === 'login') {
        if (data.email === 'demo@example.com' && data.password === 'password123') {
            return { success: true, message: 'Login successful!' };
        } else {
            return { success: false, message: 'Invalid email or password.' };
        }
    } else {
        // Signup validation
        if (data.password !== data.confirmPassword) {
            return { success: false, message: 'Passwords do not match.' };
        }
        return { success: true, message: 'Account created successfully!' };
    }
}

function handleSocialLogin(provider) {
    // In a real application, redirect to OAuth provider
    alert(`Redirecting to ${provider} login...`);
    // Example: window.location.href = `/auth/${provider}`;
}

function showMessage(form, type, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    // Insert after the submit button
    const submitBtn = form.querySelector('.auth-btn');
    submitBtn.parentElement.insertBefore(messageDiv, submitBtn.nextSibling);

    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}