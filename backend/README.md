# J K BIOTECH - Production Backend Documentation

Production-ready Express.js & MongoDB backend for **J K BIOTECH** pharmaceutical company website.

---

## 🚀 Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing & Role-Based Access Control (`superadmin`, `admin`)
- **File & Media Storage**: Multer (Memory Storage) + Cloudinary API
- **Security & Middleware**: CORS, Custom Validation, Centralized Error Handling

---

## 📁 Directory Architecture

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # Mongoose database connection & DNS resolution
│   │   ├── env.js            # Environment variable validation & central config
│   │   └── cloudinary.js     # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js             # Auth (Login, Profile)
│   │   ├── categoryController.js         # Product Categories
│   │   ├── productController.js          # Product Catalog
│   │   ├── heroSlideController.js        # Homepage Hero Banners
│   │   ├── documentCategoryController.js # PDF Document Categories
│   │   ├── documentController.js         # Documents & Literature
│   │   ├── enquiryController.js          # Contact Form Submissions
│   │   └── companyController.js          # Company Settings
│   ├── middleware/
│   │   ├── authMiddleware.js # Protect routes & role authorization
│   │   ├── errorHandler.js   # Centralized error handler
│   │   ├── notFound.js       # 404 handler
│   │   ├── upload.js         # Multer file upload (Images & PDFs)
│   │   └── validation.js     # Input validators (Enquiries, Phone, Email, Auth)
│   ├── models/
│   │   ├── Admin.js          # Admin user schema & bcrypt methods
│   │   ├── Category.js       # Product category schema
│   │   ├── Product.js        # Product schema (Category reference)
│   │   ├── HeroSlide.js      # Hero slide schema
│   │   ├── DocumentCategory.js# Document category schema
│   │   ├── Document.js       # Document literature schema
│   │   ├── Enquiry.js        # Customer contact enquiry schema
│   │   └── CompanySetting.js # Dynamic company info schema
│   ├── routes/
│   │   ├── index.js          # Main API router mounting point
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── heroSlideRoutes.js
│   │   ├── documentCategoryRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── enquiryRoutes.js
│   │   └── companyRoutes.js
│   ├── services/             # Business logic layer
│   └── scripts/
│       └── seed.js           # Database initial seed script
├── .env                      # Environment secrets (Git-ignored)
├── .env.example              # Environment variables template
├── package.json
└── server.js                 # App entry point
```

---

## ⚙️ Environment Configuration (`.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://<user>:<password>@jk-biotech-cluster.6nwjmcz.mongodb.net/?appName=jk-biotech-cluster

JWT_SECRET=jk_biotech_super_secret_jwt_key_2026_prod
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@jkbiotech.in
ADMIN_PASSWORD=Admin@JKBiotech2026

CLOUDINARY_CLOUD_NAME=n1zkak4u
CLOUDINARY_API_KEY=125545659478242
CLOUDINARY_API_SECRET=un2ihAIIMLg7Fgm_srCFseH5T2Y
```

---

## 🛠️ Installation & Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Seed Initial Database Content**:
   ```bash
   npm run seed
   ```
   *Populates initial Super Admin, 11 Categories, 21 Products, Hero Slides, Document Categories, and Company Settings from frontend source data.*

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🔑 REST API Reference

### 1. Authentication (`/api/auth`)
- `POST /api/auth/login` (Public) - Login admin user & get JWT token.
- `GET /api/auth/me` (Protected) - Get current authenticated admin profile.

### 2. Product Categories (`/api/categories`)
- `GET /api/categories` (Public) - List active categories.
- `GET /api/categories/slug/:slug` (Public) - Get category by slug.
- `POST /api/categories` (Admin) - Create category (supports `image` upload).
- `PUT /api/categories/:id` (Admin) - Update category.
- `DELETE /api/categories/:id` (Admin) - Delete category & Cloudinary image.

### 3. Products (`/api/products`)
- `GET /api/products` (Public) - List active products with populated category info.
- `GET /api/products/slug/:slug` (Public) - Get product by slug.
- `GET /api/products/category/:categoryIdentifier` (Public) - Filter products by category slug/ID.
- `GET /api/products/:id/related` (Public) - Get related products in same category.
- `POST /api/products` (Admin) - Create product (supports `image` upload).
- `PUT /api/products/:id` (Admin) - Update product.
- `DELETE /api/products/:id` (Admin) - Delete product.

### 4. Hero Slides (`/api/hero-slides`)
- `GET /api/hero-slides` (Public) - Get active hero slider slides.
- `POST /api/hero-slides` (Admin) - Create hero slide (supports `image` upload).
- `PUT /api/hero-slides/:id` (Admin) - Update hero slide.
- `DELETE /api/hero-slides/:id` (Admin) - Delete hero slide.

### 5. Document Downloads (`/api/documents` & `/api/document-categories`)
- `GET /api/document-categories` (Public) - List document categories (Pediatrician, Orthopedic, Gynecologist).
- `GET /api/documents` (Public) - List documents.
- `GET /api/documents/category/:categoryIdentifier` (Public) - Filter documents by category.
- `POST /api/documents` (Admin) - Upload PDF document (supports `file` upload).
- `DELETE /api/documents/:id` (Admin) - Delete document.

### 6. Contact & Enquiries (`/api/enquiries`)
- `POST /api/enquiries` (Public) - Submit contact form. Validates 10-digit phone, email format; `message` field is optional.
- `GET /api/enquiries` (Admin) - List customer enquiries.
- `PATCH /api/enquiries/:id/status` (Admin) - Update enquiry status (`new`, `read`, `replied`, `closed`).
- `DELETE /api/enquiries/:id` (Admin) - Delete enquiry.

### 7. Company Information (`/api/company`)
- `GET /api/company` (Public) - Get company contact details & address.
- `PUT /api/company` (Admin) - Update company details.

---

## 🔒 Standard API Response Shape

### Success Response (HTTP 200 / 201)
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response (HTTP 400 / 401 / 403 / 404 / 500)
```json
{
  "success": false,
  "message": "Validation or error message here",
  "data": null
}
```
