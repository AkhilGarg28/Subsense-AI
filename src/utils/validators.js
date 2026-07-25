/**
 * Reusable form validation functions for SubSense AI.
 * Each validator returns an error message string (empty string = valid).
 */

// Required field validation
export const required = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

// Email format validation
export const isValidEmail = (value) => {
  if (!value) return '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? '' : 'Please enter a valid email address';
};

// Minimum length validation
export const minLength = (value, min, fieldName = 'This field') => {
  if (!value) return '';
  return value.length >= min ? '' : `${fieldName} must be at least ${min} characters`;
};

// Password match validation
export const passwordsMatch = (password, confirmPassword) => {
  if (!confirmPassword) return '';
  return password === confirmPassword ? '' : 'Passwords do not match';
};

// Password strength calculator — returns score (0–4), label, and colors
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '', textColor: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  // Cap at 4 levels
  score = Math.min(score, 4);

  const levels = [
    { label: '', color: 'bg-border', textColor: 'text-text-muted' },
    { label: 'Weak', color: 'bg-danger', textColor: 'text-danger' },
    { label: 'Fair', color: 'bg-warning', textColor: 'text-warning' },
    { label: 'Strong', color: 'bg-success', textColor: 'text-success' },
    { label: 'Very Strong', color: 'bg-success', textColor: 'text-success' },
  ];

  return { score, ...levels[score] };
};

// Validate login form — returns errors object
export const validateLoginForm = (values) => {
  const errors = {};

  const emailReq = required(values.email, 'Email');
  if (emailReq) errors.email = emailReq;
  else {
    const emailVal = isValidEmail(values.email);
    if (emailVal) errors.email = emailVal;
  }

  const passReq = required(values.password, 'Password');
  if (passReq) errors.password = passReq;
  else {
    const passLen = minLength(values.password, 8, 'Password');
    if (passLen) errors.password = passLen;
  }

  return errors;
};

// Validate signup form — returns errors object
export const validateSignupForm = (values) => {
  const errors = {};

  const nameReq = required(values.name, 'Full name');
  if (nameReq) errors.name = nameReq;

  const emailReq = required(values.email, 'Email');
  if (emailReq) errors.email = emailReq;
  else {
    const emailVal = isValidEmail(values.email);
    if (emailVal) errors.email = emailVal;
  }

  const passReq = required(values.password, 'Password');
  if (passReq) errors.password = passReq;
  else {
    const passLen = minLength(values.password, 8, 'Password');
    if (passLen) errors.password = passLen;
  }

  const confirmReq = required(values.confirmPassword, 'Confirm password');
  if (confirmReq) errors.confirmPassword = confirmReq;
  else {
    const match = passwordsMatch(values.password, values.confirmPassword);
    if (match) errors.confirmPassword = match;
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions';
  }

  return errors;
};
