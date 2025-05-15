
# Datox Packaging & Supplies Ecommerce Site Documentation

## Table of Contents

- [Overview](#overview)
- [Live Website URL](#Website-URL)
- [Features](#features)
- [Project Structure](#project-structure)
- [File Descriptions](#file-descriptions)
- [How It Works](#how-it-works)
- [Customization Guide](#customization-guide)
- [Styling and Responsiveness](#styling-and-responsiveness)
- [JavaScript Functionality](#javascript-functionality)
- [Extending the Project](#extending-the-project)
- [Troubleshooting](#troubleshooting)
- [Credits & License](#credits--license)

---

## Overview

This project is a modern, responsive ecommerce website for Datox Packaging & Supplies. It allows users to browse eco-friendly packaging products, manage a shopping cart, and complete a checkout process—all in a seamless, interactive, and visually appealing interface.

---

## Live Website URL

https://ceddyxan.github.io/PLP-WEBDEV-WK8-FINALPROJECT/

---

## Features

- **Product Catalog:** Browse products with images, descriptions, and prices.
- **Live Search:** Filter products instantly as you type.
- **Shopping Cart:** Add, remove, and update product quantities; cart persists in localStorage.
- **Order Summary:** See subtotal, toggle 16% VAT, and view total.
- **Checkout:** Enter shipping and payment details, see a live summary, and print a receipt.
- **User Authentication:** Sign up, log in, log out, and manage your profile.
- **Responsive Design:** Mobile-friendly layout and navigation.
- **Dark Mode:** Toggle for comfortable viewing.
- **Contact & About Pages:** Company info and contact form.

---

## Project Structure

```
/
├── about.html
├── cart.html
├── checkout.html
├── contact.html
├── index.html
├── login.html
├── products.html
├── profile.html
├── script.js
├── signup.html
├── styles.css
├── images/
│   └── ... (logo and product images)
└── README.md
```

---

## File Descriptions

- **index.html**: Homepage with featured products and navigation.
- **products.html**: Full product catalog with search and add-to-cart.
- **cart.html**: Shopping cart grid, summary, and VAT toggle.
- **checkout.html**: Shipping/payment form, order summary, and receipt printing.
- **about.html**: Company background and mission.
- **contact.html**: Contact form and company details.
- **login.html / signup.html**: User authentication forms.
- **profile.html**: User profile management.
- **styles.css**: All site-wide and responsive styles.
- **script.js**: Handles product rendering, cart logic, checkout, authentication, and interactivity.
- **images/**: Contains logo and product images.

---

## How It Works

### Navigation

- The navigation bar is centered and responsive, with logo and links.
- The cart count updates live as items are added/removed.

### Product Catalog

- Products are defined in `script.js` and rendered dynamically.
- Users can search/filter products in real time.

### Shopping Cart

- Cart items are displayed in a responsive grid.
- Users can update quantities or remove items.
- Subtotal, VAT (with toggle), and total are calculated live.
- Cart contents are saved in `localStorage` for persistence.

### Checkout

- Users fill in shipping and payment details.
- Live order summary is shown, including VAT and total.
- On successful submission, a printable receipt is generated and the cart is cleared.

### User Authentication

- Users can sign up, log in, and log out.
- Profile information is managed in `profile.html`.

---

## Customization Guide

### Adding/Editing Products

- Open `script.js`.
- Edit the `products` array to add, remove, or modify products.
- Each product should have: `id`, `name`, `description`, `price`, `image`.

### Changing Branding

- Replace logo and product images in the `images/` folder.
- Update company name and text in HTML files as needed.

### Adjusting VAT

- The VAT rate is set to 16% by default.
- To change, update the VAT calculation in `script.js` (look for `let vat = subtotal * 0.16;`).

### Styling

- Modify `styles.css` for colors, fonts, spacing, and layout.
- The `.logo` class controls logo alignment and size.
- Media queries ensure mobile responsiveness.

---

## Styling and Responsiveness

- Uses CSS Flexbox and Grid for layout.
- Navigation and cart adapt to smaller screens.
- Font sizes and paddings adjust for mobile devices.
- Dark mode is toggled via a button and CSS class.

---

## JavaScript Functionality

- **Product Rendering:** Dynamically creates product cards from the `products` array.
- **Cart Management:** Handles add, remove, update, and persistence via `localStorage`.
- **Order Summary:** Calculates subtotal, VAT, and total; updates live with cart changes and VAT toggle.
- **Checkout Validation:** Validates all fields, shows inline errors, and prevents submission if invalid.
- **Receipt Printing:** On successful checkout, opens a new window with a formatted receipt and triggers print.
- **User Auth:** Manages login, signup, and profile display (basic, for demonstration).
- **Dark Mode:** Toggles a class on the body for dark/light theme.

---

## Extending the Project

- **Backend Integration:** Connect to a real backend for user accounts, orders, and inventory.
- **Payment Gateway:** Integrate with Stripe, PayPal, or other payment APIs.
- **Order History:** Add a page for users to view past orders.
- **Admin Panel:** Manage products and orders from a secure admin interface.
- **Email Notifications:** Send order confirmations and updates via email.

---

## Troubleshooting

- **Cart Not Updating:** Ensure `localStorage` is enabled in your browser.
- **Images Not Showing:** Check file paths in the `images/` folder and product objects.
- **Styles Not Applying:** Make sure `styles.css` is linked in all HTML files.
- **JavaScript Errors:** Open the browser console (F12) to view and debug errors.

---

## Credits & License

- **Developed by:** Cedrick @Ceddy
- **Images:** Company property or used with permission.
- **License:** For educational and demonstration purposes. Contact the author for commercial use.

---

Thank you for using and exploring the Datox Packaging & Supplies Ecommerce Site!