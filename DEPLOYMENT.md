# Webzet.store Backend Deployment Instructions

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- PM2 (for process management)

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   *Note: Ensure `DATABASE_URL` is correctly set to your PostgreSQL instance.*

3. **Database Migration**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Run in Development**
   ```bash
   npm run dev
   ```

5. **Production Deployment with PM2**
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.js
   pm2 save
   ```

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive JWT

### Products
- `GET /api/products`: List all products
- `GET /api/products/:id`: Get product details
- `POST /api/products`: Create product (Admin only)
- `PUT /api/products/:id`: Update product (Admin only)
- `DELETE /api/products/:id`: Delete product (Admin only)

### Orders
- `POST /api/orders/create`: Create a new order
- `GET /api/orders/user`: Get current user's orders
- `GET /api/orders/admin`: List all orders (Admin only)

### Payments (Razorpay)
- `POST /api/payment/create-order`: Create Razorpay order
- `POST /api/payment/verify`: Verify Razorpay payment signature

## Security Features
- JWT Authentication
- Role-based Access Control (User/Admin)
- Rate Limiting on Auth routes
- Input Validation using Zod
- Secure CORS configuration
- Password Hashing with Bcrypt
