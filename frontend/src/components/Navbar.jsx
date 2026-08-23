import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg text-ink">
          <span className="w-7 h-7 rounded-full border-[3px] border-primary flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-accent" />
          </span>
          PrepRing
        </Link>

        {user ? (
          <nav className="flex items-center gap-5 text-sm font-medium text-muted">
            <Link to="/setup" className="hover:text-ink transition">New Interview</Link>
            <Link to="/history" className="hover:text-ink transition">History</Link>
            <Link to="/dashboard" className="hover:text-ink transition">Dashboard</Link>
            <span className="text-line">|</span>
            <span className="text-ink">{user.name}</span>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-danger hover:underline"
            >
              Log out
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/login" className="text-muted hover:text-ink transition">Log in</Link>
            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition">
              Get started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
