# Money Manager Backend

Backend API for Money Manager application built with Node.js, Express, and MongoDB.

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Running the Application

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

Refer to `API_Documentation.md` in the root directory for complete API documentation.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- cookie-parser for cookie handling
- CORS for cross-origin requests