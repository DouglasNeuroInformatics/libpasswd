import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import type { FeedbackType } from '@zxcvbn-ts/core';
import { adjacencyGraphs, dictionary } from '@zxcvbn-ts/language-common';
import { translations as enTranslations } from '@zxcvbn-ts/language-en';
import { translations as frTranslations } from '@zxcvbn-ts/language-fr';
import type { IntRange } from 'type-fest';

zxcvbnOptions.setOptions({ dictionary, graphs: adjacencyGraphs });

type PasswordFeedbackLanguage = 'en' | 'fr';

type FeedbackTranslations = {
  suggestions: { [key: string]: string };
  warnings: { [key: string]: string };
};

type PasswordStrengthOptions = {
  feedbackLanguage?: PasswordFeedbackLanguage;
};

type PasswordStrengthResult = {
  feedback: FeedbackType;
  score: IntRange<0, 5>;
  success: boolean;
};

function translateFeedback(feedback: FeedbackType, language: PasswordFeedbackLanguage): FeedbackType {
  const translations: FeedbackTranslations = language === 'fr' ? frTranslations : enTranslations;
  return {
    suggestions: feedback.suggestions.map((suggestion) => translations.suggestions[suggestion]!),
    warning: feedback.warning ? translations.warnings[feedback.warning]! : null
  };
}

export function estimatePasswordStrength(password: string, options?: PasswordStrengthOptions): PasswordStrengthResult {
  const result = zxcvbn(password);
  return {
    feedback: translateFeedback(result.feedback, options?.feedbackLanguage ?? 'en'),
    score: result.score,
    success: result.score > 2
  };
}

export type { PasswordFeedbackLanguage, PasswordStrengthOptions, PasswordStrengthResult };
