import React, { useEffect, useRef, useState } from 'react';

/**
 * Browser-native speech-to-text using the Web Speech API — no external
 * service or API key needed. Works in Chrome/Edge. Falls back gracefully
 * with a message if unsupported.
 */
export default function VoiceInput({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + ' ';
        }
      }
      if (finalText) onTranscript(finalText);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    return () => recognition.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle() {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  }

  if (!supported) {
    return <span className="text-xs text-muted">Voice input isn't supported in this browser — try Chrome.</span>;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition ${
        listening
          ? 'bg-accent text-white border-accent animate-pulse'
          : 'bg-white text-ink border-line hover:border-primary/40'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${listening ? 'bg-white' : 'bg-accent'}`} />
      {listening ? 'Listening…' : 'Speak answer'}
    </button>
  );
}
