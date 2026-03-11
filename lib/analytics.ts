// PostHog analytics helpers

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, properties);
  }
}

export const Events = {
  QUIZ_STARTED: 'quiz_started',
  QUESTION_ANSWERED: 'question_answered',
  EMAIL_SUBMITTED: 'email_submitted',
  EMAIL_SKIPPED: 'email_skipped',
  QUIZ_COMPLETED: 'quiz_completed',
  TRY_AGAIN_CLICKED: 'try_again_clicked',
  FACTOR_CTA_CLICKED: 'factor_cta_clicked',
} as const;
