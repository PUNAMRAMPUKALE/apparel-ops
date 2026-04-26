# Velocity Ops – Apparel Operations Dashboard

Velocity Ops is a React + TypeScript + Redux Toolkit web application built for managing apparel sourcing and production operations.

It helps teams manage:

* Purchase Orders
* Suppliers
* Reports & Revenue
* Role Based Access
* Shipment Status Tracking
* Dashboard KPIs

---

## Tech Stack

* React
* TypeScript
* Vite
* Redux Toolkit
* React Router DOM
* Tailwind CSS

---

## Project Structure

src/
├── app/
│   ├── router.tsx
│   └── store.ts

├── data/
│   ├── users.json
│   ├── orders.json
│   ├── suppliers.json
│   ├── brands.json
│   ├── shipments.json
│   └── orderItems.json

├── features/
│   ├── auth/
│   ├── orders/
│   ├── suppliers/
│   ├── brands/
│   ├── shipments/
│   └── orderItems/

├── layouts/
│   └── MainLayout.tsx

├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── OrdersPage.tsx
│   ├── SuppliersPage.tsx
│   ├── ReportsPage.tsx
│   └── SettingsPage.tsx

├── index.css
└── main.tsx

---

## Main Pages

### 1. Login Page

File: src/pages/LoginPage.tsx

Used for logging in with demo users.

Credentials:

Admin
[admin@apparel.com](mailto:admin@apparel.com) / 1234

Staff
[staff@apparel.com](mailto:staff@apparel.com) / 1234

Viewer
[viewer@apparel.com](mailto:viewer@apparel.com) / 1234

---

### 2. Dashboard

File: src/pages/DashboardPage.tsx

Shows:

* Total Orders
* Suppliers
* Revenue
* Profit
* Pending Orders
* Shipped Orders
* Delayed Orders
* Recent Orders table

---

### 3. Orders Page

File: src/pages/OrdersPage.tsx

Features:

* Search orders
* Filter by status
* Filter by priority
* Pagination
* Update order status (Admin + Staff)
* View only for Viewer

Columns:

* PO Number
* Brand
* Supplier
* Status
* Priority
* Created Date
* Ship Date
* Delivery Date
* Currency

---

### 4. Suppliers Page

File: src/pages/SuppliersPage.tsx

Shows supplier list with:

* Name
* Country
* MOQ
* Lead Time
* Rating

---

### 5. Reports Page

File: src/pages/ReportsPage.tsx

Shows:

* Revenue Summary
* Profit Margin
* Orders by Month Chart
* Order Status Pie Chart

---

### 6. Settings Page

File: src/pages/SettingsPage.tsx

Used for admin profile/system info.

---

## Role Based Access

### Admin

Full Access:

* Dashboard
* Orders
* Suppliers
* Reports
* Settings
* Update Status

### Staff

Access:

* Orders only
* Can update status

### Viewer

Access:

* Orders only
* Read only

---

## Routing

File: src/app/router.tsx

Rules:

* Admin lands on Dashboard
* Staff lands on Orders
* Viewer lands on Orders
* Unauthorized routes redirect automatically

---

## Redux Store

File: src/app/store.ts

Connected slices:

* auth
* orders
* suppliers
* brands
* shipments
* orderItems

---

## Authentication

File: src/features/auth/authSlice.ts

Uses users.json

Login stores session in localStorage -> user

Logout clears localStorage.

---

## Data Files

### users.json

Stores users login data.

### orders.json

Main purchase orders data.

### suppliers.json

Supplier master data.

### brands.json

Brand master data.

### shipments.json

Ship dates / delivery dates.

### orderItems.json

Products + qty + costs per order.

---

## Run Project

npm install
npm run dev

Open:
http://localhost:5173

---

## Build Project

npm run build

---

## Deploy

Recommended:

* Vercel
* Netlify

---

## UI Theme

Luxury Ops Theme:

* Dark Sidebar
* Orange Highlights
* White Cards
* Premium Dashboard Layout

---

## Future Improvements

* Real API Backend
* Export Excel/PDF
* Notifications
* Dark Mode
* Multi Warehouse
* Vendor Portal
* Production Calendar

---

## Support

If page data missing:

1. Check JSON files in src/data
2. Restart Vite
3. Clear localStorage
4. Re-login

---

## Final Notes

This project is suitable for:

* Apparel Buying Houses
* Merchandising Teams
* Operations Teams
* Supply Chain Tracking
* Demo Portfolio Projects
