# Retail Inventory Management System

A comprehensive, modular monolithic web application for managing retail inventory, warehouses, procurement, and orders.

## Overview

This system is designed as an Agile/Scrum capstone project. It uses a modern tech stack (React + Spring Boot + PostgreSQL) and encompasses 12 major business modules:

1. Authentication
2. Dashboard
3. Product Catalog
4. Warehouses
5. Inventory (Core)
6. Suppliers
7. Procurement
8. Orders
9. Fulfillment
10. Reports
11. Notifications
12. Administration

## Tech Stack
*   **Frontend**: React, TypeScript, Tailwind CSS, Axios, React Router, Recharts
*   **Backend**: Java 17+, Spring Boot 3, Spring Security (JWT), Spring Data JPA, Hibernate, Maven
*   **Database**: PostgreSQL
*   **DevOps**: Docker, Jenkins, AWS

## Getting Started (Local Development)

### Prerequisites
*   Java 17+
*   Node.js 18+
*   Docker & Docker Compose
*   Maven

### 1. Start the Database
The project includes a `docker-compose.yml` to easily start PostgreSQL locally.
```bash
docker-compose up -d postgres
```

### 2. Backend Setup
Navigate to the `backend` directory and run the Spring Boot application:
```bash
cd backend
mvn spring-boot:run
```
*(Make sure `application.yml` is configured to connect to `localhost:5432`)*

### 3. Frontend Setup
Navigate to the `frontend` directory and start the React development server:
```bash
cd frontend
npm install
npm run dev
```

## Documentation
Please refer to `PROJECT_FOUNDATION.md` for the complete architectural blueprint, ER designs, and development strategy phases.
