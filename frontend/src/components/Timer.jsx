import React, { useEffect, useRef, useState } from 'react';

/**
 * Countdown timer for a question. Calls onExpire once when it hits 0.
 * key prop from parent should change per-question to reset the timer.
 */
export default function Timer({ seconds = 90, onExpire, running = true }) {
  const [remaining, setRemaining] = useState(seconds);
  const expiredRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    expiredRef.current = false;
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpire && onExpire();
      }
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, running, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const low = remaining <= 15;

  return (
    <div
      className={`font-mono text-sm px-3 py-1.5 rounded-full border ${
        low ? 'bg-danger/10 text-danger border-danger/30' : 'bg-primary-light text-primary-dark border-primary/20'
      }`}
    >
      {mins}:{secs.toString().padStart(2, '0')}
    </div>
  );
}
