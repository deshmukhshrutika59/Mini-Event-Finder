
# 🎉 Mini Event Finder

**Mini Event Finder** is a simple full-stack web application where users can explore, create, and register for events happening nearby.
It’s built with **React (TypeScript)** on the frontend and **Node.js + Express + MongoDB** on the backend.

The project focuses on building a clean and responsive user interface, authentication, and easy event management — perfect for small college/community events.

---

## 🚀 Features

* 🔐 User authentication (register & login)
* 🎟️ Create and view local events
* 🔍 Search events by name or location
* ⏰ Date and time picker for scheduling events
* 🧭 Session-based login/logout
* 🔔 Toast notifications for all actions (success/error/info)
* 📱 Fully responsive (works on mobile & desktop)

---

## 🧩 Tech Stack

### Frontend

* React + TypeScript
* TailwindCSS (v4)
* React Router DOM
* Axios
* React Toastify

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt for password hashing
* dotenv for environment variables
* CORS enabled

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/deshmukhshrutika59/Mini-Event-Finder.git
cd Mini-Event-Finder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the backend:

```bash
npm start
```

Backend runs on **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login existing user |
| GET    | `/api/events`        | Fetch all events    |
| POST   | `/api/events`        | Create new event    |
| GET    | `/api/events/:id`    | Get single event    |
| DELETE | `/api/events/:id`    | Delete event        |

---

## 🧠 Challenges Faced

| Challenge                           | Solution                                                  |
| ----------------------------------- | --------------------------------------------------------- |
| TailwindCSS v4 setup issue          | Installed `@tailwindcss/postcss` and fixed PostCSS config |
| JWT Authentication errors           | Added middleware for token validation                     |
| Event search not updating instantly | Used React state and `useEffect` for dynamic search       |
| Toasts not showing in some cases    | Wrapped app with ToastContainer properly                  |

---

## 🤖 AI Tools & Resources Used

| Tool                       | Usage                                                        |
| -------------------------- | ------------------------------------------------------------ |
| **ChatGPT (OpenAI GPT-5)** | Helped debug and structure backend + frontend logic          |
| **GitHub Copilot**         | Provided inline code suggestions                             |
| **Cursor AI**              | Used for quick debugging, code explanations, and refactoring |
| **Vite**                   | Used for fast frontend setup                                 |

---

## 📦 Folder Structure

```
Mini-Event-Finder/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
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

Frontend on Vercel 

Backend on Render 

Database on MongoDB Atlas

---

## 🏁 Conclusion

This project helped me understand full-stack development, API integration, and UI design better.
**Mini Event Finder** is a great example of using React and Node.js together to build a simple, functional, and responsive event-based web application.

---
