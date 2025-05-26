# HomeCraft - Creating Home, Creating Memories

**HomeCraft** is a full-featured eCommerce web application inspired by IKEA, built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. It offers seamless browsing, wishlist management, cart operations, order checkout, and an admin dashboard.

---

## Features

### 1. User Functionality
- Browse products with categories and pagination
- View detailed product information
- Add to Cart, Add to Wishlist
- Checkout with order confirmation
- View past orders with order summary

### 2. Authentication
- User registration & login with JWT
- Role-based access control (User/Admin)

### 3. Admin Dashboard
- Manage Products: Add/Edit/Delete
- View & manage Orders
- View registered Users

---

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: Redux Toolkit, React Hook
- **Icons**: Lucide-react

---

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Harshvardhan2164/Spargen-Assignment.git
cd Spargen-Assignment
```

2. Install dependencies:

#### Backend

```bash
cd backend/
npm install express dotenv cors mongoose bcryptjs jsonwebtoken morgan helmet slugify
```

#### Frontend
```bash
cd frontend/
npm create vite@latest
npm install react react-router-dom axios jwt-decode jsonwebtoken dotenv bcryptjs tailwindcss lucide-react @tailwindcss/vite react-hot-toast react-google-recaptcha
```

3. Create .env files in the backend:
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

4. Start the Backend Server:
```bash
cd backend/
node server.js
```

5. Start the Frontend Server:
```bash
cd frontend/
npm run dev
```

## Future Enhancements
- More e-commerce related features
- Multi-language support
- Automated email notifications

## Contributing
1. Fork the repository
2. Create a new branch
3. Commit changes
4. Open a pull request

## License
This project is open-source and available under the MIT License.