# 🧠 FutureSim AI

> AI-Powered Decision Intelligence Platform built using the MERN Stack.

FutureSim AI is a full-stack web application that helps users make better decisions by simulating different future outcomes. Whether it's choosing a career, planning education, starting a business, managing finances, or achieving health goals, the platform provides AI-assisted predictions, risk analysis, and personalized action plans.

---

## 🚀 Live Demo

### Frontend
https://futuresim-ai-three.vercel.app/

### Backend API
https://futuresim-api.onrender.com

---

## 📌 Project Overview

Making important life decisions is difficult because people often don't know the possible outcomes before taking action.

FutureSim AI solves this problem by allowing users to simulate different scenarios and analyze potential results using intelligent decision logic.

The platform provides:

- AI-powered decision simulation
- Success probability
- Risk analysis
- Personalized recommendations
- Simulation history
- Secure authentication

---

# ❓ Problem Statement

People often make important decisions based on assumptions rather than analysis.

Examples include:

- Choosing a career
- Selecting higher education
- Starting a business
- Financial planning
- Health planning

There is no simple platform that allows users to compare different future possibilities before making these decisions.

---

# 💡 Solution

FutureSim AI provides an intelligent simulation platform where users can:

- Enter their goals
- Provide current information
- Simulate future outcomes
- Analyze risks
- Receive AI-generated suggestions
- Save previous simulations

---

# 🎯 Objectives

- Build an AI-powered decision support platform
- Help users make informed decisions
- Compare multiple future scenarios
- Reduce uncertainty
- Provide personalized recommendations
- Store decision history securely
- Learn Full Stack MERN Development

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption
- Protected Routes

---

## 🤖 AI Decision Simulator

Supports multiple categories:

- Career
- Education
- Business
- Finance
- Health
- Custom

Every simulation provides:

- Success Probability
- Confidence Score
- Risk Level
- Timeline
- Readiness Score
- Personalized Recommendations

---

## 📊 Dashboard

- Total Simulations
- Recent Activity
- Saved Reports
- AI Insights

---

## 📂 Simulation History

- View Previous Simulations
- Replay Decisions
- Save Reports
- Track Progress

---

## 👤 User Profile

- Update Profile
- View Statistics
- Local Workspace

---

## 🤖 AI Assistant

Interactive assistant that helps users:

- Improve decision quality
- Answer questions
- Suggest better planning
- Guide simulations

---

# 🏗 Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- React Icons
- CSS
- Framer Motion

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication

- JWT
- Bcrypt.js

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📁 Project Structure

```
FutureSim-AI/

├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   └── index.js
│
├── public/
├── package.json
└── README.md
```

---

# 🔄 Workflow

```
User Login/Register
        │
        ▼
Dashboard
        │
        ▼
Choose Category
        │
        ▼
Enter Details
        │
        ▼
AI Simulation
        │
        ▼
Risk Analysis
        │
        ▼
Recommendations
        │
        ▼
Save Report
        │
        ▼
History
```

---

# 🗄 Database Collections

## Users

```
_id
name
email
passwordHash
createdAt
```

## Simulations

```
_id
user
title
category
answers
result
favorite
createdAt
updatedAt
```

---

# 🌐 REST APIs

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Profile

```
GET /api/profile
PATCH /api/profile
```

### Simulations

```
GET /api/simulations
POST /api/simulations
PATCH /api/simulations/:id
DELETE /api/simulations/:id
```

### AI Assistant

```
POST /api/assistant
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected APIs
- Environment Variables
- MongoDB Atlas Cloud Database

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/FutureSim-AI.git
```

Move into project

```bash
cd FutureSim-AI
```

Install dependencies

```bash
npm install
```

Create a `.env` file inside the `server` folder

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_ORIGIN=http://localhost:5173

GEMINI_API_KEY=your_api_key
```

Run Backend

```bash
npm run server
```

Run Frontend

```bash
npm run dev
```

---

# 🚀 Future Enhancements

- Gemini AI Integration
- Voice Assistant
- PDF Report Generation
- Email Notifications
- Google Login
- Dark Mode
- Decision Comparison Charts
- Mobile App
- Admin Dashboard
- AI Analytics

---

# 📸 Screenshots

Add screenshots here:

- Home Page
- Login Page
- Signup Page
- Dashboard
- Simulator
- Result Page
- History
- Profile

---

# 👩‍💻 Developer

**Simran Jaiswal**


GitHub:
https://github.com/simranjaiswal801

---

# ⭐ Support

If you like this project, don't forget to **Star ⭐ the repository**.

---

# 📜 License

This project is developed for educational and learning purposes.
