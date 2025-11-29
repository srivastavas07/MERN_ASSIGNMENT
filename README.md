# MERN CRUD Task

Simple CRUD application created for Afreen's assignment. The project uses the MERN stack with a lightweight Express API and a Vite + React frontend.

## Features

- Create, read, update, and delete items with `title`, `description`, and `isActive`.
- Pagination with next/previous navigation.
- Page size selector (5, 10, 20).
- Sorting by `title` or `createdAt`.
- Clean UI with inline validation and status toasts.

## Project Structure

```
.
├── client  # React frontend (Vite)
└── server  # Express + MongoDB backend
```

## Prerequisites

- Node.js 18+
- MongoDB instance (local or hosted)

## Backend Setup

```bash
cd "/Users/srivastavas07/Desktop/MERN ASSIGNMENT/server"
cp env.example .env   # adjust Mongo URL if needed
npm install
npm run dev
```

Environment variables (`server/env.example`):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_crud
```

## Frontend Setup

```bash
cd "/Users/srivastavas07/Desktop/MERN ASSIGNMENT/client"
cp env.example .env   # optional, defaults to localhost
npm install
npm run dev
```

By default the React app expects the API at `http://localhost:5000/api`. Update `VITE_API_URL` if you expose the backend elsewhere.

## API Overview

- `POST /api/items` – create item
- `GET /api/items?page=1&limit=5&sort=title:asc` – list items with pagination, limit, and sorting
- `GET /api/items/:id` – fetch single item
- `PUT /api/items/:id` – update
- `DELETE /api/items/:id` – delete

## Development Notes

- `npm run dev` on the server uses Nodemon for reloads.
- Client uses Vite for instant HMR.
- No extra UI libraries were added to keep the bundle small and easy to reason about.

## Future Enhancements

- Add text search/filtering on the list view.
- Persist notifications or use a snackbar component.
- Add automated tests for controllers and React components.

## Screen shot of application

<img width="1439" height="863" alt="Screenshot 2025-11-29 at 3 54 41 PM" src="https://github.com/user-attachments/assets/e694b9cc-36a3-4688-9d3e-cc77116a5c4e" />
