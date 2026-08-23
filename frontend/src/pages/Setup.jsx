import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

const ROLE_TECH_MAP = {
  'Software Developer': ['MERN', 'MEAN', 'Java Full Stack', 'Python Full Stack'],
  'Frontend Developer': ['MERN', 'MEAN'],
  'Backend Developer': ['MERN', 'MEAN', 'Java Full Stack', 'Python Full Stack'],
  'Full Stack Developer': ['MERN', 'MEAN', 'Java Full Stack', 'Python Full Stack'],
  'AI/ML Engineer': ['AI/ML'],
  'Data Scientist': ['Data Science', 'AI/ML']
};
const ROLES = Object.keys(ROLE_TECH_MAP);
const LEVELS = ['Fresher', '1-2 Years'];

export default function Setup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Software Developer');
  const [technology, setTechnology] = useState('MERN');
  const [experience, setExperience] = useState('Fresher');
  const availableTechs = ROLE_TECH_MAP[role];
  const [mode, setMode] = useState('practice');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleStart() {
    setLoading(true);
    setError('');
    try {
      const { data: sessionData } = await client.post('/sessions', { role, technology, experience, mode });
      const { data: qData } = await client.get('/questions/generate', {
        params: { role, technology, experience }
      });
      navigate(`/interview/${sessionData.session._id}`, { state: { questions: qData.questions, mode } });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not start the interview.');
    } finally {
      setLoading(false);
    }
  }

  function OptionGroup({ label, options, value, onChange }) {
    return (
      <div>
        <p className="text-sm font-medium text-ink mb-2">{label}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                value === opt
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-ink border-line hover:border-primary/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-14">
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Set up your interview</h1>
      <p className="text-muted text-sm mb-8">Pick a target role, stack, and experience level.</p>

      <div className="space-y-6">
        <OptionGroup
          label="Role"
          options={ROLES}
          value={role}
          onChange={(r) => {
            setRole(r);
            setTechnology(ROLE_TECH_MAP[r][0]);
          }}
        />
        <OptionGroup label="Technology / Skills" options={availableTechs} value={technology} onChange={setTechnology} />
        <OptionGroup label="Experience" options={LEVELS} value={experience} onChange={setExperience} />

        <div>
          <p className="text-sm font-medium text-ink mb-2">Mode</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('practice')}
              className={`rounded-xl border p-4 text-left transition ${
                mode === 'practice' ? 'border-primary bg-primary-light' : 'border-line bg-white'
              }`}
            >
              <p className="font-medium text-ink text-sm">Practice</p>
              <p className="text-xs text-muted mt-1">No pressure, no strict timer per question.</p>
            </button>
            <button
              onClick={() => setMode('mock')}
              className={`rounded-xl border p-4 text-left transition ${
                mode === 'mock' ? 'border-primary bg-primary-light' : 'border-line bg-white'
              }`}
            >
              <p className="font-medium text-ink text-sm">Mock Interview</p>
              <p className="text-xs text-muted mt-1">Timed, sequential, simulates the real thing.</p>
            </button>
          </div>
        </div>

        {error && <p className="text-danger text-sm">{error}</p>}

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full bg-accent text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? 'Preparing questions…' : 'Start interview'}
        </button>
      </div>
    </div>
  );
}
