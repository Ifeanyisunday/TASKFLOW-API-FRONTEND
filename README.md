📘 Task Manager Frontend
A React + Vite frontend for the Task Manager application.
This project provides user authentication (register, login, logout) and a protected dashboard for managing tasks.

🚀 Features
Authentication

Register new users

Login with JWT token

Logout clears token and redirects to login

Task Dashboard

View tasks belonging to the logged‑in user

Create, edit, delete tasks

Filter tasks by status and priority

Summary badges (Total, Todo, In Progress, Done)

Protected Routes

Dashboard only accessible when logged in

Redirects to login if no token is found



🛠️ Tech Stack
React 18 

Vite (fast dev server and bundler)

Axios (HTTP client for API calls)

React Router v6 (routing and navigation)

CSS (custom styles)


📂 Project Structure
Code
task-manager-frontend/
├── src/
│   ├── api.ts              # Axios instance with base URL
│   ├── App.tsx             # Router setup
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── TaskDashboard.tsx
│   ├── css/
│   │   ├── auth.css
│   │   └── taskdashboard.css
│   └── main.tsx            # Entry point
├── index.html
├── package.json
└── vite.config.ts


⚙️ Setup Instructions
1. Clone the repository
bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend

2. Install dependencies
bash
npm install

3. Configure API base URL
Edit src/api.ts to point to your backend (Django server):

ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});
export default api;

4. Run the development server
bash
npm run dev
Frontend runs at:
👉 http://localhost:5173


🔑 Authentication Flow
Register → POST /users/register/

Login → POST /users/login/ → returns { token: "..." }

Token stored in localStorage as authToken

Axios attaches Authorization: Bearer <token> to all requests

Dashboard → GET /tasks/ → shows only logged‑in user’s tasks

Logout → clears token and redirects to /login


📌 Usage
Visit /registerpage to create an account.

Login at /login.

On success, you’re redirected to /dashboard where you can manage tasks.

Use the Logout button to clear session and return to login.