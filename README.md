
# 🎉 Mini Event Finder

Mini Event Finder is a full-stack web application built with **React (TypeScript)** for the frontend and **Node.js (Express + MongoDB)** for the backend.  
It allows users to discover, create, and register for local events seamlessly. The app features authentication, event management, search functionality, and responsive design.

---

## 🚀 Features

- 🔐 **User Authentication (Login & Register)**
- 🎟️ **Create, View, and Manage Events**
- 🔍 **Search Events by Name or Location**
- ⏰ **Date and Time Picker for Events**
- 🧭 **Logout Session Management**
- 🎉 **Toast Notifications (Success, Error, Info)**
- 📱 **Responsive Design (Mobile-Friendly)**

---

## 🧩 Tech Stack

### Frontend:
- React (TypeScript)
- TailwindCSS v4
- React Router DOM
- Axios
- React Toastify

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for Password Hashing
- dotenv for Environment Variables
- CORS Enabled

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/mini-event-finder.git
cd mini-event-finder
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file or copy the provided example:
```bash
cp .env.example .env
```
Start the backend server:
```bash
npm start
```
The backend runs on: **http://localhost:5000**

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on: **http://localhost:5173**

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Also include a `.env.example` for documentation purposes.

---

## 📡 API Documentation

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login user |
| `/api/events` | GET | Get all events |
| `/api/events` | POST | Create a new event |
| `/api/events/:id` | GET | Get event by ID |
| `/api/events/:id` | DELETE | Delete an event |

---

## 📷 Screenshots / Demo Video

(Optional – Add screenshots or Loom video link here)

---

## 🧠 Challenges Faced & Solutions

| Challenge | Solution |
|------------|-----------|
| Integrating TailwindCSS v4 | Installed `@tailwindcss/postcss` and updated PostCSS config |
| Backend Authentication | Implemented JWT-based login system |
| State Management | Used React hooks (`useState`, `useEffect`) efficiently |
| Event Search Feature | Added filter functionality based on event name & location |
| Deployment Issues | Configured Vite build and CORS properly |

---

## 🤖 AI Tools Used

| Tool | Usage |
|------|--------|
| ChatGPT (OpenAI GPT-5) | Assisted in code debugging, API design, and project structuring |
| GitHub Copilot | Provided inline code suggestions |
| Vite | Used for fast frontend build setup |

---

## 📦 Project Structure

```
mini-event-finder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## 🌐 Deployment

You can deploy using:
- Frontend → **Vercel / Netlify**
- Backend → **Render / Railway / Cyclic**
- Database → **MongoDB Atlas**

---


## 🏁 Conclusion

Mini Event Finder is a modern, scalable web application designed to make event discovery and participation effortless.  
The project demonstrates **full-stack development, RESTful API integration, authentication**, and **frontend design skills** — a great addition to your portfolio!

---
