import React from 'react';

const CATEGORY_LABEL = {
  technical: 'Technical',
  hr: 'HR',
  coding: 'Coding',
  mcq: 'MCQ'
};

const CATEGORY_STYLE = {
  technical: 'bg-primary-light text-primary-dark',
  hr: 'bg-accent-light text-accent',
  coding: 'bg-[#EDE9FE] text-[#6D28D9]',
  mcq: 'bg-[#FEF3C7] text-[#92400E]'
};

export default function QuestionCard({ question, index, total, children }) {
  return (
    <div className="bg-surface rounded-2xl shadow-card border border-line p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_STYLE[question.category]}`}>
            {CATEGORY_LABEL[question.category]}
          </span>
          <span className="text-xs text-muted">{question.topic}</span>
        </div>
        <span className="font-mono text-xs text-muted">
          {index + 1} / {total}
        </span>
      </div>
      <h2 className="font-display text-xl md:text-2xl text-ink leading-snug mb-6">{question.text}</h2>
      {children}
    </div>
  );
}
