# Task Management System

A full-stack task management app where users can create, assign, and track tasks. It uses React on the frontend with Material UI and Ant Design components, and an Express/MongoDB backend with JWT-based authentication using Passport.

## What it does

- Register and log in with JWT authentication
- Create tasks and assign them to users
- Track the status of tasks (open, in progress, done)
- Upload files attached to tasks using Multer
- View and manage tasks from a clean dashboard

## Tech stack

**Frontend** — React 18, React Router, Axios, Material UI, Ant Design, React Toastify

**Backend** — Node.js, Express, MongoDB (Mongoose)

**Auth** — Passport.js, JWT, bcryptjs

**File uploads** — Multer

## Project structure

```
Task-Management-System/
├── clients/    # React app (CRA, MUI, Ant Design)
└── server/     # Express API (routes, controllers, models, middleware)
```

## Getting started

### Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

Then run:

```bash
node Index.js
```

### Frontend

```bash
cd clients
npm install
npm start
```

The frontend runs on `http://localhost:3000` and proxies API calls to the backend at `http://localhost:3001`.
