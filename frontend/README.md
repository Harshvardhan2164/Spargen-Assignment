# Frontend - HomeCraft

This is the frontend React application for the HomeCraft using **Vite** and **TailwindCSS**.

---

## Features

### 1. Product Pages
- Product grid with dynamic pagination
- Product detail view
- Skeleton loading for UX

### 2. Cart & Wishlist
- Add to cart/wishlist
- View, delete, or move items
- Clear all functionality

### 3. Checkout Flow
- Shipping address form
- Payment method (dummy)
- Order summary & success page

### 4. Admin Panel
- Product CRUD
- View users
- Manage orders

## Setup Instructions

1. Install dependencies:
```bash
cd frontend/
npm create vite@latest
npm install react react-router-dom axios jwt-decode jsonwebtoken dotenv bcryptjs tailwindcss lucide-react @tailwindcss/vite react-hot-toast react-google-recaptcha
```

2. Configure the `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          dark: 'var(--color-primary-dark)',
          'dark-hover': 'var(--color-primary-dark-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

3. Configure the `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
})
```

4. Start the Frontend Server:
```bash
npm run dev
```

## Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- Virtualization: WSL with VS Code (Development Environment)

## License
This project is licensed under the MIT License.