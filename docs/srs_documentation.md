# LapHub - Software Requirements Specification (SRS)

---

## Chapter 1: Introduction of the System

### 1.1 Project Title
**LapHub – Premium E-Commerce Platform for Laptop & Computer Hardware**

### 1.2 Category
Web Application Development, E-Commerce, Cloud Technology, Payment Processing, and Inventory Management.

**Laptop Categories:**
- **By Usage:**
  - Student Laptops
  - Business Laptops
  - Gaming Laptops
  - Ultra books & 2-in-1 Convertibles
  
- **By Price Range:**
  - Budget (< ₹40,000)
  - Mid-Range (₹40,000 – ₹80,000)
  - Premium (> ₹80,000)
  
- **By Brand:**
  - HP, Dell, Lenovo, Asus, Acer, Apple, MSI, and more

### 1.3 Overview
The demand for laptops has significantly increased due to the growing need for remote work, online education, gaming, and personal use. LapHub is a comprehensive web-based e-commerce platform designed to provide a seamless shopping experience for purchasing laptops online, providing customers with a wide range of options, competitive pricing, and exceptional service. The platform caters to different user segments such as students, professionals, gamers, and businesses, ensuring accessibility and convenience. 

It features a responsive interface for both desktop and mobile browsers, ensuring an immersive user experience with advanced filtering, comparison tools, and secure checkout.

**Key Features:**
- Browse and search laptops from multiple brands and categories
- Advanced filtering by specifications (processor, RAM, storage, graphics, brand)
- Product comparison tool to compare multiple laptops
- Secure user registration and login with password recovery
- Shopping cart with persistent storage
- Multiple payment gateway integration (Razorpay for India, Stripe for international)
- Secure checkout with address management
- Order tracking and history
- Administrator dashboard for inventory and order management
- Real-time stock management and low-stock alerts
- User reviews and ratings for products
- Responsive design optimized for all devices

### 1.4 Objectives of the System
- Provide a responsive and user-friendly e-commerce shopping experience for laptop buyers
- Enable customers to search, filter, and compare laptops from various brands and categories
- Support secure payment processing through multiple payment gateways
- Implement an effective order management system with real-time tracking
- Store product information and user data securely in the cloud
- Provide comprehensive product specifications, reviews, and ratings
- Enable users to track order history and delivery status
- Cater to different user segments: students, professionals, gamers, and businesses
- Ensure accessibility and convenience for shopping anytime and anywhere

### 1.5 Scope of the System
- Targeted for students, professionals, gamers, and business buyers looking for laptops
- Designed for modern web browsers with responsive support across all devices
- Supports Customer, Admin, and System Manager user roles
- Scalable architecture suitable for high-traffic e-commerce scenarios
- Can be extended to mobile platforms (Android and iOS)
- Integration with popular payment providers (Razorpay, Stripe)
- Support for multiple product categories and advanced filtering
- Product comparison and detailed specification display
- Initial version limited to laptops only; accessories and peripherals planned for future
- Can be extended with international reach through multi-currency and multi-language support

### 1.6 Structure of the System

1. **Authentication & Authorization Module** – Secure login/signup with role-based access
2. **Product Management Module** – Browse, search, and filter products with detailed information
3. **Shopping Cart Module** – Add, remove, and manage cart items
4. **Order Management Module** – Create orders, track status, and manage order history
5. **Payment Processing Module** – Secure payment integration with multiple gateways
6. **Admin Dashboard** – Manage products, categories, inventory, and orders
7. **User Interface** – Responsive web design for all devices

### 1.7 System Architecture

**Main Layers:**

1. **Client Layer (Frontend)**
   - Built using React and Vite for dynamic, responsive interfaces
   - Tailwind CSS for modern, responsive design
   - Redux for state management

2. **Server Layer (Backend)**
   - Node.js with Express manages API requests, authentication, and payment processing
   - RESTful API architecture for scalability

3. **Database Layer**
   - MongoDB handles all data storage for users, products, orders, categories, and payments

4. **Payment Layer**
   - Razorpay integration for Indian market
   - Stripe integration for international payments
   - Secure payment processing and webhook handling

5. **Cloud Storage Layer**
   - Cloudinary is used for hosting and delivering product images securely
   - Optimized image delivery and transformation

6. **Authentication Layer**
   - JWT-based authentication for secure user sessions
   - bcryptjs for password hashing

### 1.8 End Users

- **Customers** – Browse, purchase, and track orders in real time
- **Administrators** – Manage products, categories, inventory, and orders
- **System Managers** – Monitor server, database performance, and system health
- **Guest Users** – Browse products without account creation (optional)

### 1.9 Software/Hardware Used for Development

**Software:**
- React.js + Vite + Tailwind CSS (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)
- Razorpay & Stripe (Payment Gateways)
- Cloudinary (Image Storage & Delivery)
- JWT for authentication
- bcryptjs for password hashing
- VS Code, Postman, MongoDB Compass

**Hardware:**
- **Processor:** Intel Core i5 or higher
- **RAM:** 8 GB minimum (16 GB recommended)
- **Storage:** 500 GB SSD storage
- **OS:** Windows 10 or higher / Linux
- **Device:** PC/Laptop/Mobile (Windows OS)
- **Internet:** Stable high-speed internet connection

### 1.10 Software/Hardware Required for Implementation

**Software:**
- HTML5, CSS3, JavaScript (Frontend Core)
- React.js + Vite (Frontend Framework)
- Node.js runtime environment (v16 or higher)
- MongoDB Atlas database
- Cloudinary account for media storage
- Razorpay merchant account (for Indian payments)
- Stripe merchant account (for international payments)
- Web browsers (Chrome, Firefox, Edge, Safari)
- npm/pnpm package manager

**Hardware:**
- **Server Requirements:** 2–4 CPU cores, 4–8 GB RAM, SSD storage, 100 Mbps internet
- **Client Requirements:** Any device with 2 GB RAM, 1024x768 resolution, and stable internet connection

### 1.11 Limitations

- Initial version limited to laptops only; no accessories or other electronics in early stage
- Limited payment gateway options in the early stage (primarily Razorpay and Stripe)
- Requires stable internet connection for smooth operation
- No dedicated mobile application in the first release (website only)
- Performance may vary with user device and network speed
- International payments subject to regional regulations and gateway limitations
- Older browsers may not support all features

### 1.12 Future Scope

- **Laptop Accessories:** Expansion to sell laptop accessories such as chargers, bags, and external storage
- **AI-Based Recommendations:** Integration of AI-based recommendation systems for personalized shopping
- **Mobile Applications:** Development of a dedicated mobile app for Android and iOS
- **Multi-Language Support:** Support for multiple languages for international reach
- **Multi-Currency Support:** Support for multiple currencies for global customers
- **Product Comparison:** Enhanced product comparison tool with specification highlighting
- **Wishlist & Favorites:** Advanced wishlist features with price tracking
- **Extended Categories:** Addition of computer hardware, peripherals, and accessories
- **Affiliate Program:** Commission-based affiliate marketing program
- **Logistics Integration:** Direct integration with shipping and delivery partners

---

## Chapter 2: Software Requirement Specification (SRS)

### 2.1 Introduction
This Software Requirement Specification (SRS) defines the functional and non-functional requirements of the LapHub e-commerce system. It explains how the system operates under various conditions, including user interactions, software dependencies, and system constraints. The SRS serves as a guide for design, development, and testing phases. It ensures a common understanding among developers, testers, and stakeholders regarding system objectives, performance expectations, and scalability.

### 2.2 Overall Description

#### 2.2.1 Product Perspective
LapHub is a full-stack web application that provides a complete e-commerce platform for buying and selling laptops and computer hardware. It integrates React (frontend), Node.js/Express (backend), MongoDB (database), Razorpay/Stripe (payment processing), and Cloudinary (media storage) to deliver a seamless shopping experience with secure transactions, inventory management, and admin control.

#### 2.2.2 Product Functions

- **User Authentication & Authorization** – Secure registration, login, and role-based access control
- **Product Catalog** – Browse products with detailed specifications, images, and pricing
- **Search & Filtering** – Advanced search and filtering by category, price, specifications, and ratings
- **Shopping Cart** – Add, remove, update quantities, and manage items before checkout
- **Order Management** – Place orders, track status, and view order history
- **Payment Processing** – Secure payment through Razorpay and Stripe with webhook integration
- **User Profile Management** – Manage personal information, addresses, and preferences
- **Admin Dashboard** – Full control over products, categories, inventory, orders, and users
- **Product Reviews & Ratings** – Users can leave reviews and ratings for purchased products
- **Responsive Design** – Optimized for mobile, tablet, and desktop browsers
- **Inventory Management** – Real-time stock tracking and low-stock alerts
- **Order Notifications** – Email and in-app notifications for order updates

#### 2.2.3 User Characteristics

- **Customers** – Tech-savvy and casual users who browse and purchase products online
- **Repeat Customers** – Users with saved addresses, payment methods, and order history
- **Admin Users** – Product managers who add, edit, and manage product catalogs
- **Administrators** – Full system access for managing users, orders, and system settings
- **System Admins** – Handle server deployment, database management, and performance monitoring

#### 2.2.4 General Constraints

- Requires stable internet connection for browsing and checkout
- Depends on third-party services (Razorpay, Stripe, Cloudinary, MongoDB Atlas)
- Payment processing requires PCI DSS compliance
- Image uploads limited by Cloudinary plan
- Performance may vary with user device and network speed
- Inventory updates must be in real-time to prevent overselling
- Mobile optimization required for 50% of expected traffic

### 2.3 Special Requirements

**Software:**
- React.js with Vite for fast builds
- Tailwind CSS for responsive design
- Node.js with Express.js backend
- MongoDB 6.x or MongoDB Atlas
- Razorpay and Stripe API integration
- JWT authentication
- WebSocket support (for future real-time features)

**Hardware:**
- Minimum Intel Core i5 (8th Gen or higher) / AMD Ryzen 5 equivalent
- Windows/Mac/Linux Laptop/Desktop
- 8 GB RAM minimum for development
- Stable high-speed internet connection (10 Mbps minimum)
- SSD storage (256 GB minimum)

### 2.4 Functional Requirements

#### 2.4.1 Module 1: Authentication & User Management
- User registration with email verification
- Secure login with JWT token-based sessions
- Role-based access control (Customer, Admin, System Admin)
- Password reset and recovery functionality
- User profile creation and management
- Logout and token refresh mechanism
- Two-factor authentication (optional future feature)
- Session timeout for security

#### 2.4.2 Module 2: Product Management
- Admin can create, read, update, and delete products (laptops)
- Product categorization with hierarchical categories (By Usage, By Price, By Brand)
- Product specifications (Processor, RAM, Storage, Graphics, Display, Battery, etc.)
- Image upload with Cloudinary integration (thumbnail, primary, gallery images)
- Inventory tracking and stock management
- Price management with discount and offer support
- Product search with keyword matching (brand, model, specifications)
- Advanced filtering by specifications and category
- Featured and recommended products display
- Product comparison feature for multiple laptops
- Warranty and after-sales service information
- Bulk product upload from CSV/Excel (admin only)
- Product visibility toggle (active/inactive)
- Specification templates for consistency

#### 2.4.3 Module 3: Shopping Cart & Checkout
- Add/remove products from cart
- Update product quantities
- Calculate subtotal, taxes, and shipping
- Apply coupon/discount codes
- Save cart for later
- Guest checkout option
- Persistent cart across sessions
- Real-time cart updates
- Cart abandonment recovery (future feature)

#### 2.4.4 Module 4: Payment Processing
- Integrate Razorpay for Indian payments (UPI, Net Banking, Card, Wallet)
- Integrate Stripe for international payments (Credit/Debit Card)
- Support for multiple payment methods:
  - Credit/Debit Card
  - UPI
  - Net Banking
  - Digital Wallets
  - Cash on Delivery (COD) - optional
- Secure payment gateway integration with PCI DSS compliance
- Payment status tracking and confirmation
- Invoice generation and email delivery with detailed breakdown
- Refund processing (admin functionality) for returns
- Payment history tracking for audit purposes
- Multiple payment method support for flexibility
- Webhook integration for real-time payment updates
- Payment failure handling and retry mechanism
- Secure OTP verification for card payments

#### 2.4.5 Module 5: Order Management
- Create and store orders with complete details
- Order status tracking (Pending, Processing, Shipped, Delivered)
- Order history for users
- Admin order management and fulfillment
- Order cancellation and return requests (future feature)
- Email notifications for order updates
- Order invoice and receipt generation
- Estimated delivery date tracking

#### 2.4.6 Module 6: Admin Dashboard
- Dashboard overview with key metrics
- Product management interface
- Category management
- Order management and fulfillment
- User management and statistics
- Inventory alerts and low-stock notifications
- Sales analytics and reports
- Admin activity logs

#### 2.4.7 Module 7: Design & Performance Constraints
- Must be fully responsive across all devices
- Page load time < 3 seconds
- Payment processing < 5 seconds
- Mobile-first design approach
- Cross-browser compatibility (Chrome, Firefox, Edge, Safari)
- Accessible UI with WCAG 2.1 AA compliance
- SEO optimization for product pages
- Optimized images and lazy loading

#### 2.4.8 Module 8: System Attributes

**Reliability:**
- 99.5% uptime requirement
- Minimal downtime during updates
- Automatic error recovery
- Data backup and disaster recovery plan

**Performance:**
- Page load time < 3 seconds on 4G network
- Database queries optimized with indexing
- Caching strategy for frequently accessed data
- CDN delivery for images and static assets

**Security:**
- HTTPS/SSL encryption for all communications
- JWT-based authentication
- bcryptjs password hashing
- Input validation and sanitization
- SQL injection and XSS prevention
- PCI DSS compliance for payment data
- Rate limiting for API endpoints
- CSRF token protection

**Usability:**
- Intuitive navigation and user-friendly interface
- Clear product information and images
- Easy checkout process (3-4 steps maximum)
- Search functionality on all pages
- Responsive design for all screen sizes

**Scalability:**
- Horizontal scaling for backend servers
- Database sharding support
- Load balancing for high traffic
- Caching layer for performance optimization
- Support for concurrent user load

**Maintainability:**
- Modular architecture for easy updates
- Clear code documentation
- Automated testing coverage
- Continuous integration/deployment (CI/CD)

**Compatibility:**
- Cross-browser support
- Mobile app compatibility (future)
- API versioning for backward compatibility
- Support for older browsers (fallbacks)

#### 2.4.9 Other Requirements
- Progressive Web App (PWA) support for offline browsing
- Email notifications for order and account updates
- SMS notifications for critical updates (optional)
- Analytics and user behavior tracking (with consent)
- Sitemap and robots.txt for SEO
- Terms of Service and Privacy Policy pages
- Contact/support form for customer inquiries

---

## Chapter 3: System Design (Functional Design)

### 3.1 Introduction
System design for LapHub defines how the e-commerce platform operates, integrates, and delivers a seamless shopping experience. The architecture ensures secure, scalable, and responsive interaction through modular components that handle user authentication, product management, order processing, and payment handling. The system focuses on performance optimization and user experience—managing product catalogs, delivering secure payments, and enabling efficient admin control. It uses MongoDB for data storage, Razorpay/Stripe for payments, and Cloudinary for media delivery. The design supports smooth transaction processing while maintaining optimal performance and data security.

### 3.2 Assumptions and Constraints

**Assumptions:**
- Users have stable internet connection for browsing and checkout
- Modern browsers with JavaScript enabled and cookie support
- Users are familiar with basic e-commerce interfaces
- Payment gateways are always available and responsive
- Cloudinary service is available for image storage and delivery
- MongoDB Atlas is accessible and maintains uptime

**Constraints:**
- Dependent on external services (Razorpay, Stripe, Cloudinary, MongoDB Atlas)
- Payment processing subject to PCI DSS compliance
- File upload size restrictions based on Cloudinary plan
- API rate limiting from payment providers
- Concurrent user load dependent on server capacity
- Image quality limited by bandwidth and device capabilities
- International payments subject to regional regulations

### 3.3 Functional Decomposition

The system is divided into the following major modules:

1. **Authentication & User Management**
   - Secure login/signup with JWT tokens
   - User profile management and role-based access control
   - Session management with token refresh

2. **Product Catalog & Discovery**
   - Browse products with specifications and reviews
   - Search functionality with advanced filtering
   - Product recommendations and featured items
   - Category-based navigation

3. **Shopping Cart & Checkout**
   - Cart management with quantity updates
   - Discount and coupon application
   - Shipping and tax calculation
   - Multi-step checkout process

4. **Payment Processing**
   - Razorpay integration for Indian payments
   - Stripe integration for international payments
   - Secure payment gateway communication
   - Webhook handling for payment confirmations

5. **Order Management**
   - Order creation and storage
   - Status tracking and updates
   - Order history and invoicing
   - Admin fulfillment workflows

6. **Administrative Content Management**
   - Product management (CRUD operations)
   - Category and inventory management
   - Order management and fulfillment
   - User and system administration

### 3.4 Context Flow Diagram (CFD)

**Entities:**
- Customers (Primary Users)
- Administrators (System Managers)
- Payment Gateways (Razorpay, Stripe)
- Cloudinary (Image Storage & Delivery)
- MongoDB Database (Data Storage)
- Email Service (Notifications)

**System Blocks:**
- User Authentication & Authorization Management
- Product Catalog & Search System
- Shopping Cart & Checkout Management
- Payment Processing & Security
- Order Management System
- Administrative Content Management Portal

### 3.5 Data Flow Diagrams (DFDs)

#### Level 0 (High-Level Overview)
```
[Users] → [LapHub System] → [Payment Gateway]
                ↓
        [Database] ← [Admin]
                ↓
        [Notifications]
```

#### Level 1 (Major Processes)
```
1. User Registration/Login → JWT Token
2. Product Browsing → Product Catalog
3. Add to Cart → Cart Management
4. Checkout → Payment Processing
5. Order Confirmation → Order Storage
6. Admin Dashboard → Content Management
```

#### Level 2 (Detailed Processes)
```
User Authentication:
[User Credentials] → [Express Backend] → [JWT Generation] → [MongoDB User Check]

Product Retrieval:
[Search Query] → [Express API] → [MongoDB Query] → [Cloudinary Images] → [Response]

Payment Processing:
[Order Data] → [Payment Gateway] → [Webhook] → [Update Order Status] → [Notification]
```

### 3.6 Description of Components

#### 3.6.1 Functional Component 1: Authentication & Authorization
- **Purpose:** Secure user identity verification and session management
- **Technology:** JWT tokens, bcryptjs, Express middleware
- **Input:** User credentials (email/password), authentication requests
- **Output:** Authenticated sessions, user profiles, access tokens
- **Implementation:** HTTPS communication, secure token storage, session validation

#### 3.6.2 Functional Component 2: Product Catalog Management
- **Purpose:** Organize and deliver product information with search capabilities
- **Technology:** MongoDB with Mongoose ODM, Cloudinary for images
- **Input:** Search queries, filter parameters, product requests
- **Output:** Product lists, product details, filtered results, recommendations
- **Implementation:** Database indexing, caching, image optimization

#### 3.6.3 Functional Component 3: Shopping Cart & Checkout
- **Purpose:** Manage user shopping sessions and checkout process
- **Technology:** MongoDB, Express.js, Redis (for session caching)
- **Input:** Product additions/removals, quantity updates, checkout requests
- **Output:** Cart totals, order confirmation, invoice generation
- **Implementation:** Real-time updates, persistent storage, validation

#### 3.6.4 Functional Component 4: Payment Processing
- **Purpose:** Secure handling of payments and transaction management
- **Technology:** Razorpay API, Stripe API, Webhooks, JWT
- **Input:** Payment information, order details, customer data
- **Output:** Payment confirmation, transaction records, receipts
- **Implementation:** PCI DSS compliance, SSL encryption, webhook integration

#### 3.6.5 Functional Component 5: Order Management
- **Purpose:** Track and manage customer orders throughout lifecycle
- **Technology:** MongoDB, Express.js, Email Service
- **Input:** Order creation, status updates, customer inquiries
- **Output:** Order confirmations, status updates, invoices
- **Implementation:** Real-time tracking, notification system, history retention

#### 3.6.6 Functional Component 6: Administrative Management
- **Purpose:** Provide admin control over products, orders, and users
- **Technology:** Express.js API, MongoDB, Cloudinary, Node.js
- **Input:** Media files, product metadata, administrative commands
- **Output:** Updated catalog, user management reports, analytics
- **Implementation:** Role-based access control, audit logs, secure operations

---

## Chapter 4: Database Design

### 4.1 Introduction
The database design of LapHub securely manages user credentials, product catalogs, orders, payments, and inventory using MongoDB. It supports role-based access control for customers and administrators, enables efficient product discovery and order tracking, and maintains data integrity while supporting real-time updates. The design integrates seamlessly with Cloudinary for media storage, payment gateways for secure transactions, and provides optimized query performance for fast user experience.

### 4.2 Purpose and Scope

**Purpose:**
- Securely store and manage user profiles, products, categories, orders, and payments
- Provide real-time access for browsing, shopping, and order tracking
- Enable efficient product discovery with advanced searching and filtering
- Maintain system performance with scalable indexing and caching
- Support admin operations for inventory and order management

**Scope:**
- Database used by the LapHub web application
- Stores:
  - User profiles and authentication metadata
  - Products, categories, and specifications
  - Shopping carts and order details
  - Payment information and transaction logs
  - Order history and invoices
  - Product reviews and ratings
  - Administrative records and activity logs

### 4.3 Table/Collection Definitions

#### 4.3.1 Users Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for user |
| name | String | User's full name |
| email | String (UK) | User's email address |
| passwordHash | String | Hashed password using bcryptjs |
| role | String | User role (customer, admin, system_admin) |
| imageUrl | String | Profile picture URL from Cloudinary |
| phone | String | User's phone number |
| address | Object | Primary address (street, city, state, zip) |
| createdAt | Date | Account creation timestamp |
| updatedAt | Date | Last update timestamp |

#### 4.3.2 Categories Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for category |
| name | String | Category name (Laptops, Peripherals, etc.) |
| description | String | Category description |
| imageUrl | String | Category image URL from Cloudinary |
| createdAt | Date | Category creation timestamp |
| updatedAt | Date | Last update timestamp |

#### 4.3.3 Products Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for product |
| name | String | Product name/title |
| description | String | Detailed product description |
| price | Number | Product price in USD/INR |
| categoryId | ObjectId (FK) | Reference to Category._id |
| specifications | Object | Product specs (RAM, Storage, Processor, etc.) |
| imageUrl | String | Product image URL from Cloudinary |
| stock | Number | Available inventory quantity |
| rating | Number | Average rating (0-5) |
| reviews | Array[ObjectId] | References to reviews |
| createdAt | Date | Product creation timestamp |
| updatedAt | Date | Last update timestamp |

#### 4.3.4 Orders Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for order |
| userId | ObjectId (FK) | Reference to User._id |
| items | Array[Object] | Order items with product details |
| total | Number | Order total amount |
| tax | Number | Tax amount |
| shippingCost | Number | Shipping cost |
| shippingAddress | Object | Delivery address |
| status | String | Order status (pending, processing, shipped, delivered) |
| paymentId | ObjectId (FK) | Reference to Payment._id |
| createdAt | Date | Order creation timestamp |
| updatedAt | Date | Last update timestamp |

#### 4.3.5 OrderItems Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for order item |
| orderId | ObjectId (FK) | Reference to Order._id |
| productId | ObjectId (FK) | Reference to Product._id |
| quantity | Number | Quantity purchased |
| price | Number | Price at time of purchase |
| specifications | Object | Product specs at purchase time |
| createdAt | Date | Item addition timestamp |

#### 4.3.6 Payments Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for payment |
| orderId | ObjectId (FK) | Reference to Order._id |
| userId | ObjectId (FK) | Reference to User._id |
| amount | Number | Payment amount |
| provider | String | Payment provider (razorpay, stripe) |
| transactionId | String | Transaction ID from payment provider |
| status | String | Payment status (pending, completed, failed) |
| paidAt | Date | Payment completion timestamp |
| createdAt | Date | Payment creation timestamp |

#### 4.3.7 Reviews Collection

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for review |
| productId | ObjectId (FK) | Reference to Product._id |
| userId | ObjectId (FK) | Reference to User._id |
| rating | Number | Rating (1-5 stars) |
| title | String | Review title |
| comment | String | Review comment/description |
| createdAt | Date | Review creation timestamp |
| updatedAt | Date | Last update timestamp |

#### 4.3.8 Cart Collection (Session-based)

| Field Name | Data Type | Description |
|-----------|-----------|-------------|
| _id | ObjectId (PK) | Unique identifier for cart |
| userId | ObjectId (FK) | Reference to User._id |
| items | Array[Object] | Cart items with product ID and quantity |
| subtotal | Number | Cart subtotal |
| createdAt | Date | Cart creation timestamp |
| updatedAt | Date | Last update timestamp |

### 4.4 Database Indexes

For optimal query performance, create indexes on:

```javascript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

// Categories collection
db.categories.createIndex({ name: 1 });

// Products collection
db.products.createIndex({ categoryId: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ stock: 1 });

// Orders collection
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });

// OrderItems collection
db.orderitems.createIndex({ orderId: 1 });
db.orderitems.createIndex({ productId: 1 });

// Payments collection
db.payments.createIndex({ orderId: 1 });
db.payments.createIndex({ userId: 1 });
db.payments.createIndex({ status: 1 });

// Reviews collection
db.reviews.createIndex({ productId: 1 });
db.reviews.createIndex({ userId: 1 });

// Cart collection
db.carts.createIndex({ userId: 1 });
```

### 4.5 ER Diagram

```
                        +------------------+
                        |      USER        |
                        |------------------+
                        | PK _id           |
                        | name             |
                        | email (UK)       |
                        | passwordHash     |
                        | role             |
                        | imageUrl         |
                        | phone            |
                        | address          |
                        +------------------+
                        | 1                |
                        | places orders    |
                        | *                |
                        |
        +---------------+----------+
        |                          |
        v                          v
   +----------+              +----------+
   |  ORDER   |              |  REVIEW  |
   |----------|              |----------|
   | PK _id   |              | PK _id   |
   | userId   |              | productId|
   | items    |              | userId   |
   | total    |              | rating   |
   | status   |              | comment  |
   +----------+              +----------+
        |
        | contains items
        | *
        v
   +----------+
   |   ORDER  |
   |   ITEMS  |
   |----------|
   | PK _id   |
   | orderId  |
   | productId|
   | quantity |
   | price    |
   +----------+
        |
        | references
        | *
        v
   +----------+          +----------+
   | PRODUCT  |--------->| CATEGORY |
   |----------|belongs   |----------|
   | PK _id   |to 1      | PK _id   |
   | name     |          | name     |
   | price    |          | desc     |
   | categoryId|         +----------+
   | stock    |
   +----------+
        |
        | has payment
        | 1
        v
   +----------+
   | PAYMENT  |
   |----------|
   | PK _id   |
   | orderId  |
   | amount   |
   | provider |
   | status   |
   +----------+
```

---

## Chapter 5: Detailed Design

### 5.1 Introduction
The detailed design of LapHub focuses on the internal logic of each functional module. This includes input handling, API interaction, payment processing, and output generation. Each module performs a specific function such as authentication, catalog management, shopping, payment processing, or content administration. The modular design ensures maintainability, scalability, and flexibility for future feature extensions.

### 5.2 Structure of the Software Package (Architecture Chart)

```
LapHub E-Commerce Application
│
├── Authentication & Authorization Module (Module 1)
│   ├── User Registration & Login
│   ├── JWT Token Management
│   ├── Role-Based Access Control (RBAC)
│   └── Password Reset & Recovery
│
├── Product Management Module (Module 2)
│   ├── Product CRUD Operations
│   ├── Category Management
│   ├── Inventory Tracking
│   ├── Image Upload (Cloudinary)
│   └── Product Specifications
│
├── Product Discovery Module (Module 3)
│   ├── Search Functionality
│   ├── Advanced Filtering
│   ├── Category Navigation
│   ├── Product Recommendations
│   └── Rating & Reviews
│
├── Shopping Cart Module (Module 4)
│   ├── Add/Remove Items
│   ├── Quantity Management
│   ├── Cart Persistence
│   ├── Cart Calculations
│   └── Coupon/Discount Application
│
├── Checkout & Order Module (Module 5)
│   ├── Multi-step Checkout
│   ├── Shipping Address Management
│   ├── Order Confirmation
│   ├── Invoice Generation
│   └── Order History Tracking
│
├── Payment Processing Module (Module 6)
│   ├── Razorpay Integration
│   ├── Stripe Integration
│   ├── Payment Validation
│   ├── Webhook Handling
│   └── Transaction Logging
│
├── Admin Dashboard Module (Module 7)
│   ├── Product Management UI
│   ├── Order Management
│   ├── User Management
│   ├── Inventory Dashboard
│   ├── Analytics & Reports
│   └── System Monitoring
│
├── User Interface Module (Module 8)
│   ├── Responsive Components
│   ├── Navigation & Layout
│   ├── Product Display
│   ├── Checkout Flow
│   └── Mobile Optimization
│
└── External Services Integration Module (Module 9)
    ├── MongoDB Connection
    ├── Cloudinary Integration
    ├── Razorpay API
    ├── Stripe API
    └── Email Service
```

### 5.3 Modular Decomposition of the System

#### 5.3.1 Module 1: Authentication Management
- **Inputs:** User credentials, registration data, OAuth tokens
- **Processing:** Hash passwords, generate JWT tokens, validate credentials
- **File I/O:** MongoDB Users collection, JWT libraries
- **Outputs:** Authentication tokens, user sessions, access confirmation
- **Implementation:** bcryptjs for hashing, JWT for tokens, HTTPS for transmission

#### 5.3.2 Module 2: Product Management
- **Inputs:** Product data, images, specifications, category info
- **Processing:** Validate data, upload images, store product details
- **File I/O:** MongoDB Products collection, Cloudinary API
- **Outputs:** Product ID, confirmation response, image URLs
- **Implementation:** Data validation, image optimization, database indexing

#### 5.3.3 Module 3: Product Discovery & Search
- **Inputs:** Search queries, filter parameters, sorting preferences
- **Processing:** Query database, apply filters, rank results
- **File I/O:** MongoDB Products, Categories collections
- **Outputs:** Product lists, filtered results, recommendations
- **Implementation:** Database indexing, caching, full-text search

#### 5.3.4 Module 4: Shopping Cart Management
- **Inputs:** Product ID, quantity, user preferences
- **Processing:** Add/remove items, calculate totals, validate stock
- **File I/O:** MongoDB Cart, Products collections
- **Outputs:** Updated cart, totals, inventory status
- **Implementation:** Session management, real-time updates, validation

#### 5.3.5 Module 5: Checkout & Order Processing
- **Inputs:** Cart data, shipping address, payment method
- **Processing:** Validate address, calculate shipping/tax, create order
- **File I/O:** MongoDB Orders, OrderItems collections
- **Outputs:** Order confirmation, order ID, invoice
- **Implementation:** Data validation, transaction handling, error recovery

#### 5.3.6 Module 6: Payment Processing
- **Inputs:** Order data, payment credentials, amount
- **Processing:** Validate payment, communicate with gateway, log transaction
- **File I/O:** Razorpay API, Stripe API, MongoDB Payments
- **Outputs:** Payment confirmation, receipt, transaction record
- **Implementation:** PCI DSS compliance, SSL encryption, webhook handling

#### 5.3.7 Module 7: Order Management & Fulfillment
- **Inputs:** Order details, fulfillment status, tracking info
- **Processing:** Update order status, generate invoices, send notifications
- **File I/O:** MongoDB Orders collection, Email service
- **Outputs:** Order updates, invoices, notifications
- **Implementation:** Real-time tracking, notification system, document generation

#### 5.3.8 Module 8: Admin Dashboard
- **Inputs:** Admin commands, product data, user management requests
- **Processing:** Validate permissions, process requests, generate reports
- **File I/O:** MongoDB collections, Cloudinary, analytics
- **Outputs:** Admin confirmations, reports, system updates
- **Implementation:** Role-based access control, audit logs, data aggregation

---

## Chapter 6: User Interface

### 6.1 Login & Registration Page

**Features:**
- Clean, modern login form with email and password fields
- "Forgot Password" functionality with email OTP verification
- New user registration link with sign-up form
- Password reset link with email verification
- Form validation with real-time error messages
- "Remember me" checkbox for persistent login
- Option for new users to register
- Secure authentication using encryption (HTTPS, password hashing)
- Responsive design for mobile and desktop

**Layout:**
- LapHub logo and branding
- Form fields: Email/Username, Password
- "Sign In" button and "Forgot Password" link
- Registration and social login options (future)

**Forgot Password Flow:**
- User enters registered email address
- OTP sent to email address
- User enters OTP to verify identity
- User sets new password
- System confirms password reset

### 6.2 Home Page / Dashboard

**Features:**
- Personalized greeting for logged-in users
- Featured products carousel
- Trending products section
- Category navigation menu
- Search bar with autocomplete
- Product cards with images, prices, and ratings
- Special offers and promotions banner
- Newsletter subscription option

**Sections:**
- Header with logo, search, cart icon, user menu
- Navigation sidebar with categories
- Featured products section
- Trending products section
- Promotional banners
- Footer with links, contact info, social media

### 6.3 Product Listing & Search Page

**Features:**
- Product grid/list view toggle
- Advanced filters by laptop specifications:
  - **By Usage:** Student, Business, Gaming, Ultra books & 2-in-1
  - **By Price Range:** Budget, Mid-Range, Premium
  - **By Brand:** HP, Dell, Lenovo, Asus, Acer, Apple, MSI, etc.
  - **By Processor:** Intel Core i3, i5, i7, i9, AMD Ryzen 3, 5, 7, 9
  - **By RAM:** 4GB, 8GB, 16GB, 32GB
  - **By Storage:** 256GB, 512GB, 1TB, 2TB
  - **By Graphics:** Integrated, NVIDIA GTX, RTX, AMD Radeon
- Sorting options (price, rating, newest, best-seller, popularity)
- Pagination or infinite scroll
- Product cards showing image, name, price, processor, RAM, storage, rating
- Quick view and "Add to Cart" buttons
- Number of results displayed
- Search term highlighting
- Filter count display showing active filters

### 6.4 Product Detail Page

**Features:**
- Large product image with zoom functionality and image gallery
- Detailed laptop specifications:
  - Processor type and speed
  - RAM capacity and type
  - Storage type and capacity
  - Display size and resolution
  - Graphics card details
  - Battery life
  - Weight and dimensions
  - Operating system
  - Connectivity ports (USB, HDMI, Thunderbolt, etc.)
- Pricing with discount information
- Availability status and stock indicator
- Rating and reviews section with customer feedback
- Add to cart button with quantity selector
- "Add to Wishlist" button
- Compare with other laptops feature
- Related/Similar products section
- Detailed product description and features
- Customer reviews with ratings and verified purchase badge
- Warranty and after-sales service information
- "Out of stock" or "In stock" indicator with pre-order option
- Share product on social media

### 6.5 Shopping Cart Page

**Features:**
- List of added products with images
- Quantity adjustment controls
- Remove item buttons
- Subtotal calculation
- Tax and shipping estimate
- Apply coupon/discount code field
- Proceed to checkout button
- Continue shopping button
- Cart summary (items count, total)
- Suggestion to add more items

### 6.6 Checkout Process

**Step 1 - Shipping Address:**
- Address form fields (street, city, state, zip, country)
- Save address option
- Previous addresses dropdown
- Continue button

**Step 2 - Shipping Method:**
- Shipping options with costs
- Estimated delivery date
- Delivery partner information
- Continue button

**Step 3 - Payment Method:**
- Payment option selection (Razorpay, Stripe)
- Card details (for credit/debit)
- Net banking option
- Wallet or digital payment option
- Continue button

**Step 4 - Order Review:**
- Order summary with items
- Shipping address
- Shipping method and cost
- Tax calculation
- Total amount
- Place order button

### 6.7 Order Confirmation & Tracking

**Features:**
- Order number and confirmation message
- Order details summary
- Estimated delivery date
- Order status (Processing, Shipped, In Transit, Delivered)
- Track order button/link
- Print invoice option
- Download invoice as PDF
- Order history link

### 6.8 User Profile & Account Page

**Features:**
- User information (name, email, phone)
- Profile picture upload
- Address book management (add, edit, delete addresses)
- Order history with status
- Saved payment methods (partial display for security)
- Wishlist/Favorites
- Account preferences and settings
- Notification preferences
- Password change option
- Logout button

### 6.9 Admin Dashboard

**Overview Section:**
- Key metrics (total sales, orders, products, users)
- Sales chart for selected period
- Recent orders widget
- Best-selling products widget
- Low stock alerts

**Product Management:**
- Add new product form
- Product list with search and filters
- Edit/delete product options
- Bulk upload capability
- Category management
- Image upload and management

**Order Management:**
- Orders list with status filters
- Order details view
- Update order status
- Generate and download invoices
- Customer information
- Refund management

**User Management:**
- User list with details
- Search and filter capabilities
- User role management
- User activity logs
- Block/unblock users

**Analytics & Reports:**
- Sales analytics dashboard
- Revenue reports
- Customer demographics
- Product performance metrics
- Traffic analytics
- Export reports to CSV/PDF

---

## Chapter 7: Testing

### 7.1 Introduction
Testing ensures the LapHub e-commerce system works correctly, securely, and efficiently. We test each module individually (unit testing), check interactions between modules (integration testing), and evaluate the full system in real-world scenarios (system testing). Edge cases like invalid logins, payment failures, out-of-stock items, and concurrent orders are also tested.

### 7.1.1 Unit Testing
Each module of the LapHub system is individually tested:

- **Authentication:** Verify login, registration, password reset, JWT generation
- **Product Management:** Test CRUD operations, image uploads, specification storage
- **Product Search:** Validate search functionality, filtering, sorting
- **Cart Operations:** Add/remove items, quantity updates, calculations
- **Checkout Process:** Address validation, order creation, total calculation
- **Payment Processing:** Payment validation, transaction logging, error handling
- **Order Management:** Order creation, status updates, invoice generation
- **Admin Operations:** Product management, user management, order fulfillment
- **User Profile:** Profile updates, address management, preference settings

### 7.1.2 Integration Testing
Modules tested together to ensure data flow and interactions:

- Authentication → Product Browsing → Cart → Checkout → Payment → Order Confirmation
- Admin Login → Product Upload → Product Display → Inventory Update
- User Registration → Profile Creation → Address Management → Order Placement
- Payment Processing → Order Update → Notification → Invoice Generation
- Verified modules work together and data flows correctly across system

### 7.1.3 System Testing
Full system evaluation in realistic e-commerce scenarios:

- Complete user journey from registration to order delivery
- Admin workflows for product management and order fulfillment
- Payment gateway integration with real transactions
- Inventory management across concurrent orders
- Real-time stock updates and availability
- Database integrity and consistency
- Performance under load testing (concurrent users)

### 7.1.4 Performance Testing
- Page load time measurement (< 3 seconds target)
- Database query optimization verification
- Payment processing speed (< 5 seconds target)
- Concurrent user load capacity
- Image delivery optimization
- API response time under load

### 7.2 Test Report

| Test Case ID | Description | Expected Result | Status |
|-------------|-------------|------------------|--------|
| TC_001 | User registration | Account created successfully | Pass |
| TC_002 | User login | User authenticated with valid JWT | Pass |
| TC_003 | Invalid login | Error message displayed | Pass |
| TC_004 | Browse products | Products loaded from database | Pass |
| TC_005 | Search products | Matching products displayed | Pass |
| TC_006 | Filter products | Filtered results displayed correctly | Pass |
| TC_007 | Add to cart | Item added to cart | Pass |
| TC_008 | Remove from cart | Item removed from cart | Pass |
| TC_009 | Update cart quantity | Quantity updated correctly | Pass |
| TC_010 | Apply discount | Discount calculated correctly | Pass |
| TC_011 | Proceed to checkout | Checkout form displayed | Pass |
| TC_012 | Payment processing (Razorpay) | Payment successful | Pass |
| TC_013 | Payment processing (Stripe) | Payment successful | Pass |
| TC_014 | Order creation | Order stored in database | Pass |
| TC_015 | Order confirmation email | Email sent to user | Pass |
| TC_016 | View order history | User's orders displayed | Pass |
| TC_017 | Admin product upload | Product added to catalog | Pass |
| TC_018 | Admin order management | Order status updated | Pass |
| TC_019 | Admin user management | Users listed and managed | Pass |
| TC_020 | Out of stock handling | Product unavailable for purchase | Pass |
| TC_021 | Responsive design (Mobile) | Layout adjusted for mobile | Pass |
| TC_022 | Responsive design (Tablet) | Layout adjusted for tablet | Pass |
| TC_023 | Cross-browser (Chrome) | Works correctly | Pass |
| TC_024 | Cross-browser (Firefox) | Works correctly | Pass |
| TC_025 | Session timeout | User logged out after inactivity | Pass |

---

## Chapter 8: Conclusion

The LapHub E-Commerce Platform efficiently integrates authentication, product management, shopping, payment processing, and order management into a comprehensive web-based platform. It streamlines the shopping experience for customers while providing administrators with powerful tools to manage inventory and orders.

With secure JWT authentication and role-based access, customers can browse and purchase with confidence while administrators maintain full control over the platform. Responsive design ensures seamless experience on all devices, while Razorpay and Stripe integration enables secure, flexible payment options.

The modular architecture of LapHub makes it scalable and adaptable for future integrations with mobile apps, advanced recommendation systems, loyalty programs, or marketplace features. The platform is built to handle high-traffic scenarios while maintaining performance and security standards.

**Key Achievements:**
- Secure, scalable e-commerce platform
- Seamless user experience across all devices
- Flexible payment processing with multiple gateways
- Efficient inventory and order management
- Extensible architecture for future enhancements

---

## Chapter 9: Limitations

- **Product Scope:** Initial version limited to laptops only; accessories and peripherals planned for future phases
- **Internet Dependency:** Real-time features require stable internet connection for smooth operation
- **Payment Gateway Dependency:** Platform relies on Razorpay (India) and Stripe (International) availability
- **Cloudinary Dependency:** Image storage and delivery dependent on Cloudinary service
- **Database Dependency:** MongoDB Atlas uptime affects system availability
- **Concurrent User Load:** Performance depends on server capacity and scaling infrastructure
- **Geographic Restrictions:** International payments subject to regional regulations and gateway limitations
- **Browser Compatibility:** Older browsers may not support all features
- **Mobile App:** No dedicated mobile application in first release (website only)
- **Offline Functionality:** Limited offline capabilities; PWA support planned for future
- **Payment Processing:** PCI compliance requirements limit certain customizations
- **COD Availability:** Cash on Delivery limited to specific regions in early phase

---

## Chapter 10: Scope for Enhancement

- **Laptop Accessories:** Expansion to sell laptop accessories such as chargers, bags, and external storage devices
- **AI-Based Recommendations:** Implement machine learning for personalized laptop suggestions based on user preferences and browsing history
- **Mobile Applications:** Develop native iOS and Android applications for better mobile experience
- **Multi-Language Support:** Support for multiple languages to reach international customers
- **Multi-Currency Support:** Support for multiple currencies for global transactions
- **Product Comparison:** Enhanced product comparison tool with specification highlighting and side-by-side view
- **Wishlist & Price Tracking:** Advanced wishlist with price drop notifications
- **Extended Hardware Categories:** Addition of computer hardware, peripherals, and accessories
- **Advanced Inventory:** Warehouse management and multi-location inventory tracking
- **Shipping Integration:** Direct integration with shipping providers (FedEx, DHL, Local Couriers)
- **Return Management:** Automated return and refund processing with tracking
- **Live Chat Support:** Real-time customer support functionality
- **Affiliate Program:** Commission-based affiliate marketing program for sellers
- **Refurbished Laptops:** Support for selling refurbished and used laptops with certification
- **Trade-in Program:** Allow customers to trade in old laptops for credit
- **Extended Warranty:** Third-party warranty and insurance options
- **Business Bulk Orders:** Special pricing and features for corporate and bulk purchases
- **Analytics Dashboard:** Advanced analytics for sellers and admins with insights
- **Social Integration:** Share purchases and reviews on social media platforms

---

## Chapter 11: Abbreviations and Acronyms

| Acronym | Full Form |
|---------|-----------|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| RBAC | Role-Based Access Control |
| JWT | JSON Web Token |
| HTTPS | HyperText Transfer Protocol Secure |
| SSL | Secure Sockets Layer |
| PCI DSS | Payment Card Industry Data Security Standard |
| CRUD | Create, Read, Update, Delete |
| UI/UX | User Interface / User Experience |
| SEO | Search Engine Optimization |
| CDN | Content Delivery Network |
| SMS | Short Message Service |
| PWA | Progressive Web App |
| CSV | Comma-Separated Values |
| PDF | Portable Document Format |
| WCAG | Web Content Accessibility Guidelines |
| HTML | HyperText Markup Language |
| CSS | Cascading Style Sheets |
| REST | Representational State Transfer |
| OAuth | Open Authorization |
| SQL | Structured Query Language |
| DB | Database |
| DBMS | Database Management System |
| URL | Uniform Resource Locator |
| CMS | Content Management System |
| OTP | One-Time Password |
| 2FA | Two-Factor Authentication |
| CSRF | Cross-Site Request Forgery |
| XSS | Cross-Site Scripting |
| RAM | Random Access Memory |
| CPU | Central Processing Unit |
| SSD | Solid State Drive |
| Mbps | Megabits per second |
| GB | Gigabytes |

---

## Chapter 12: Bibliography / References

1. **React.js Documentation** - https://react.dev
2. **Node.js & Express.js** - https://nodejs.org / https://expressjs.com
3. **MongoDB Documentation** - https://www.mongodb.com/docs
4. **Razorpay API Documentation** - https://razorpay.com/docs/api
5. **Stripe API Documentation** - https://stripe.com/docs/api
6. **Cloudinary API** - https://cloudinary.com/documentation
7. **Tailwind CSS** - https://tailwindcss.com
8. **Vite Documentation** - https://vitejs.dev
9. **JWT.io** - https://jwt.io
10. **bcryptjs Documentation** - https://www.npmjs.com/package/bcryptjs
11. **OWASP Security Guidelines** - https://owasp.org
12. **GitHub** - https://github.com
13. **Stack Overflow** - https://stackoverflow.com
14. **ChatGPT (OpenAI)** - https://openai.com/chatgpt
15. **GitHub Copilot** - https://github.com/features/copilot
16. **W3C Web Standards** - https://www.w3.org
17. **MDN Web Docs** - https://developer.mozilla.org
18. **Postman API Documentation** - https://www.postman.com
19. **Docker Documentation** - https://www.docker.com/resources/what-is-docker
20. **AWS & Cloud Services** - https://aws.amazon.com

---

## Document Information

- **Project Name:** LapHub – Premium E-Commerce Platform for Laptop & Computer Hardware
- **Document Type:** Software Requirements Specification (SRS)
- **Version:** 1.0
- **Last Updated:** October 2025
- **Status:** Final
- **Author:** Development Team
- **Confidentiality:** Internal Use

---

**End of Document**
