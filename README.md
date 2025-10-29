# React-User-Registration

## Features

- User registration and login (NestJS backend + React frontend)
- Form validation, error handling, and success feedback
- API integration via React Query and Axios
- Environment variable for backend URL (`frontend/.env`)

## Getting Started

### Backend

```bash
cd backend
npm install
npm run start:dev
```

- Database: PostgreSQL (NeonDB recommended)
- Configure connection in `backend/.env` and `prisma/schema.prisma`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Configure backend API URL in `frontend/.env` (default: http://localhost:3000)

### Usage

- Register a new user at `/signup`
- Login at `/login`
- On success, redirected to `/home` with feedback

## Deployment

- Change `VITE_BACKEND_API_URL` in `frontend/.env` to your deployed backend URL
- Change database connection string in `backend/.env` for production

## Tech Stack

- Backend: NestJS, Prisma, PostgreSQL
- Frontend: React, React Query, React Hook Form, Tailwind CSS
