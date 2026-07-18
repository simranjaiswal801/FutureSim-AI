# FutureSim AI — Project Documentation

## 1. Project overview

FutureSim AI is a decision-intelligence web application. It helps a user explore an important decision—such as a career switch, course selection, business idea, financial goal, or health goal—through structured inputs and a visual decision report.

The current product is a **fully working frontend-first application**. It does not require login or a database to use its core flow. Simulations, reports, plans, notes, and progress are saved in the browser using `localStorage`.

The repository also contains an Express + MongoDB backend with JWT authentication APIs. The frontend deliberately does not depend on it at the moment, because authentication was kept out of scope. It can be connected later.

## 2. What the application does

1. User opens the landing page and understands the product.
2. User starts a new simulation without logging in.
3. User chooses a decision category and completes a category-aware form.
4. A local rules engine calculates probability, confidence, readiness, risk, and estimated time.
5. The app displays multiple outcomes, visualisations, recommendations, timeline, skill gaps, and comparison data.
6. User can save a report, print it as PDF, update milestones, use decision tools, and replay actual progress later.
7. All data remains available in browser history until the user clears local simulations.

## 3. Implemented features

### Landing page

- Modern hero area with FutureSim visual identity.
- Product categories ticker.
- How-it-works section.
- Feature highlights.
- Testimonial.
- Expandable FAQ.
- Contact call-to-action.

### Dashboard

- Total number of simulations.
- Average success probability.
- Saved report count.
- Recent simulations, which open their saved result.
- Quick action to create a new simulation.

### AI simulation workflow

- Categories: Career, Education, Business, Finance, Health, and Custom.
- Dynamic labels based on the chosen category.
- Risk preference: Low, Medium, High.
- Voice input for a goal using the browser Web Speech API (best supported in Chrome).
- Local analysis engine based on form completeness, listed skills, risk preference, and category.

### Analysis result

- Success probability.
- AI confidence score.
- Readiness score.
- Risk level.
- Estimated time.
- Visual projected outcome chart.
- What-If slider that recalculates the scenario for extra weekly effort.
- AI recommendations.
- Four-stage future timeline: 3 months, 6 months, 1 year, and 5 years.
- Skill gap bars.
- Best-case, likely-path, and challenge-case outcomes.
- Decision-tree visualisation.
- Current-path vs alternative-path comparison.

### Execution and progress

- Save/unsave report.
- Print report window; choose **Save as PDF** in the browser print dialog.
- Action Plan / Milestone Tracker with persisted completion status.
- History page with category filtering.
- Prediction vs Reality replay: users can add actual progress to an earlier simulation.
- Profile screen with editable local display name and activity statistics.

### AI assistant and unique decision tools

- Floating chat assistant for simple decision framing guidance.
- Assumption Ledger: capture up to three assumptions behind the decision.
- Future-Self Note: write a 90-day commitment note.
- Cost of Delay: measure the scenario impact of delaying a decision.
- Bias Check: mark possible confirmation bias, sunk-cost fallacy, FOMO, or overconfidence.
- Decision Deadline: save a target date for making the decision.

## 4. Technology stack and tools

| Tool / library | Why it is used |
| --- | --- |
| React 19 | Component-based frontend UI. |
| Vite | Fast local development server and production bundling. |
| React Router DOM | Client-side pages and navigation. |
| React Icons | Interface icons. |
| CSS | Responsive visual design, animations, hover interactions, charts, cards, and layouts. |
| Browser `localStorage` | Persists simulations and user progress without a backend. |
| Browser Web Speech API | Voice-to-text goal input. |
| Browser Print API | Opens a report that can be saved as PDF. |
| Express | Included backend HTTP API framework. |
| MongoDB + Mongoose | Included backend database model layer. |
| JWT + bcryptjs | Included backend authentication support. |
| Gemini API (optional) | Existing server-side optional narrative-analysis integration. |
| ESLint | Code-quality checking. |

## 5. Architecture

```text
Browser
  │
  ├── React + React Router
  │     ├── Landing page
  │     ├── Dashboard
  │     ├── Simulator
  │     ├── Result / Decision Lab
  │     ├── History / Replay
  │     └── Profile
  │
  ├── Browser APIs
  │     ├── localStorage
  │     ├── SpeechRecognition
  │     └── window.print()
  │
  └── Optional future API connection
        └── Express → JWT middleware → MongoDB
```

## 6. Important source files

| File | Responsibility |
| --- | --- |
| `src/App.jsx` | All current React pages, simulation rules, local persistence, results, decision tools, and routes. |
| `src/index.css` | Entire visual system, responsive behavior, hover interactions, and animation styles. |
| `src/main.jsx` | React application entry point. |
| `server/index.js` | Existing Express routes for auth, profile, and MongoDB simulations. |
| `server/services/simulation.js` | Rules fallback and optional Gemini API narrative generation. |
| `server/middleware/auth.js` | JWT route-protection middleware. |
| `server/models/User.js` | MongoDB user schema. |
| `server/models/Simulation.js` | MongoDB simulation schema. |
| `.env.example` | Backend environment-variable template. |

## 7. Current data model (frontend)

Every simulation is saved under the browser key `futuresim.simulations.v2`.

```js
{
  id: 'uuid',
  title: 'Frontend Developer',
  category: 'Career',
  date: '11 Jul 2026',
  data: {
    education: 'B.Tech CSE',
    experience: 'Fresher',
    skills: 'HTML, CSS, React',
    goal: 'Frontend Developer',
    city: 'Bangalore',
    budget: '₹8–10 LPA',
    risk: 'Medium'
  },
  analysis: {
    probability: 82,
    riskLevel: 'Medium',
    confidence: 85,
    readiness: 70,
    time: '8–12 months'
  },
  saved: false,
  actionPlan: [{ text: '...', done: false }],
  replay: { progress: '...', date: '...' },
  tools: {
    assumptions: [],
    note: '',
    delay: 0,
    biases: [],
    deadline: ''
  }
}
```

Some fields appear only after the user starts using that feature.

## 8. How the local analysis works

The current analysis is an explainable local scoring model, not a live AI prediction. It calculates a probability from:

- Number of entered skills.
- Completeness of the form.
- Risk preference.
- Extra effort selected in What-If analysis.

The score is restricted to a reasonable range. The risk level, readiness, confidence, and estimated duration are then derived from that score and selected category.

This keeps the MVP fast, private, usable offline after the page loads, and free of API cost. For production predictions, replace or enrich this function with a secure backend AI call.

## 9. Running the project

### Requirements

- Node.js 20+ recommended.
- npm.

### Install dependencies

```bash
npm install
```

### Run frontend

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

### Code quality check

```bash
npm run lint
```

Both lint and production build currently pass.

## 10. Optional backend setup

The backend is included but currently not required by the frontend.

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to your MongoDB connection string.
3. Set a strong `JWT_SECRET`.
4. Optionally set `GEMINI_API_KEY`.
5. Run:

```bash
npm run server
```

The existing endpoints are:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API health check. |
| `POST` | `/api/auth/register` | Create a user. |
| `POST` | `/api/auth/login` | Log in and receive JWT. |
| `GET/PATCH` | `/api/profile` | Read/update profile. |
| `GET/POST` | `/api/simulations` | List/create simulations. |
| `PATCH/DELETE` | `/api/simulations/:id` | Update/delete a simulation. |

## 11. Known boundaries

- The app does not claim to forecast the future. Results are decision-support scenarios.
- AI chat is a local guidance widget, not an LLM conversation yet.
- PDF export uses the browser print dialog, so the user must choose “Save as PDF”.
- Voice input availability depends on browser support.
- Local storage is device/browser-specific; clearing browser data removes saved simulations.
- Backend authentication exists in the repository but is intentionally not used in the current frontend flow.

## 12. Suggested future production upgrades

1. Connect the existing backend API and MongoDB to sync simulations across devices.
2. Add Google OAuth / email authentication when required.
3. Move AI calls to the server and use Gemini/OpenAI with structured JSON responses.
4. Add real data sources for career salary, course, finance, and market indicators.
5. Use a PDF library such as `jspdf` or server-side PDF generation for branded downloadable documents.
6. Add unit tests for scoring and end-to-end tests for simulation flow.
7. Add privacy consent, data deletion, validation, rate limiting, and production error monitoring.

## 13. Quick demo flow

1. Visit `/`.
2. Click **Start a simulation**.
3. Select **Career** and complete the fields.
4. Click **Run my simulation**.
5. Adjust the What-If slider.
6. Complete a task in **Execution Plan**.
7. Add an assumption and a decision deadline in **Decision Intelligence Lab**.
8. Open **History**, replay the result, and enter actual progress.

## 14. Technologies used

| Area | Tools and technologies |
| --- | --- |
| Frontend | React 19, React DOM, React Router DOM, JavaScript (ES modules), HTML and CSS |
| Build and development | Vite, npm, ESLint, Tailwind CSS Vite plugin |
| UI and interaction | React Icons, Framer Motion, Web Speech API (voice input), browser Notifications API |

| Backend API | Node.js, Express 5, CORS, dotenv |
| Authentication and security | JSON Web Token (JWT), bcryptjs password hashing |

| Database | MongoDB with Mongoose |

| AI assistant | Google Gemini API using the `gemini-3.5-flash` model |

| Browser storage | LocalStorage for simulations, journal entries, theme and user session data |

## 15. Production deployment: Vercel + Render + MongoDB Atlas

### 1. Create the MongoDB Atlas database

1. Create a MongoDB Atlas cluster and database user.
2. In Atlas **Network Access**, allow Render to connect (for an MVP, `0.0.0.0/0`; restrict this for production when possible).
3. Copy the Atlas connection string and replace the password placeholder.

### 2. Deploy the backend on Render

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and select the repository. Render reads the included `render.yaml`.
3. Enter these prompted environment values:

| Variable | Value |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | Your active Gemini server API key |
| `CLIENT_ORIGIN` | Leave blank until the Vercel URL is available, then set it to that exact URL |

4. Deploy and copy the Render service URL, for example `https://futuresim-ai-api.onrender.com`.
5. Confirm `https://your-render-url/api/health` returns `{ "ok": true }`.

### 3. Deploy the frontend on Vercel

1. Import the same GitHub repository into Vercel. Framework preset: **Vite**.
2. Add the production environment variable below before deploying:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | Your Render URL, without a trailing slash, for example `https://futuresim-ai-api.onrender.com` |

3. Deploy. The included `vercel.json` keeps React Router URLs such as `/contact` working on refresh.
4. Copy the Vercel production URL into Render as `CLIENT_ORIGIN`, then redeploy the Render service.

### 4. Final smoke test

1. Open the Vercel URL in an incognito window.
2. Create an account and log in.
3. Run one simulation and open the result.
4. Toggle light/dark mode, open the Pro request form, and verify the contact-email draft opens.

Never commit real secrets. Rotate any API key that was ever shared or exposed.
