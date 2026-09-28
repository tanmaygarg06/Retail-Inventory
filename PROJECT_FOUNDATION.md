# Retail Inventory Management System - Project Foundation

## 1. Final Project Folder Structure

The project will follow a Modular Monolithic architecture with a clear separation between frontend, backend, and infrastructure configurations.

```text
HCL Project/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page-level components (Dashboard, Products, etc.)
│   │   ├── services/         # API integration (Axios)
│   │   ├── store/            # State management (Context/Redux)
│   │   ├── types/            # TypeScript interfaces
│   │   ├── utils/            # Helper functions
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hcl/inventory/
│   │   │   │   ├── config/       # Security, Swagger, CORS
│   │   │   │   ├── controller/   # REST APIs
│   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   ├── entity/       # JPA Entities
│   │   │   │   ├── exception/    # Global exception handler
│   │   │   │   ├── mapper/       # Entity to DTO mappers
│   │   │   │   ├── repository/   # Spring Data JPA Repositories
│   │   │   │   ├── security/     # JWT filters, UserDetails
│   │   │   │   └── service/      # Business logic
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── db/migration/ # Flyway/Liquibase scripts (optional)
│   │   └── test/                 # Unit and integration tests
│   └── pom.xml
├── infra/                    # Infrastructure & DevOps configurations
│   ├── docker/
│   ├── jenkins/
│   └── k8s/
├── database/                 # Database schema and seed data
│   ├── schema.sql
│   └── seed.sql
├── docker-compose.yml        # Local development environment
├── README.md                 # Project instructions
└── .gitignore
```

## 2. Final Database ER Design & 3. Entity Relationship Explanation

### Core Entities & Relationships

1. **User & Roles (Authentication & Admin)**
   - `users`: Stores user credentials.
   - `roles`: Defines roles (ADMIN, INVENTORY_MANAGER, etc.).
   - `user_roles`: Many-to-many mapping between users and roles.
2. **Catalog**
   - `categories`: Product categories.
   - `products`: Product details. *Relationship:* A Product belongs to one Category (N:1).
3. **Warehouse & Inventory**
   - `warehouses`: Physical locations storing products.
   - `inventory`: The junction tracking stock. *Relationship:* Links Product and Warehouse (N:1 to Product, N:1 to Warehouse). Unique constraint on (product_id, warehouse_id).
   - `inventory_transactions`: Audit log of all stock movements. *Relationship:* Belongs to Inventory/Product+Warehouse.
   - `stock_transfers`: Records transfers between two warehouses.
4. **Procurement**
   - `suppliers`: Vendors who supply products.
   - `purchase_orders`: Orders placed to suppliers. *Relationship:* Belongs to Supplier.
   - `purchase_order_items`: Items in a PO. *Relationship:* Belongs to PO and Product.
5. **Sales & Fulfillment**
   - `customers`: Purchasers of goods.
   - `orders`: Customer orders. *Relationship:* Belongs to Customer and Warehouse (where it will be fulfilled).
   - `order_items`: Items in an order. *Relationship:* Belongs to Order and Product.
   - `shipments`: Tracking fulfillment of an order.
6. **System**
   - `notifications`: System alerts.
   - `audit_logs`: User activity tracking.

## 4. Backend Architecture

- **Framework**: Java 17+, Spring Boot 3.x
- **Architecture Style**: Layered Modular Monolith (Controller -> Service -> Repository -> Database)
- **Data Access**: Spring Data JPA / Hibernate
- **Security**: Spring Security with JWT (Stateless authentication)
- **API Documentation**: OpenAPI / Swagger (springdoc-openapi)
- **Validation**: Jakarta Bean Validation (@Valid, @NotNull, etc.)
- **Error Handling**: `@ControllerAdvice` for centralized, consistent JSON error responses.

## 5. Frontend Architecture

- **Framework**: React 18+ with TypeScript
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS for utility-first, consistent styling
- **HTTP Client**: Axios with interceptors to inject JWT tokens and handle 401 Unauthorized globally.
- **State Management**: React Context for global state (Auth, UI preferences) and local component state for forms/tables.
- **Components**: Functional components using hooks. Reusable UI elements (Buttons, Modals, DataTables).

## 6. API Architecture

RESTful principles apply. Endpoints will return standardized responses:
**Success Payload**:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```
**Error Payload**:
```json
{
  "success": false,
  "message": "Insufficient stock",
  "errorCode": "ERR_INVENTORY_01",
  "timestamp": "2026-09-28T12:00:00Z"
}
```

## 7. Authentication Architecture

1. **Login**: Client sends POST `/api/auth/login` with username/password.
2. **Verification**: Spring Security verifies credentials against hashed DB password (BCrypt).
3. **Token Generation**: Backend generates a JWT containing user ID, username, and roles (expiration: e.g., 24h).
4. **Token Storage**: Client stores JWT in `localStorage` or `sessionStorage`.
5. **API Calls**: Client sends JWT in the `Authorization: Bearer <token>` header.
6. **Authorization**: Spring Security filter intercepts requests, validates the token signature, and populates `SecurityContext`. Methods are secured via `@PreAuthorize("hasRole('ADMIN')")`.

## 8. Development Phases (15 Sprints)

*   **Sprint 1**: Requirements, Architecture, ER Diagram, Jira/Git Setup, Project Initialization.
*   **Sprint 2**: Authentication & Authorization (Login, JWT, Roles).
*   **Sprint 3**: Product Catalog (Categories, Products CRUD).
*   **Sprint 4**: Warehouses (Warehouse CRUD).
*   **Sprint 5**: Basic Inventory (Stock overview, db relationships).
*   **Sprint 6**: Inventory Transactions & Adjustments (Stock In/Out).
*   **Sprint 7**: Multi-Warehouse Transfers.
*   **Sprint 8**: Orders (Order creation, inventory validation).
*   **Sprint 9**: Fulfillment (Order status updates, inventory reduction).
*   **Sprint 10**: Suppliers (Supplier CRUD).
*   **Sprint 11**: Procurement (Purchase Orders, Receiving goods).
*   **Sprint 12**: Reports & Dashboard enhancements.
*   **Sprint 13**: Notifications & Audit Logs.
*   **Sprint 14**: DevOps (Dockerization, Jenkins CI/CD setup).
*   **Sprint 15**: Testing (E2E, Integration), Bug Fixing, AWS Deployment.

## 9. Initial Database Schema

*(Refer to the `database/schema.sql` file that will be generated for the full DDL)*
- Uses `BIGSERIAL` for primary keys.
- Constraints like `CHECK (available_quantity >= 0)` at the DB level to guarantee data integrity.
- Auditing fields: `created_at`, `updated_at`.

## 10. Local Development Setup & 12. Docker Development Setup

Local development will utilize `docker-compose` to spin up infrastructure dependencies quickly.
- `docker-compose up -d postgres` will start the PostgreSQL database.
- Backend can be run via IDE or Maven (`mvn spring-boot:run`).
- Frontend can be run via npm (`npm run dev`).
- Later, full environment can be started via `docker-compose up --build`.

## 11. Git Structure

- `main`: Production-ready code.
- `develop`: Integration branch for features.
- `feature/*`: Branch for individual sprints/tasks (e.g., `feature/auth`, `feature/inventory-adjust`).
- Pull Requests mandatory for merging `feature` to `develop`.

## 13. Initial README

*(A separate README.md will be provided for the repository root)*
