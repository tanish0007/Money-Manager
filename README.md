# Money Manager - Full Stack Application

A comprehensive money management web application to track income, expenses, and manage multiple financial accounts with detailed analytics and reporting.

## Features

- **User Authentication**: Secure registration and login with JWT
- **Transaction Management**: Track income and expenses with detailed categorization
- **Multiple Accounts**: Manage Cash, Bank, Credit Card, and Savings accounts
- **Category System**: Organize transactions by personal or office use
- **Time-based Filters**: View data by weekly, monthly, yearly, or custom date ranges
- **Visual Analytics**: Dashboard with charts showing spending patterns and category breakdowns
- **Account Transfers**: Transfer money between different accounts
- **Edit Protection**: Transactions can only be edited within 12 hours of creation
- **Dark Mode**: Full dark mode support throughout the application
- **Responsive Design**: Mobile-friendly interface with hamburger menu for small screens

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- Cookie-parser for session management

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS v4 for styling
- Chart.js for data visualization
- Axios for API requests
- React Hot Toast for notifications
- Lucide React for icons

## Project Structure

```
money-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── TransactionModal.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Overview.jsx
│   │   │   └── Transactions.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── API_Documentation.md
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Documentation

Refer to `API_Documentation.md` for detailed API endpoints, request/response formats, and authentication requirements.

## Usage

1. **Register/Login**: Create an account or log in to access the dashboard
2. **Add Transactions**: Click the "+" button to add income or expenses
3. **View Dashboard**: See your financial overview with charts and account balances
4. **Filter Data**: Use period filters (weekly/monthly/yearly/custom) to view specific timeframes
5. **Manage Transactions**: Edit transactions within 12 hours or delete them anytime
6. **Track Accounts**: Monitor balances across Cash, Bank, Credit Card, and Savings
7. **Toggle Theme**: Switch between light and dark modes for comfortable viewing

## Key Features Explained

### Categories
- **Income**: Salary, Freelance, Investment, Other
- **Expense**: Food, Fuel, Movie, Loan, Medical, Shopping, Utilities, Transport, Other

### Divisions
- **Personal**: For personal expenses and income
- **Office**: For work-related transactions

### Accounts
- **Cash**: Physical cash transactions
- **Bank**: Bank account transactions
- **Credit Card**: Credit card purchases
- **Savings**: Savings account transactions

### Time Filters
- **Weekly**: Current week's data
- **Monthly**: Current month's data
- **Yearly**: Current year's data
- **Custom**: Select specific date range

## Deployment

### Backend Deployment
Deploy to platforms like:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

### Frontend Deployment
Deploy to platforms like:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Environment Variables for Production
Update all URLs in environment files to production URLs and ensure:
- `NODE_ENV=production` in backend
- Secure JWT secret
- CORS configured for production frontend URL
- HTTPS enabled

## Contributing

This is a hackathon project. Feel free to fork and customize for your needs.

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.