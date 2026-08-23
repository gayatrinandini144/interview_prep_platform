import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Setup from './pages/Setup';
import Interview from './pages/Interview';
import Results from './pages/Results';
import History from './pages/History';
import Dashboard from './pages/Dashboard';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function Home() {
  const { user } = useAuth();
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">
      <span className="inline-block text-xs font-semibold tracking-wide uppercase text-primary-dark bg-primary-light px-3 py-1 rounded-full mb-5">
        Full Stack · AI/ML · Data Science · and more
      </span>
      <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight mb-5">
        Practice interviews until<br /> the ring goes green.
      </h1>
      <p className="text-muted max-w-xl mx-auto mb-8">
        Pick your role and stack — MERN, MEAN, Java or Python full stack, AI/ML, or Data Science —
        and get technical, HR, coding, and MCQ questions scored instantly, with progress tracked over time.
      </p>
      <a
        href={user ? '/setup' : '/register'}
        className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition"
      >
        {user ? 'Start a new interview' : 'Create your free account'}
      </a>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg font-body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<Protected><Setup /></Protected>} />
        <Route path="/interview/:sessionId" element={<Protected><Interview /></Protected>} />
        <Route path="/results/:sessionId" element={<Protected><Results /></Protected>} />
        <Route path="/history" element={<Protected><History /></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      </Routes>
    </div>
  );
}
