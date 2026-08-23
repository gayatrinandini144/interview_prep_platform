import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import ConfidenceRing from '../components/ConfidenceRing';

export default function History() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/sessions')
      .then(({ data }) => setSessions(data.sessions))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-3xl mx-auto px-6 py-16 text-center text-muted">Loading history…</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Interview history</h1>
      <p className="text-muted text-sm mb-8">Every session you've completed or started.</p>

      {sessions.length === 0 ? (
        <div className="text-center py-16 text-muted">
          No sessions yet.{' '}
          <Link to="/setup" className="text-primary-dark font-medium">
            Start your first one
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((s) => (
            <Link
              key={s._id}
              to={s.status === 'completed' ? `/results/${s._id}` : `/setup`}
              className="flex items-center justify-between bg-surface border border-line rounded-xl p-4 hover:border-primary/40 transition"
            >
              <div>
                <p className="font-medium text-ink text-sm">
                  {s.role} · {s.technology}{' '}
                  <span className="text-xs text-muted font-normal">
                    ({s.mode === 'mock' ? 'Mock' : 'Practice'})
                  </span>
                </p>
                <p className="text-xs text-muted mt-1">
                  {new Date(s.createdAt).toLocaleString()} ·{' '}
                  {s.status === 'completed' ? `${s.answers.length} questions answered` : 'In progress'}
                </p>
              </div>
              {s.status === 'completed' ? (
                <ConfidenceRing score={s.overallScore} size={48} strokeWidth={5} />
              ) : (
                <span className="text-xs font-medium text-warning bg-warning/10 px-3 py-1 rounded-full">
                  Incomplete
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
