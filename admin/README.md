# JK BIOTECH — Admin Management Portal

A dedicated, standalone React administration dashboard built with **Vite, React 19, Tailwind CSS, Axios, and Lucide React** for managing products, categories, homepage hero slides, downloadable documents, contact inquiries, and corporate settings.

---

## 🚀 Getting Started

### 1. Installation
```bash
cd admin
npm install
```

### 2. Environment Configuration
Verify `admin/.env`:
```env
VITE_API_BASE_URL=/api
```
The Vite development server is configured to proxy all `/api` requests directly to `http://localhost:5000` (the Node.js backend).

### 3. Run Development Server
```bash
npm run dev
```
The Admin portal starts at **`http://localhost:5174`**.

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Authentication & Default Credentials

- **Login Route:** `http://localhost:5174/login`
- **Default Super Admin:** `admin@jkbiotech.in`
- **Password:** As configured in `backend/.env` (e.g. seeded via `npm run seed` in `backend/`)

---

## 📦 Modules & Capabilities

| Module | Route | Capabilities |
| :--- | :--- | :--- |
| **Dashboard** | `/dashboard` | Metrics overview, quick actions, recent inquiries & products preview |
| **Categories** | `/categories` | Dosage form management, slug generator, cover image upload, active toggling |
| **Products** | `/products` | Full catalog CRUD, composition, indications, packaging presentation, packshot upload |
| **Hero Banner** | `/hero-slides` | Multi-line homepage hero slides, badge styling, CTA routing, image upload |
| **Doc Categories** | `/document-categories` | Download classification (Certificates, Visual Aids, Price Lists) |
| **Documents** | `/documents` | Regulatory approvals & brochures upload (PDF, DOC, Images up to 10MB) |
| **Enquiries** | `/enquiries` | Real-time contact form inbox, status pipeline (New, Read, Replied, Closed), admin notes |
| **Company Info** | `/settings` | Contact numbers, official email, physical address, working hours, social links |
| **Profile** | `/profile` | Authenticated admin profile, role, session verification, and sign out |

---

## 🌐 Port Mapping

- **Public Frontend:** `http://localhost:5173`
- **Admin Portal:** `http://localhost:5174`
- **Backend API:** `http://localhost:5000`
