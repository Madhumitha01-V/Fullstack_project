# Perfumy - Luxury Fragrance E-commerce Platform

A modern, responsive e-commerce website for luxury perfumes with complete authentication system and backend-ready architecture.

## Features

### 🏠 Homepage
- **Hero Section**: Eye-catching banner with luxury perfume showcase
- **Product Catalog**: 9 unique luxury perfumes with high-quality images
- **Pricing**: All prices converted to Indian Rupees (INR)
- **Responsive Design**: Mobile-first approach with smooth animations
- **About Section**: Company information and brand story
- **Contact Form**: Functional contact form with validation

### 🔐 Authentication System
- **Login Page**: Professional login form with email/password validation
- **Signup Page**: Comprehensive registration with multiple fields
- **Form Validation**: Real-time client-side validation with error messages
- **Social Login**: Google, Facebook, and Apple authentication buttons
- **Security Features**: Password strength requirements and confirmation
- **Visual Icons**: Complete icon system for all form elements

### 🎨 Design & UX
- **Modern UI**: Glassmorphism effects and gradient backgrounds
- **Icon Integration**: Emojis and icons throughout the interface
- **Smooth Animations**: CSS transitions and hover effects
- **Typography**: Google Fonts (Playfair Display + Roboto)
- **Color Scheme**: Luxury brown/gold theme (#8B4513, #A0522D)

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Unicode emojis for cross-platform compatibility
- **Fonts**: Google Fonts integration
- **Validation**: Client-side form validation
- **Backend Ready**: Structured for API integration

## File Structure

```
perfumy-project/
├── index.html          # Main homepage
├── login.html          # User login page
├── signup.html         # User registration page
├── style.css           # Complete styling (including auth pages)
├── script.js           # Interactive functionality
└── README.md           # Project documentation
```

## Backend Integration Guide

### API Endpoints

The authentication forms are structured for easy backend integration:

#### Login Endpoint
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "userpassword",
  "remember": true/false
}
```

#### Signup Endpoint
```javascript
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91xxxxxxxxxx",
  "password": "StrongPassword123",
  "confirmPassword": "StrongPassword123",
  "newsletter": true/false,
  "terms": true
}
```

### Form Data Structure

All forms include data validation attributes and are ready for backend processing:

- **Input Validation**: HTML5 validation + custom JavaScript validation
- **Error Handling**: Real-time field validation with visual feedback
- **Success Messages**: Form submission feedback
- **Loading States**: Button loading indicators during submission

### Social Authentication

Social login buttons are prepared for OAuth integration:

- **Google**: `/auth/google`
- **Facebook**: `/auth/facebook`
- **Apple**: `/auth/apple`

## Form Validation Rules

### Login Form
- Email: Valid email format required
- Password: Minimum 6 characters

### Signup Form
- First Name: Minimum 2 characters
- Last Name: Minimum 2 characters
- Email: Valid email format required
- Phone: Valid phone number format
- Password: Minimum 8 characters, must include uppercase, lowercase, and number
- Confirm Password: Must match password
- Terms: Must be accepted

## Running the Project

1. **Local Development**:
   ```bash
   cd perfumy-project
   python -m http.server 8000
   ```

2. **Access URLs**:
   - Homepage: `http://localhost:8000/index.html`
   - Login: `http://localhost:8000/login.html`
   - Signup: `http://localhost:8000/signup.html`

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Features

- **Lazy Loading**: Images load as needed
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Optimized CSS**: Minimal, efficient stylesheets
- **Mobile Optimized**: Responsive design for all screen sizes

## Security Considerations

- Client-side validation (supplement with server-side validation)
- Password strength requirements
- CSRF protection recommended for production
- HTTPS required for production deployment
- Secure cookie handling for authentication

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Product detail pages
- [ ] User dashboard
- [ ] Payment integration
- [ ] Order management
- [ ] Admin panel
- [ ] Product reviews and ratings

## Contributing

This project is ready for backend integration. The frontend is complete with:
- ✅ Responsive design
- ✅ Form validation
- ✅ Authentication UI
- ✅ Backend-ready structure
- ✅ Professional styling
- ✅ Icon integration

## License

This project is created for educational and portfolio purposes.