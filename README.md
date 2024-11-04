# Project Description

A web application that allows users to manage a list of titles with user authentication and MetaMask integration. This application includes functionality for users to add, view, and delete titles after logging in and connecting their MetaMask wallet.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Future Improvements](#future-improvements)

---

## Features

1. **User Authentication**
   - Login and registration functionality with JWT-based session management.
2. **Title Management**
   - View, add, and delete titles in a user dashboard.
3. **MetaMask Integration**
   - Connect MetaMask wallet to access title management.
4. **Responsive Design**
   - Clean and user-friendly interface with responsive layout.

---

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Context API
- **Styling**: Tailwind CSS
- **Form Handling Validation**: Zod & React hook form
- **Testing**: Vitest and React Testing Library

---

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or above)
- **MetaMask** (for wallet integration)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/praizerema/gp-vote-task.git
   cd gp-vote-task
   yarn
   ```
2. **Start your app**: 
```bash
   yarn run dev
```
Runs the app in development mode. Open http://localhost:5173 to view it in the browser

---

## Environment Variables

**Create your env file using the .env.sample file as guid**: The required api url is <http://localhost:8000/api/v1>

---

## Available Scripts
```bash
yarn run dev
yarn test
yarn run build
yarn run lint
```



## API Documentation
The application communicates with a backend API for user authentication and title management. Below are the main endpoints used:

**User Registration** - POST /auth/register
```bash
Request: { email, password, username }
Response: { message, user }
```
**User Login** - POST /auth/login
```bash
Request: { email, password }
Response: { token }
```

**Get All Titles** - GET /title
```bash
Headers: Authorization: Bearer <token>
Response: [ { id, title, user } ]
```
**Create Title** - POST /title
```bash
Headers: Authorization: Bearer <token>
Request: { title }
Response: { message, title }
```

**Delete Title** - DELETE /title
```bash
Headers: Authorization: Bearer <token>
Response: { message }
```

## Future Improvements

- **Enhanced Error Handling**: Add custom error messages for more specific error types, especially during MetaMask integration and API requests.
- **Comprehensive Analytics**: Include metrics for user engagement, title trends, and other analytics within the dashboard.

