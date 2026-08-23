import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/setup');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Create your account</h1>
      <p className="text-muted text-sm mb-8">Start practicing for your Software Developer interviews.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-ink">Name</label>
          <input
            required
            className="mt-1 w-full border border-line rounded-lg px-3 py-2 focus:border-primary outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Email</label>
          <input
            type="email"
            required
            className="mt-1 w-full border border-line rounded-lg px-3 py-2 focus:border-primary outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Password</label>
          <input
            type="password"
            required
            minLength={6}
            className="mt-1 w-full border border-line rounded-lg px-3 py-2 focus:border-primary outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-primary-dark transition disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-muted mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-dark font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
