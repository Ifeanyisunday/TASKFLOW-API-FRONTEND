import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import '../css/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login/', { email, password });
      console.log('Login response:', res.data);
      
      // assuming backend returns { token: "..." }
      const token = res.data.tokens?.access || res.data.token; // adjust based on your backend response
      if (token) {
        localStorage.setItem('authToken', token);
        alert(res.data.message || 'Login successful!');
        navigate('/dashboard'); // redirect to dashboard
      } else {
        alert('No token returned');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-box">
        <div className="auth-icon">🔑</div>

        <h2>Welcome back</h2>
        <p className="subheading">Sign in to manage your tasks</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="•••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
