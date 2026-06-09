# FUTURE_FS_03
# FUTURE_FS_03 - Grocery Shopping Web Application

## Project Overview

FUTURE_FS_03 is a full-stack grocery shopping web application developed using Node.js, Express.js, SQLite, HTML, CSS, and JavaScript. The application allows users to browse grocery products, add items to a shopping cart, place orders, and submit feedback through a simple and responsive user interface.

The project is deployed on Render and accessible through a live web URL.

---

## Features

### User Features

* User login and registration
* Browse grocery products
* Search products by name
* Filter products by category
* Add products to cart
* Update product quantities
* Remove products from cart
* Place orders through WhatsApp integration
* Submit feedback

### Product Categories

* Fruits
* Vegetables
* Pulses
* Grains
* Essentials

### Admin Features

* Admin login
* View orders
* View customer feedback
* Add new products
* Update product prices
* Update product availability
* Delete products

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Deployment

* GitHub
* Render

---

## Project Structure

```text
FUTURE_FS_03
│
├── public
│   ├── images
│   ├── css
│   ├── js
│   ├── index.html
│   ├── login.html
│   └── other frontend files
│
├── database.db
├── server.js
├── package.json
└── README.md
```

---

## Installation and Setup

### Clone Repository

```bash
git clone <https://github.com/AfrinShehnas/FUTURE_FS_03>
cd FUTURE_FS_03
```

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
node server.js
```

### Open Application

```text
http://localhost:3000
```

---

## Database Tables

### Users

Stores user details.

| Field | Type    |
| ----- | ------- |
| id    | INTEGER |
| name  | TEXT    |
| phone | TEXT    |

### Products

Stores product information.

| Field     | Type    |
| --------- | ------- |
| id        | INTEGER |
| name      | TEXT    |
| price     | INTEGER |
| image     | TEXT    |
| category  | TEXT    |
| available | INTEGER |

### Orders

Stores customer orders.

| Field         | Type    |
| ------------- | ------- |
| id            | INTEGER |
| customer_name | TEXT    |
| phone         | TEXT    |
| items         | TEXT    |
| total         | INTEGER |
| date          | TEXT    |

### Feedback

Stores customer feedback.

| Field   | Type    |
| ------- | ------- |
| id      | INTEGER |
| name    | TEXT    |
| phone   | TEXT    |
| message | TEXT    |
| date    | TEXT    |

---

## API Endpoints

### User

| Method | Endpoint |
| ------ | -------- |
| POST   | /login   |

### Products

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /products       |
| POST   | /add-product    |
| POST   | /update-product |
| POST   | /delete-product |

### Orders

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /place-order |
| GET    | /orders      |

### Feedback

| Method | Endpoint   |
| ------ | ---------- |
| POST   | /feedback  |
| GET    | /feedbacks |

### Admin

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /admin-login |

---

## Live Demo

Render Deployment:

https://future-fs-03-9f92.onrender.com

---

## Future Enhancements

* Secure authentication system
* Password encryption
* Online payment gateway integration
* Order tracking system
* Product image upload feature
* Customer order history
* Inventory management dashboard
* Cloud database integration

---

## Conclusion

FUTURE_FS_03 demonstrates the development of a complete full-stack grocery shopping web application using modern web technologies. The project provides product management, cart functionality, order processing, feedback collection, and deployment capabilities, making it a practical learning project for web development and software engineering concepts.
