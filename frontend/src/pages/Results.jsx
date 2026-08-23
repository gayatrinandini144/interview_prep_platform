import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import client from '../api/client';
import ConfidenceRing from '../components/ConfidenceRing';

const CATEGORY_LABEL = { technical: 'Technical', hr: 'HR', coding: 'Coding', mcq: 'MCQ' };

export default function Results() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    client.get(`/sessions/${sessionId}`).then(({ data }) => setSession(data.session));
  }, [sessionId]);

  if (!session) return <div className="max-w-2xl mx-auto px-6 py-16 text-center text-muted">Loading results…</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">Session complete</p>
        <ConfidenceRing score={session.overallScore} size={140} strokeWidth={12} label="overall" />
        <h1 className="font-display text-2xl font-semibold text-ink mt-4">
          {session.role} · {session.technology} · {session.experience}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {Object.entries(session.categoryScores || {}).map(([cat, score]) => (
          <div key={cat} className="bg-surface border border-line rounded-xl p-4 text-center">
            <ConfidenceRing score={score} size={56} strokeWidth={6} />
            <p className="text-xs text-muted mt-2">{CATEGORY_LABEL[cat]}</p>
          </div>
        ))}
      </div>

      {session.weakTopics?.length > 0 && (
        <div className="bg-accent-light rounded-xl p-5 mb-10">
          <p className="font-medium text-ink mb-2">Weak topics to revisit</p>
          <div className="flex flex-wrap gap-2">
            {session.weakTopics.map((wt) => (
              <span key={wt.topic} className="text-xs bg-white text-accent font-medium px-3 py-1.5 rounded-full">
                {wt.topic} · {wt.avgScore}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-10">
        <p className="font-medium text-ink">Question-by-question breakdown</p>
        {session.answers.map((a, i) => (
          <div key={i} className="bg-surface border border-line rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted mb-1">
                  {CATEGORY_LABEL[a.category]} · {a.topic}
                </p>
                <p className="text-sm text-ink font-medium">{a.questionText}</p>
                <p className="text-xs text-muted mt-2">{a.feedback}</p>
              </div>
              <ConfidenceRing score={a.score} size={48} strokeWidth={5} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <Link to="/setup" className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-dark transition">
          Practice again
        </Link>
        <Link to="/dashboard" className="border border-line px-6 py-2.5 rounded-full font-medium text-ink hover:border-primary/40 transition">
          View dashboard
        </Link>
      </div>
    </div>
  );
}
