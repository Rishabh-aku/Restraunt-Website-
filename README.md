# 🍽️ FanTaurant — Modern Restaurant Website & Table Booking System

Welcome to **FanTaurant**, a premium, full-stack restaurant website, menu explorer, and reservation management system. This repository contains both a modern **React SPA frontend** with a **Node.js Express backend**, as well as legacy **static HTML/CSS landing pages** for demonstration.

---

## 🌟 Key Features

*   **🔐 User Authentication:** Secure registration, login, and forgot-password flows with JWT-based session management.
*   **📅 Table Reservations:** Interactive booking form allowing users to select tables, date, time slot, and guest counts.
*   **🍕 Dynamic Menu & Categories:** View categorized dishes (Appetizers, Main Course, Drinks, Desserts) fetched dynamically from the database.
*   **🛒 Order Management:** Backend models and API endpoints ready for placing and tracking food orders.
*   **🎨 Responsive Premium Design:** Built with curated HSL color schemes, glassmorphism UI components, smooth scroll animations, and interactive hover effects.
*   **📁 Image Uploads:** Admin capability for uploading food items using `multer` on the backend.

---

## 📂 Project Structure

```text
Restraunt-Website/
├── fantaurant-react/     # Modern React + Vite + Tailwind CSS + TS Frontend
│   ├── src/
│   │   ├── components/   # Layout, UI, and Section-specific components
│   │   ├── pages/        # Home, Menu, Book, Auth Pages
│   │   ├── context/      # Authentication state providers
│   │   └── data/         # Mock data & navigation configurations
│   └── package.json
│
├── fantaurant-backend/   # Node.js + Express + Mongoose Backend API
│   ├── src/
│   │   ├── config/       # MongoDB Connection setup
│   │   ├── models/       # Mongoose Schemas (User, Menu, Booking, Order)
│   │   ├── routes/       # API Route Handlers
│   │   └── middlewares/  # Validation, Auth, and Error handling
│   ├── uploads/          # Static food and chef asset uploads
│   └── package.json
│
├── images/               # Root static asset images
├── *.html                # Static pages (index.html, home.html, menu.html, etc.)
└── styles.css            # Root vanilla CSS styles
```

---

## 🛠️ Technology Stack

### Frontend (React App)
*   **Core:** React 18, Vite (for ultra-fast development)
*   **Styling:** Tailwind CSS, PostCSS, Custom HSL Gradients
*   **Routing:** React Router Dom v7
*   **HTTP Client:** Axios

### Backend (REST API)
*   **Core:** Node.js, Express 5
*   **Database:** MongoDB via Mongoose ORM
*   **Security:** JSON Web Tokens (JWT), `bcryptjs` password hashing, `helmet` security headers
*   **Utilities:** `morgan` (logging), `multer` (multipart file uploads), `express-validator`

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Instance (Local or MongoDB Atlas)

---

### 1. Setting up the Backend API

1.  Navigate to the backend directory:
    ```bash
    cd fantaurant-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables:
    Create a `.env` file in `fantaurant-backend/` with the following variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/fantaurant
    JWT_SECRET=your_jwt_secret_key_here
    NODE_ENV=development
    ```
4.  *(Optional)* Seed the database with initial food menu items and admin accounts:
    ```bash
    node seeder.js
    ```
5.  Start the development server:
    ```bash
    npm run dev
    ```
    *The API will be live at `http://localhost:5000`.*

---

### 2. Setting up the React Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd ../fantaurant-react
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *Open `http://localhost:5173` in your browser to view the application.*

---

### 3. Static landing pages (Legacy/Alternative)
If you prefer to run the plain HTML/CSS pages without launching the server or database, you can simply open the root [index.html](file:///d:/Restraunt%20Website/index.html) file directly in your browser or run it using a VS Code Live Server extension.
