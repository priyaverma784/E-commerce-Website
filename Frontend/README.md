# 🛍️ MERN E-Commerce Website

A modern full-stack E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application provides a seamless online shopping experience with user authentication, product browsing, wishlist, shopping cart, and secure order management.


## 🚀 Features

### User Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Product Details Page
- Search Products
- Add to Cart
- Remove from Cart
- Wishlist Management
- User Profile
- Responsive Design

### Admin Features
- Add Products
- Edit Products
- Delete Products
- Manage Inventory
- Manage Users
- Manage Orders

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv

---

## 📁 Project Structure

```
Ecommerce/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation



Go into the project directory

```bash
cd ecommerce-mern
```

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Backend

```bash
cd server

npm start
```

or

```bash
npm run dev
```

---

## ▶️ Run the Frontend

```bash
cd client

npm run dev
```

---

## 🌐 Application URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5001
```


Example:

- Home Page
- Product Page
- Cart
- Wishlist
- Login
- Profile
- Admin Dashboard


## 🎯 Future Improvements

- Online Payment Gateway (Stripe/Razorpay)
- Order Tracking
- Product Reviews
- Product Ratings
- Email Notifications
- Admin Analytics Dashboard



