
# Tl-Alrabaa Backend API

This is the backend API for the **Tl-Alrabaa** e-commerce system built with Laravel. The API provides functionality for user authentication, product management, and shopping cart features.

---

## Base URL

```
http://yourdomain.com/api
```

---

## Authentication

Authentication is handled via JWT. After login, include the token in requests as:

```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 🧑‍💼 Auth

| Method | Endpoint        | Description              | Auth Required |
|--------|------------------|--------------------------|----------------|
| POST   | `/register`      | Register a new user      | ❌             |
| POST   | `/login`         | Login a user             | ❌             |
| POST   | `/logout`        | Logout the user          | ✅             |
| POST   | `/refresh`       | Refresh JWT token        | ✅             |
| GET    | `/profile`       | Get current user profile | ✅             |

---

### 📦 Products

| Method | Endpoint               | Description               | Auth | Role  |
|--------|------------------------|---------------------------|------|-------|
| GET    | `/products`            | Get all products          | ❌   | —     |
| GET    | `/products/{id}`       | Get product by ID         | ❌   | —     |
| POST   | `/products`            | Create a new product      | ✅   | Admin |
| PUT    | `/products/{product}`  | Update a product          | ✅   | Admin |
| DELETE | `/products/{id}`       | Delete a product          | ✅   | Admin |

---

### 🛒 Cart (requires login)

| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| GET    | `/cart`                     | Get user's cart                   |
| POST   | `/cart/add`                 | Add item to cart                  |
| DELETE | `/cart/remove/{productId}`  | Remove item from cart             |
| DELETE | `/cart/clear`              | Clear entire cart                 |
| PATCH  | `/cart/decrease/{productId}`| Decrease quantity of item         |

---

## Environment Setup

1. Copy `.env.example` to `.env` and set your variables.
2. Run:

```bash
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

---

## Testing

```bash
php artisan test
```

---

## License

MIT © Tl-Alrabaa Team
