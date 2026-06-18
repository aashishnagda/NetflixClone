# Deployment Guide

This project has a React frontend (`frontend/`) and an Express backend (`backend/`). The backend can serve the built frontend after production build.

## 1. Local production build

### Backend
1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` with values:
   ```env
   PORT=5000
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` or use `VITE_API_URL` for production only if backend is on another origin.
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Build the frontend:
   ```bash
   npm run build
   ```

## 2. Recommended deployment flow

### Option A: Host both on one server
1. Build frontend in `frontend/`.
2. Deploy backend and copy `frontend/dist` to the server.
3. Start backend; it will serve `dist` automatically.

### Option B: Host frontend and backend separately
1. Set `VITE_API_URL` to the backend base URL in frontend deployment.
2. Make sure CORS is enabled on backend (already present).
3. Deploy frontend and backend independently.

## 3. What this repo uses
- Backend: `backend/index.js`, Express, Mongoose, JWT auth
- Frontend: `frontend/`, React, Vite, fetch requests to `api/auth`

## 4. Deployment notes
- If backend and frontend are on the same host, leave `VITE_API_URL` blank.
- If backend runs on a different domain, set `VITE_API_URL` to the backend URL.
- The backend now serves the frontend `dist` when present.
- Keep `.env` values secret; don’t commit them.
