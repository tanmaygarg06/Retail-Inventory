# System Access Credentials & Account Directory

This file documents the system user credentials for the **Retail Inventory & Enterprise Management System (RISM)**.

---

## 🔑 Primary Administrator Account (Evaluator / Reviewer Access)

Use these credentials to access the full **Admin Enterprise Command Center**:

| Field | Value |
| :--- | :--- |
| **Portal URL** | [http://localhost:5173/login](http://localhost:5173/login) |
| **Username** | `tanmay_garg06` |
| **Password** | `$Tanmay@06` |
| **Email** | `tanmaylkgarg@gmail.com` |
| **Role** | `ROLE_ADMIN` |
| **Access Level** | Full unrestricted access (Executive Dashboard, Catalog, Suppliers, Warehouses, Inventory, Orders, Procurement, Fulfillment, User Management, Reports) |

---

## 👥 Demo & Role-Based Test Accounts

All demo accounts use the standard password: `password`

| Username | Role | Default Password | Description |
| :--- | :--- | :--- | :--- |
| `admin` | `ROLE_ADMIN` | `password` | Backup System Administrator |
| `test_customer` | `ROLE_CUSTOMER` | `password` | Standard Customer account for e-commerce shopping and tracking orders |
| `Tanmay` | `ROLE_SUPPLIER` | `password` | Supplier / Vendor account for managing inventory shipments and purchase orders |
| `Ram` | `ROLE_USER` | `password` | General Operations Staff |
| `Rishi` | `ROLE_USER` | `password` | Warehouse Operator |

---

## 🛡️ Authentication Architecture Notes

- Passwords in the database are hashed with **BCrypt (10 rounds)**.
- Authentication tokens are **JSON Web Tokens (JWT)** signed via **HMAC-SHA256**.
- Sessions are valid for **30 days** for persistent evaluation and development convenience.
