# Champaran Food Services - Project Structure Documentation

## Overview
This project is organized using a role-based architecture that separates components, pages, and services according to user roles. The structure ensures better maintainability, scalability, and clear separation of concerns.

## Project Structure

```
Champaran-Food-Services/
├── public/                          # Static assets
├── src/
│   ├── components/                  # Shared components
│   │   ├── Categories.jsx
│   │   ├── CreateStoreModal.jsx
│   │   ├── CreateUserModal.jsx
│   │   ├── DashboardHeader.jsx
│   │   ├── EditStoreModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Icons.jsx
│   │   ├── Loading.jsx
│   │   ├── Offers.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Services.jsx
│   │   ├── SideMenu.jsx
│   │   └── SpriteIcons.jsx
│   ├── contexts/                    # React contexts
│   │   └── ThemeContext.jsx
│   ├── i18n/                        # Internationalization
│   │   └── i18n.jsx
│   ├── layouts/                     # Layout components
│   │   ├── PrivateLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/                       # General pages
│   │   ├── AboutPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── CreateStore.jsx
│   │   ├── CreateUser.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── OffersPage.jsx
│   │   ├── RoleDashboard.jsx
│   │   ├── StoreManagement.jsx
│   │   ├── StoresPage.jsx
│   │   └── UserManagement.jsx
│   ├── roles/                       # Role-based organization
│   │   ├── super-admin/             # Super Admin role
│   │   │   ├── components/
│   │   │   │   └── SuperAdminHeader.jsx
│   │   │   ├── pages/
│   │   │   │   └── SuperAdminDashboard.jsx
│   │   │   └── services/
│   │   │       └── superAdminServices.js
│   │   ├── admin/                   # Admin role
│   │   │   ├── components/
│   │   │   │   └── AdminHeader.jsx
│   │   │   ├── pages/
│   │   │   │   └── AdminDashboard.jsx
│   │   │   └── services/
│   │   │       └── adminServices.js
│   │   ├── manager/                 # Manager role
│   │   │   ├── components/
│   │   │   │   └── ManagerHeader.jsx
│   │   │   ├── pages/
│   │   │   │   └── ManagerDashboard.jsx
│   │   │   └── services/
│   │   │       └── managerServices.js
│   │   ├── salesman/                # Salesman role
│   │   │   ├── components/
│   │   │   │   └── SalesmanHeader.jsx
│   │   │   ├── pages/
│   │   │   │   └── SalesmanDashboard.jsx
│   │   │   └── services/
│   │   │       └── salesmanServices.js
│   │   ├── purchase/                # Purchase Manager role
│   │   │   ├── components/
│   │   │   │   └── PurchaseHeader.jsx
│   │   │   ├── pages/
│   │   │   │   └── PurchaseDashboard.jsx
│   │   │   └── services/
│   │   │       └── purchaseServices.js
│   │   └── user/                    # User role
│   │       ├── components/
│   │       │   └── UserHeader.jsx
│   │       ├── pages/
│   │       │   └── UserDashboard.jsx
│   │       └── services/
│   │           └── userServices.js
│   ├── routes/                      # Routing configuration
│   │   └── AllRoutes.jsx
│   ├── services/                    # Shared services
│   │   ├── apiServices.jsx
│   │   ├── coreServices.jsx
│   │   └── loginUtility.js
│   ├── App.jsx                      # Main App component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Entry point
├── package.json                     # Dependencies
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite configuration
└── README.md                        # Project documentation
```

## Role-Based Architecture

### 1. Super Admin Role (`/roles/super-admin/`)
**Responsibilities:**
- System-wide administration
- User management across all stores
- System settings and configuration
- Audit logs and system monitoring
- Creating and managing admin users

**Components:**
- `SuperAdminHeader.jsx` - Header component with system status
- `SuperAdminDashboard.jsx` - Main dashboard with system-wide metrics

**Services:**
- `superAdminServices.js` - API calls for system administration

**Key Features:**
- System statistics overview
- User management across all stores
- System logs and audit trails
- Global settings management
- Admin user creation

### 2. Admin Role (`/roles/admin/`)
**Responsibilities:**
- Store-specific administration
- Managing store users and permissions
- Store-level reporting and analytics
- Inventory management for assigned stores

**Components:**
- `AdminHeader.jsx` - Header component with store status
- `AdminDashboard.jsx` - Store-focused dashboard

**Services:**
- `adminServices.js` - API calls for store administration

**Key Features:**
- Store statistics and performance
- Store user management
- Store-specific reports
- Inventory management
- Store settings

### 3. Manager Role (`/roles/manager/`)
**Responsibilities:**
- Team performance monitoring
- Sales and purchase oversight
- Inventory management
- Team target setting and tracking

**Components:**
- `ManagerHeader.jsx` - Header component with team performance
- `ManagerDashboard.jsx` - Team and operations dashboard

**Services:**
- `managerServices.js` - API calls for management functions

**Key Features:**
- Team performance metrics
- Sales and purchase reports
- Inventory status monitoring
- Team target management
- Operational analytics

### 4. Salesman Role (`/roles/salesman/`)
**Responsibilities:**
- Customer relationship management
- Sales target tracking
- Product catalog access
- Sales history and reporting

**Components:**
- `SalesmanHeader.jsx` - Header component with sales targets
- `SalesmanDashboard.jsx` - Sales-focused dashboard

**Services:**
- `salesmanServices.js` - API calls for sales functions

**Key Features:**
- Sales target tracking
- Customer management
- Product catalog
- Sales history
- Performance metrics

### 5. Purchase Manager Role (`/roles/purchase/`)
**Responsibilities:**
- Supplier management
- Purchase order creation
- Budget tracking
- Inventory procurement

**Components:**
- `PurchaseHeader.jsx` - Header component with budget status
- `PurchaseDashboard.jsx` - Purchase-focused dashboard

**Services:**
- `purchaseServices.js` - API calls for purchase functions

**Key Features:**
- Purchase target tracking
- Supplier management
- Budget monitoring
- Purchase history
- Inventory needs analysis

### 6. User Role (`/roles/user/`)
**Responsibilities:**
- Order placement and tracking
- Profile management
- Product browsing
- Order history

**Components:**
- `UserHeader.jsx` - Header component with account status
- `UserDashboard.jsx` - User-focused dashboard

**Services:**
- `userServices.js` - API calls for user functions

**Key Features:**
- Order management
- Product browsing
- Profile management
- Order tracking
- Notifications

## Shared Components

### Core Components (`/components/`)
- **Header.jsx** - Main navigation header
- **Footer.jsx** - Site footer
- **Loading.jsx** - Loading spinner component
- **ProtectedRoute.jsx** - Route protection wrapper
- **SideMenu.jsx** - Navigation sidebar
- **SpriteIcons.jsx** - Icon component library

### Layout Components (`/layouts/`)
- **PublicLayout.jsx** - Layout for public pages
- **PrivateLayout.jsx** - Layout for authenticated pages

### Shared Services (`/services/`)
- **apiServices.jsx** - Base API service
- **coreServices.jsx** - Core authentication and user services
- **loginUtility.js** - Login utility functions

## Routing Structure

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/categories` - Product categories
- `/offers` - Current offers
- `/about` - About page
- `/contact` - Contact page

### Protected Routes (Role-based)
- `/dashboard/super-admin` - Super Admin dashboard
- `/dashboard/admin` - Admin dashboard
- `/dashboard/manager` - Manager dashboard
- `/dashboard/salesman` - Salesman dashboard
- `/dashboard/purchase` - Purchase Manager dashboard
- `/dashboard/user` - User dashboard

### Management Routes
- `/dashboard/user-management` - User management
- `/dashboard/create-user` - Create new user
- `/dashboard/store-management` - Store management
- `/dashboard/stores` - Store listing
- `/dashboard/create-store` - Create new store

## Authentication & Authorization

### User Roles Hierarchy
1. **Super Admin** - Highest level access
2. **Admin** - Store-level administration
3. **Manager** - Team and operations management
4. **Salesman** - Sales operations
5. **Purchase Manager** - Purchase operations
6. **User** - Basic user access

### Permission System
- Role-based access control
- Route protection based on user roles
- Component-level permission checks
- API endpoint authorization

## Development Guidelines

### Adding New Features
1. **Identify the role** that will use the feature
2. **Create components** in the appropriate role folder
3. **Add services** for API calls in the role's services folder
4. **Update routes** in AllRoutes.jsx if needed
5. **Test permissions** and access control

### File Naming Conventions
- **Components**: PascalCase (e.g., `SuperAdminHeader.jsx`)
- **Services**: camelCase (e.g., `superAdminServices.js`)
- **Pages**: PascalCase (e.g., `SuperAdminDashboard.jsx`)

### Import Paths
- Use relative paths from the current file
- Shared components: `../../../components/ComponentName`
- Shared services: `../../../services/serviceName`
- Role-specific components: `../components/ComponentName`

## API Integration

### Base API Service
All API calls go through the base `apiServices.jsx` which handles:
- Request/response interceptors
- Error handling
- Authentication headers
- Base URL configuration

### Role-Specific Services
Each role has its own service file containing:
- Role-specific API endpoints
- Data transformation functions
- Error handling specific to the role's needs

## Styling & UI

### Design System
- **Tailwind CSS** for styling
- **Dark mode** support
- **Responsive design** for all screen sizes
- **Consistent color scheme** per role

### Role-Specific Colors
- **Super Admin**: Red gradient
- **Admin**: Purple gradient
- **Manager**: Blue gradient
- **Salesman**: Green gradient
- **Purchase**: Orange gradient
- **User**: Indigo gradient

## Testing & Quality Assurance

### Code Organization
- **Separation of concerns** by role
- **Reusable components** in shared folders
- **Consistent naming** conventions
- **Clear import paths**

### Performance Considerations
- **Lazy loading** for route components
- **Code splitting** by role
- **Optimized bundle** sizes
- **Efficient re-renders**

## Deployment & Maintenance

### Build Process
- **Vite** for fast development and building
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **Tailwind CSS** for utility-first styling

### Environment Configuration
- **Development** and **production** environments
- **API endpoint** configuration
- **Authentication** settings
- **Feature flags** for role-based features

## Future Enhancements

### Planned Features
1. **Advanced reporting** for each role
2. **Real-time notifications** system
3. **Mobile app** integration
4. **Advanced analytics** dashboard
5. **Multi-language** support expansion

### Scalability Considerations
- **Microservices** architecture preparation
- **Database optimization** for large datasets
- **Caching strategies** for better performance
- **CDN integration** for static assets

---

This documentation provides a comprehensive overview of the project structure and serves as a guide for developers working on the Champaran Food Services application.
