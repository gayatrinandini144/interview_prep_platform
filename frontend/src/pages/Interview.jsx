import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import VoiceInput from '../components/VoiceInput';
import ConfidenceRing from '../components/ConfidenceRing';

export default function Interview() {
  const { sessionId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [questions] = useState(state?.questions || []);
  const mode = state?.mode || 'practice';
  const [index, setIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [mcqChoice, setMcqChoice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [finishing, setFinishing] = useState(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  useEffect(() => {
    setStartedAt(Date.now());
  }, [index]);

  const submitAnswer = useCallback(
    async (autoSubmitted = false) => {
      if (submitting || feedback) return;
      setSubmitting(true);
      const userAnswer = question.category === 'mcq' ? mcqChoice : answerText;
      const timeTakenSeconds = Math.round((Date.now() - startedAt) / 1000);
      try {
        const { data } = await client.post(`/sessions/${sessionId}/answer`, {
          questionId: question._id,
          userAnswer: userAnswer ?? (autoSubmitted ? '' : ''),
          timeTakenSeconds
        });
        setFeedback(data);
      } catch (err) {
        setFeedback({ score: 0, feedback: 'Could not evaluate this answer.', suggestions: [] });
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, feedback, question, mcqChoice, answerText, sessionId, startedAt]
  );

  async function handleNext() {
    if (isLast) {
      setFinishing(true);
      try {
        await client.post(`/sessions/${sessionId}/complete`);
      } finally {
        navigate(`/results/${sessionId}`);
      }
      return;
    }
    setIndex((i) => i + 1);
    setAnswerText('');
    setMcqChoice(null);
    setFeedback(null);
  }

  if (!question) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <p className="text-muted">No questions loaded for this session. Start a new interview.</p>
        <button onClick={() => navigate('/setup')} className="mt-4 text-primary-dark font-medium">
          Back to setup
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs uppercase tracking-wide font-semibold text-muted">
          {mode === 'mock' ? 'Mock Interview' : 'Practice Session'}
        </span>
        <Timer
          key={index}
          seconds={mode === 'mock' ? 90 : 180}
          running={!feedback}
          onExpire={() => submitAnswer(true)}
        />
      </div>

      <QuestionCard question={question} index={index} total={questions.length}>
        {!feedback ? (
          <>
            {question.category === 'mcq' ? (
              <div className="space-y-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setMcqChoice(i)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition ${
                      mcqChoice === i
                        ? 'border-primary bg-primary-light text-primary-dark font-medium'
                        : 'border-line hover:border-primary/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  rows={6}
                  className="w-full border border-line rounded-lg px-4 py-3 text-sm focus:border-primary outline-none resize-none"
                  placeholder="Type your answer here, or use voice input below…"
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
                <div className="mt-3">
                  <VoiceInput onTranscript={(t) => setAnswerText((prev) => (prev ? prev + ' ' + t : t))} />
                </div>
              </div>
            )}

            <button
              onClick={() => submitAnswer(false)}
              disabled={submitting || (question.category === 'mcq' ? mcqChoice === null : !answerText.trim())}
              className="mt-6 w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-primary-dark transition disabled:opacity-40"
            >
              {submitting ? 'Evaluating…' : 'Submit answer'}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-4 py-2">
            <ConfidenceRing score={feedback.score} label="score" size={96} />
            <p className="text-ink font-medium">{feedback.feedback}</p>
            {feedback.suggestions?.length > 0 && (
              <ul className="text-sm text-muted space-y-1">
                {feedback.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            )}
            {feedback.followUps?.length > 0 && (
              <div className="bg-accent-light text-accent text-sm rounded-lg px-4 py-2 mt-2">
                Follow-up to think about: {feedback.followUps[0]}
              </div>
            )}
            <button
              onClick={handleNext}
              disabled={finishing}
              className="mt-2 bg-accent text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {finishing ? 'Wrapping up…' : isLast ? 'Finish & see results' : 'Next question'}
            </button>
          </div>
        )}
      </QuestionCard>
    </div>
  );
}
