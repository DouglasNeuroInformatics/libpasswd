import { describe, expect, it } from 'vitest';

import { estimatePasswordStrength } from './index.js';

describe('estimatePasswordStrength', () => {
  it('should reject a commonly used password', () => {
    expect(estimatePasswordStrength('password')).toMatchObject({ success: false });
  });
  it('should provide feedback', () => {
    const result = estimatePasswordStrength('password');
    expect(result.feedback.suggestions.length).toBeGreaterThan(0);
    expect(result.feedback.warning).toBeTypeOf('string');
  });
  it('should translate feedback in English by default', () => {
    const r1 = estimatePasswordStrength('password');
    const r2 = estimatePasswordStrength('password', { feedbackLanguage: 'en' });
    expect(r1.feedback.suggestions[0]).toBe(r2.feedback.suggestions[0]);
    expect(r1.feedback.warning).toBe(r2.feedback.warning);
  });
  it('should translate feedback in French', () => {
    const r1 = estimatePasswordStrength('password');
    const r2 = estimatePasswordStrength('password', { feedbackLanguage: 'fr' });
    expect(r1.feedback.suggestions.length).toBeGreaterThan(0);
    expect(r1.feedback.warning).toBeTypeOf('string');
    expect(r1.feedback.suggestions[0]).not.toBe(r2.feedback.suggestions[0]);
    expect(r1.feedback.warning).not.toBe(r2.feedback.warning);
  });
});
