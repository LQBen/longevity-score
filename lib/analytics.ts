// PostHog analytics helpers
import posthog from 'posthog-js';

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties);
  }
}

export function identifyUser(email: string) {
  if (typeof window !== 'undefined') {
    posthog.identify(email);
    posthog.people.set({ email });
  }
}

export const Events = {
  QUIZ_STARTED: 'quiz_started',
  QUESTION_ANSWERED: 'question_answered',
  EMAIL_CAPTURED: 'email_captured',
  EMAIL_SKIPPED: 'email_skipped',
  QUIZ_COMPLETED: 'quiz_completed',
  SHARE_CLICKED: 'share_clicked',
  LEARN_MORE_CLICKED: 'learn_more_clicked',
} as const;
