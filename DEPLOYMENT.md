# Deploy FutureSim AI

This repository is a monorepo: client/ is the Vite frontend and server/ is the Express API.

## MongoDB Atlas

Create a database user, copy its connection string, and allow Render to connect in Atlas Network Access (for an MVP, 0.0.0.0/0). URL-encode the database password in the URI.

## Render API

Push the repository to GitHub and create a Render Blueprint. Root render.yaml selects server/, runs npm ci, starts the API, and checks /api/health.

Set MONGODB_URI to the Atlas URI. Set CLIENT_ORIGIN to http://localhost:5173 initially, then replace it with the exact Vercel URL after frontend deployment. GEMINI_API_KEY is optional; without it, simulations use the built-in rules fallback. Render generates JWT_SECRET.

Confirm https://<render-service>/api/health returns { "ok": true }.

## Vercel frontend

Import the same GitHub repo in Vercel and set Root Directory to client. Add VITE_API_URL=https://<render-service> (no trailing slash) before deploying. client/vercel.json makes React Router refreshes work.

## Connect services

Set Render's CLIENT_ORIGIN to the final exact Vercel production URL, then redeploy Render. Multiple allowed origins may be comma-separated for previews. Test signup, login, simulation, and assistant in an incognito window.

Never commit .env files or database/API secrets.




simranjaiswal
mongodb+srv://simranjaiswal801_db_user:simranjaiswal@cluster0.yputqar.mongodb.net/