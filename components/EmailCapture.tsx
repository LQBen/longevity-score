'use client';

import { useState } from 'react';
import { trackEvent, Events } from '@/lib/analytics';

interface EmailCaptureProps {
  onSubmit: () => void;
  onSkip: () => void;
}

export default function EmailCapture({ onSubmit, onSkip }: EmailCaptureProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error('Submission failed');
      trackEvent(Events.EMAIL_SUBMITTED);
      onSubmit();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    trackEvent(Events.EMAIL_SKIPPED);
    onSkip();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary text-center mb-2">
          Get updated when Longevity Score evolves with the latest verified research.
        </h2>
        <p className="text-center text-gray-500 mb-8">
          (Or skip to go straight to your results.)
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Name is
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jeanne Calment"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Email is <span className="text-accent-red">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="JeanneCalment@longeviquest.com"
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {error && <p className="text-accent-red text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-primary text-white font-semibold text-lg rounded-xl hover:bg-primary-dark transition-colors min-h-[48px] disabled:opacity-50"
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleSkip}
          className="block mx-auto mt-4 px-6 py-2.5 border-2 border-primary text-primary font-medium text-base rounded-xl hover:bg-primary/10 transition-colors"
        >
          SKIP TO RESULTS
        </button>
      </div>
    </div>
  );
}
