import React from 'react';

/**
 * Signature visual element: a circular "confidence ring" used everywhere
 * a score appears (question feedback, results, dashboard, history).
 */
export default function ConfidenceRing({ score = 0, size = 88, strokeWidth = 8, label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  let color = '#E23E57'; // danger
  if (score >= 80) color = '#0F9E93'; // primary
  else if (score >= 60) color = '#22A06B'; // success
  else if (score >= 40) color = '#E3A008'; // warning

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E7E9F2" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono font-semibold" style={{ fontSize: size * 0.26, color: '#171B2E' }}>
          {score}
        </span>
        {label && <span className="text-[10px] text-muted -mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
