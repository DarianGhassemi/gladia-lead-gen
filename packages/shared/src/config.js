// Shared configuration constants

export const API_CONFIG = {
  PORT: process.env.PORT || 3001,
  HOST: process.env.HOST || 'localhost'
};

export const EMAIL_CONFIG = {
  MAX_LENGTH: 500,
  MIN_LENGTH: 150,
  TONE: 'professional and personalized'
};

export const LEAD_CONFIG = {
  MAX_RESULTS: 100,
  DEFAULT_RESULTS: 10
};
