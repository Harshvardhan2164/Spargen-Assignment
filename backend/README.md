# Backend - HomeCraft

This is the backend API built with **Node.js + Express + MongoDB** for the HomeCraft.

---

## Features

- JWT-based authentication (login, register)
- Product CRUD (Admin only)
- Cart and Wishlist management
- Order placement & summary
- User roles (User/Admin)


## API Routes

1. Auth Routes:
- User Login: `POST /api/auth/login`
- User Register: `POST /api/auth/register`
- Forgot Password: `POST /api/auth/forgot-password`

2. Product Routes:
- Get All Products (with infinite scrolling): `GET /api/product/`
- Get Product by Slug: `GET /api/product/:slug`
- Add New Product (Admin Only): `POST /api/product/add`
- Update Product (Admin Only): `PUT /api/product/update/:slug`
- Delete Product (Admin Only): `DELETE /api/product/delete/:slug`

3. Cart Routes:
- Get Cart Items: `GET /api/cart/`
- Add Item to Cart: `POST /api/cart/add`
- Update Item Quantity: `PUT /api/cart/update/:productId`
- Remove Item from Cart: `DELETE /api/cart/remove/:productId`
- Clear Cart: `DELETE /api/cart/clear`
- Checkout: `POST /api/cart/checkout`

4. Wishlist Routes:
- Get Wishlist Items: `GET /api/wishlist/`
- Add Item to Wishlist: `POST /api/wishlist/add`
- Move Item to Cart: `POST /api/wishlist/move`
- Remove Item from Wishlist: `DELETE /api/wishlist/delete/:productId`

5. Order Routes:
- Get All Orders (Admin Only): `GET /api/order/`
- Get User Orders: `GET /api/order/user`
- Update Order Status (Admin Only): `PUT /api/order/update/:id`

6. User Routes:
- Get All Users (Admin Only): `GET /api/user/`
- Update User (Admin Only): `PUT /api/user/update/:id`
- Delete User (Admin Only): `DELETE /api/user/delete/:id`

## Setup Instructions

1. Install dependencies:
```bash
cd backend/
npm install express dotenv cors mongoose bcryptjs jsonwebtoken morgan helmet slugify
```

2. Create .env files in the backend:
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

3. Start the Backend Server:
```bash
cd backend/
node server.js
```

## Tech Stack
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- dotenv, bcrypt, cors

## Utilities
- authMiddleware.js – protect routes with role-based auth

## License
This project is licensed under the MIT License.