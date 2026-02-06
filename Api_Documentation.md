# Money Manager API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in HTTP-only cookie named `token`

---

## Auth Routes

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 3. Logout User
**POST** `/auth/logout`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User
**GET** `/auth/me`

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Transaction Routes

### 5. Create Transaction
**POST** `/transactions`

**Request Body:**
```json
{
  "type": "expense",
  "amount": 5000,
  "category": "food",
  "division": "personal",
  "account": "cash",
  "description": "Grocery shopping",
  "date": "2026-02-06T10:30:00.000Z"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "transaction": {
    "id": "transactionId",
    "type": "expense",
    "amount": 5000,
    "category": "food",
    "division": "personal",
    "account": "cash",
    "description": "Grocery shopping",
    "date": "2026-02-06T10:30:00.000Z",
    "userId": "userId",
    "createdAt": "2026-02-06T10:30:00.000Z"
  }
}
```

---

### 6. Get All Transactions
**GET** `/transactions?period=monthly&month=2&year=2026&division=personal&category=food&account=cash&startDate=2026-02-01&endDate=2026-02-28`

**Query Parameters:**
- `period`: weekly | monthly | yearly | custom
- `month`: 1-12 (for monthly)
- `year`: YYYY (for yearly/monthly)
- `week`: 1-53 (for weekly)
- `division`: personal | office
- `category`: food | fuel | movie | loan | medical | salary | freelance | investment | other
- `account`: cash | bank | credit-card | savings
- `startDate`: ISO date (for custom range)
- `endDate`: ISO date (for custom range)

**Response:** `200 OK`
```json
{
  "success": true,
  "transactions": [
    {
      "id": "transactionId",
      "type": "expense",
      "amount": 5000,
      "category": "food",
      "division": "personal",
      "account": "cash",
      "description": "Grocery shopping",
      "date": "2026-02-06T10:30:00.000Z",
      "createdAt": "2026-02-06T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 7. Get Transaction by ID
**GET** `/transactions/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "transaction": {
    "id": "transactionId",
    "type": "expense",
    "amount": 5000,
    "category": "food",
    "division": "personal",
    "account": "cash",
    "description": "Grocery shopping",
    "date": "2026-02-06T10:30:00.000Z"
  }
}
```

---

### 8. Update Transaction
**PUT** `/transactions/:id`

**Request Body:**
```json
{
  "amount": 5500,
  "description": "Updated grocery shopping"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Transaction updated successfully",
  "transaction": {
    "id": "transactionId",
    "amount": 5500,
    "description": "Updated grocery shopping"
  }
}
```

**Note:** Can only update within 12 hours of creation

---

### 9. Delete Transaction
**DELETE** `/transactions/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

### 10. Get Dashboard Summary
**GET** `/transactions/summary?period=monthly&month=2&year=2026`

**Query Parameters:**
- Same as Get All Transactions

**Response:** `200 OK`
```json
{
  "success": true,
  "summary": {
    "totalIncome": 50000,
    "totalExpense": 30000,
    "balance": 20000,
    "accountBalances": {
      "cash": 5000,
      "bank": 10000,
      "credit-card": -2000,
      "savings": 7000
    },
    "categoryBreakdown": {
      "food": 5000,
      "fuel": 3000,
      "salary": 50000
    },
    "divisionBreakdown": {
      "personal": 20000,
      "office": 10000
    }
  }
}
```

---

### 11. Get Transaction History
**GET** `/transactions/history?limit=50&page=1`

**Query Parameters:**
- `limit`: Number of transactions per page (default: 50)
- `page`: Page number (default: 1)

**Response:** `200 OK`
```json
{
  "success": true,
  "transactions": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 2,
    "limit": 50
  }
}
```

---

### 12. Transfer Between Accounts
**POST** `/transactions/transfer`

**Request Body:**
```json
{
  "fromAccount": "cash",
  "toAccount": "bank",
  "amount": 5000,
  "description": "Transfer to savings",
  "date": "2026-02-06T10:30:00.000Z"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Transfer completed successfully",
  "transactions": [
    {
      "id": "transactionId1",
      "type": "transfer-out",
      "account": "cash",
      "amount": 5000
    },
    {
      "id": "transactionId2",
      "type": "transfer-in",
      "account": "bank",
      "amount": 5000
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Cannot edit transaction after 12 hours"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error occurred"
}
```

---

## Data Models

### User
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string (hashed)",
  "createdAt": "date"
}
```

### Transaction
```json
{
  "id": "string",
  "userId": "string",
  "type": "income | expense | transfer-in | transfer-out",
  "amount": "number",
  "category": "string",
  "division": "personal | office",
  "account": "cash | bank | credit-card | savings",
  "description": "string",
  "date": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## Categories

### Income Categories
- salary
- freelance
- investment
- other

### Expense Categories
- food
- fuel
- movie
- loan
- medical
- shopping
- utilities
- transport
- other

### Divisions
- personal
- office

### Accounts
- cash
- bank
- credit-card
- savings