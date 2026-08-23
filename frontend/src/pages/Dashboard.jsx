import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import client from '../api/client';
import ConfidenceRing from '../components/ConfidenceRing';

const CATEGORY_LABEL = { technical: 'Technical', hr: 'HR', coding: 'Coding', mcq: 'MCQ' };

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    client.get('/sessions/stats/dashboard').then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <div className="max-w-4xl mx-auto px-6 py-16 text-center text-muted">Loading dashboard…</div>;

  const trendData = stats.trend.map((t, i) => ({
    name: `#${i + 1}`,
    score: t.overallScore
  }));
  const categoryData = Object.entries(stats.categoryAverages || {}).map(([cat, val]) => ({
    name: CATEGORY_LABEL[cat],
    score: val
  }));

  if (stats.totalSessions === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center text-muted">
        Complete an interview to unlock your performance dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Performance dashboard</h1>
      <p className="text-muted text-sm mb-8">Your progress across {stats.totalSessions} completed sessions.</p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-surface border border-line rounded-xl p-5 flex items-center gap-4">
          <ConfidenceRing score={stats.latestScore} size={56} strokeWidth={6} />
          <div>
            <p className="text-xs text-muted">Latest score</p>
          </div>
        </div>
        <div className="bg-surface border border-line rounded-xl p-5 flex items-center gap-4">
          <ConfidenceRing score={stats.bestScore} size={56} strokeWidth={6} />
          <div>
            <p className="text-xs text-muted">Best score</p>
          </div>
        </div>
        <div className="bg-surface border border-line rounded-xl p-5 flex flex-col justify-center">
          <p className="font-mono text-2xl font-semibold text-ink">{stats.totalSessions}</p>
          <p className="text-xs text-muted">Sessions completed</p>
        </div>
      </div>

      <div className="bg-surface border border-line rounded-xl p-6 mb-6">
        <p className="font-medium text-ink mb-4">Score trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E9F2" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7089' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6B7089' }} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#0F9E93" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface border border-line rounded-xl p-6 mb-6">
        <p className="font-medium text-ink mb-4">Average score by category</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E9F2" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7089' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6B7089' }} />
            <Tooltip />
            <Bar dataKey="score" fill="#FF6A4D" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {stats.weakTopics?.length > 0 && (
        <div className="bg-accent-light rounded-xl p-6">
          <p className="font-medium text-ink mb-3">Weak-topic detection</p>
          <p className="text-xs text-muted mb-4">
            Topics where your average score is below 60 — worth another round of practice.
          </p>
          <div className="space-y-2">
            {stats.weakTopics.map((wt) => (
              <div key={wt.topic} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5">
                <span className="text-sm text-ink font-medium">{wt.topic}</span>
                <span className="font-mono text-sm text-accent">{wt.avgScore}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
