# SK Pot Biryani CMS

A modern React-based Content Management System for managing SK Pot Biryani restaurant operations.

## Features

- **Authentication**: OTP-based login system
- **Food Management**: Add, edit, delete food items with image uploads
- **Order Management**: View and manage customer orders
- **Partner Management**: Manage delivery partners
- **Dashboard**: Overview of key metrics

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The CMS will be available at `http://localhost:3004`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── axios.js              # HTTP client configuration
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar
│   └── Topbar.jsx            # Top navigation bar
├── contexts/
│   └── AuthContext.jsx       # Authentication context
├── pages/
│   ├── LoginPhone.jsx        # Phone login page
│   ├── OtpVerify.jsx         # OTP verification page
│   ├── Dashboard.jsx         # Main dashboard
│   ├── FoodList.jsx          # Food items management
│   ├── FoodForm.jsx          # Add/Edit food form
│   ├── Orders.jsx            # Orders management
│   └── Partners.jsx          # Partners management
├── styles/                    # Additional styles (if needed)
├── App.jsx                   # Main app component
└── main.jsx                  # App entry point
```

## API Integration

The CMS integrates with the backend API running on `http://localhost:3000`. Make sure the backend is running before using the CMS.

Key API endpoints:
- `/api/auth/*` - Authentication
- `/api/food/*` - Food management
- `/api/orders/*` - Order management
- `/api/partners/*` - Partner management

## Features Overview

### Authentication Flow
1. Enter phone number on login page
2. Receive OTP (check console in development)
3. Verify OTP to access the CMS

### Food Management
- View all food items in a table
- Add new items with images (up to 6 images)
- Edit existing items
- Manage stock levels (stock in/out)
- Delete items

### Order Management
- View all orders with customer details
- Accept or cancel pending orders
- View order status and assigned partners

### Partner Management
- Add new delivery partners
- Edit partner information
- View partner status (active/inactive)
- Delete partners

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

This project uses ESLint for code linting. Make sure to run `npm run lint` before committing changes.

## Contributing

1. Follow the existing code structure
2. Use meaningful component and function names
3. Add proper error handling
4. Test your changes thoroughly

## License

This project is private and proprietary to SK Pot Biryani.