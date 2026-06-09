# 🚀 PrepAI: GenAI Interview Coach & Resume Builder

wefbhse
df

PrepAI is a premium, full-stack web application designed to help job seekers ace their technical and behavioral interviews. Powered by **Google Gemini**, the application analyzes a candidate's resume, self-description, and target job description to generate customized practice questions, sample answers, a personalized study roadmap, and an ATS-optimized PDF resume.

---

## ✨ Features

- **AI-Generated Interview Preparation:** Instantly generates tailored technical and behavioral questions based on your background and target job description.
- **Personalized Training Roadmap:** Provides a day-by-day learning plan to bridge skill gaps.
- **ATS-Optimized Resume PDF Builder:** Builds and exports a clean, recruiter-friendly PDF resume using Puppeteer.
- **Secure Authentication:** Features custom JWT-based authentication using secure, cross-origin cookies.
- **Modern Premium Interface:** Beautiful glassmorphic UI with full responsive design and dark/light theme options.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **TailwindCSS** (Vanilla CSS components)
- **Axios** (for API communication with credentials)
- **React Router**

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database & Schemas)
- **Google GenAI SDK** (Gemini 2.5 Flash Lite)
- **Puppeteer** (Server-side PDF generation)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas database (or local MongoDB instance)
- Google Gemini API Key

### 1. Clone & Set Up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Set Up the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` root directory and add:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`.

---

## 📦 Deployment Guide

### Backend (Render or Railway via Docker)
Due to Puppeteer's system dependencies, the backend is configured to be deployed inside a **Docker** container.

1. Connect your repository to Render/Railway.
2. Set the **Root Directory** of the Web Service to `backend`.
3. Choose the **Docker** runtime (Render will automatically detect the `Dockerfile` inside the `backend` folder).
4. Add your environment variables in the host's dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GOOGLE_API_KEY`
   - `FRONTEND_URL` (Set to your live frontend URL, e.g., `https://app.vercel.app`, no trailing slash)
   - `NODE_ENV=production`

### Frontend (Vercel or Netlify)
1. Deploy as a static site and select the `frontend` folder as the **Root Directory**.
2. Configure environment variables in the dashboard:
   - `VITE_API_BASE_URL` (Set to your live backend URL, e.g., `https://api.onrender.com
