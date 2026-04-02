TASKFLOW-API


A full‑stack Task Management System built with Django (REST API) on the backend and React (Vite, Axios, CSS) on the frontend.
It supports user registration, login with JWT tokens, and task CRUD operations with filtering and status tracking.


🚀 Features
User Authentication

Register new accounts

Login with JWT token

Token stored in localStorage for session persistence

Task Management

Create, edit, delete tasks

Filter tasks by status and priority

Summary badges (Total, Todo, In Progress, Done)

Protected Dashboard

Only accessible to logged‑in users

All API requests include the user’s token



🛠️ Tech Stack
Backend (Django)

Django REST Framework

JWT Authentication

Apps: users, tasks

Frontend (React + Vite)

React with TypeScript (optional)

Axios for API requests

Normal CSS for styling

React Router for navigation

📂 Project Structure
Code
task_manager/
├── config/              # Django settings, urls, asgi
├── apps/
│   ├── users/           # User models, serializers, views
│   └── tasks/           # Task models, serializers, views
├── common/              # Shared utils, permissions, pagination
├── manage.py
└── requirements.txt

task-manager-frontend/
├── src/
│   ├── api.ts           # Axios instance
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── TaskDashboard.tsx
│   ├── App.tsx          # Router setup
│   └── css/             # CSS files
└── package.json
⚙️ Setup Instructions
Backend (Django)
Clone the repo and install dependencies:

bash
pip install -r requirements.txt
Run migrations:

bash
python manage.py migrate
Start the server:

bash
python manage.py runserver
Backend runs at http://localhost:8000.

Frontend (React + Vite)
Navigate to frontend folder:

bash
cd task-manager-frontend
Install dependencies:

bash
npm install
Start dev server:

bash
npm run dev
Frontend runs at http://localhost:5173.



🔑 Authentication Flow
Register → POST /users/register/

Login → POST /users/login/ → returns { token: "..." }

Token stored in localStorage as authToken

Axios attaches Authorization: Bearer <token> to all requests

Dashboard → GET /tasks/ (requires token)


📌 Usage
Visit /registerpage to create an account.

Login at /login.

On success, you’re redirected to /dashboard where you can manage tasks.



🧪 Example API Endpoints
POST /users/register/ → Register new user

POST /users/login/ → Login and get token

GET /tasks/ → List tasks

POST /tasks/ → Create task

PUT /tasks/:id/ → Update task

DELETE /tasks/:id/ → Delete task