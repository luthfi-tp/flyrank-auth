# FlyRank Auth API

Authentication API built with **Node.js, Express.js, and Supabase Auth**.

## Features

- User signup
- User login
- JWT access-token verification
- Protected routes
- Reusable authentication middleware
- User profile endpoint
- Protected dashboard endpoint
- Logout
- Refresh token
- Swagger API documentation

## Tech Stack

- Node.js
- Express.js
- Supabase Auth
- Swagger / OpenAPI
- JavaScript

## Project Structure

```text
flyrank-auth/
├── src/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── protected.js
│   ├── server.js
│   ├── supabase.js
│   └── swagger.js
├── .env
├── .gitignore
├── package.json
└── README.md