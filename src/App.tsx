import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './pages/registerpage'
import Login from './pages/loginpage'
import TaskDashboard from './pages/taskdashboard'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
