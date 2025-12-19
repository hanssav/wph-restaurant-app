<div align="center">

# 🍽️ Restaurant App

### A Modern Feature-Rich Food Ordering Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/v5)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots)

</div>

---

## 📖 Overview

Restaurant App is a comprehensive food ordering platform designed to provide a seamless dining experience. Users can explore various restaurants, browse menus, manage their cart, and place orders with ease. Built with the latest web technologies, it ensures high performance, accessibility, and a stunning user interface.

## ✨ Features

### 🔐 Authentication & Security

- **Secure Login & Registration** - Robust authentication system for users.
- **Protected Routes** - Ensures secure access to user-specific pages.

### 🍽️ Restaurant & Menu Discovery

- **Restaurant Listing** - Browse a wide variety of restaurants with advanced filtering.
- **Menu Details** - Detailed views of food items with descriptions and prices.
- **Category Browsing** - Easy navigation through different food categories.
- **Search Functionality** - Quickly find restaurants or specific dishes.

### 🛒 Cart & Checkout

- **Dynamic Cart Management** - Add, remove, or update items in real-time.
- **Streamlined Checkout** - A smooth, multi-step checkout process.
- **Order Summary** - Clear breakdown of costs before confirmation.
- **Checkout Success** - Visual confirmation upon successful order placement.

### 👤 User Profile & Orders

- **Profile Management** - Update personal information and avatar.
- **Order History** - View past orders and their status ("My Order").
- **Review System** - Leave reviews and ratings for restaurants and menu items.

### 🎨 UI/UX Excellence

- **Responsive Design** - Fully optimized for mobile, tablet, and desktop.
- **Optimistic UI** - Instant feedback interactions (e.g., adding to cart).
- **Interactive Elements** - Smooth carousels, modals, and dropdowns.
- **Toast Notifications** - Real-time feedback for user actions.

## 🛠 Tech Stack

### Frontend Framework

<div align="left">

| Technology                                                                                               | Description                    | Version |
| :------------------------------------------------------------------------------------------------------- | :----------------------------- | :------ |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)          | React framework with SSR & SSG | 16.0.8  |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)                | UI library                     | 19.2.1  |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | Type-safe JavaScript           | 5.0     |

</div>

### Styling & UI

<div align="left">

| Technology                                                                                                    | Description                    | Version |
| :------------------------------------------------------------------------------------------------------------ | :----------------------------- | :------ |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-first CSS framework    | 4.0     |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat&logo=radix-ui&logoColor=white)            | Unstyled accessible components | Latest  |
| ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat&logo=lucide&logoColor=white)                  | Beautiful icon library         | 0.556.0 |
| ![Embla Carousel](https://img.shields.io/badge/Embla_Carousel-000000?style=flat&logo=npm&logoColor=white)     | Lightweight carousel library   | 8.6.0   |

</div>

### State Management & Data Fetching

<div align="left">

| Technology                                                                                                  | Description             | Version |
| :---------------------------------------------------------------------------------------------------------- | :---------------------- | :------ |
| ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)   | Global state management | 2.11.1  |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=react-query&logoColor=white) | Server state management | 5.90.12 |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)                   | HTTP client             | 1.13.2  |

</div>

### Form Handling & Validation

<div align="left">

| Technology                                                                                                            | Description       | Version |
| :-------------------------------------------------------------------------------------------------------------------- | :---------------- | :------ |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white) | Form management   | 7.68.0  |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)                                   | Schema validation | 4.1.13  |

</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hanssav/wph-restaurant-app
   cd wph-restaurant-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and configure your API endpoints:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📸 Screenshots

### Authentication

<div align="center">
  <img src="public/readme/login.png" alt="Login Page" width="45%">
  <img src="public/readme/register.png" alt="Register Page" width="45%">
</div>

### Home Page

<div align="center">
  <img src="public/readme/home-page.png" alt="Home Page" width="70%">
</div>

### Restaurant Listing & Filters

<div align="center">
  <img src="public/readme/all-restaurant.png" alt="All Restaurants" width="45%">
  <img src="public/readme/all-restaurant-filter.png" alt="Filter Restaurants" width="45%">
</div>

### Restaurant Details

<div align="center">
  <img src="public/readme/restaurant-detail.png" alt="Restaurant Detail" width="45%">
  <img src="public/readme/restaurant-detail-add-cart.png" alt="Add to Cart" width="45%">
</div>

### Cart & Checkout

<div align="center">
  <img src="public/readme/cart-page.png" alt="Cart Page" width="45%">
  <img src="public/readme/checkout-page.png" alt="Checkout Page" width="45%">
</div>

### Checkout Success

<div align="center">
  <img src="public/readme/checkout-success.png" alt="Checkout Success" width="45%">
</div>

### My Orders & Reviews

<div align="center">
  <img src="public/readme/my-order.png" alt="My Orders" width="45%">
  <img src="public/readme/give-review.png" alt="Give Review" width="45%">
</div>

### User Profile

<div align="center">
  <img src="public/readme/my-profile.png" alt="My Profile" width="70%">
</div>

### Optimistic UI & Interactions

<div align="center">
  <img src="public/readme/optimistic-ui.gif" alt="Optimistic UI Demo" width="70%">
  <p><em>Seamless interactions with optimistic UI updates</em></p>
</div>

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app directory (App Router)
│   ├── (users)/            # User-facing routes (Home, Restaurant, Profile)
│   ├── auth/               # Authentication routes (Login, Register)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── container/          # Container/Layout components
│   ├── pages/              # Page-specific components
│   └── ui/                 # Reusable UI components (buttons, inputs, etc.)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries and schema definitions
├── services/               # API service layers
├── store/                  # Redux store configuration
├── types/                  # TypeScript type definitions
└── constants/              # Application constants
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Handi Irawan**

---

<div align="center">
  <p>Built with ❤️ using Next.js and React</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
