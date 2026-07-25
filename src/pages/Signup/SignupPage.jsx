import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import {
  AuthCard,
  InputField,
  PasswordField,
  SubmitButton,
  GoogleButton,
  Divider,
  ErrorMessage,
} from '../../components/forms';
import { useToast } from '../../context/ToastContext';
import { validateSignupForm } from '../../utils/validators';
import { APP_NAME, ROUTES } from '../../utils/constants';

/**
 * SignupPage — Premium registration page with glassmorphism design.
 * Features: full validation, password strength indicator, terms checkbox,
 * Google OAuth placeholder, animated backgrounds, and full accessibility.
 */
const SignupPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle input change — clears field error on type
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
      if (serverError) setServerError('');
    },
    [errors, serverError]
  );

  // Handle blur — mark field as touched and validate
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validateSignupForm(formData);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
    },
    [formData]
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });

    // Validate all fields
    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Show toast for first error
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call — replace with actual backend call later
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
    } catch (err) {
      setServerError('Something went wrong. Please try again.');
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google signup placeholder
  const handleGoogleSignup = () => {
    toast.info('Google authentication will be available soon.');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Animated background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-success/10 blur-[100px]"
        />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Logo & Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 text-center"
        >
          <Link to={ROUTES.HOME} className="inline-block">
            <div className="gradient-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-glow">
              S
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Start your journey with {APP_NAME}
          </p>
        </motion.div>

        {/* Auth Card */}
        <AuthCard>
          {/* Server Error */}
          <ErrorMessage message={serverError} />
          {serverError && <div className="h-4" />}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full Name */}
            <InputField
              label="Full Name"
              id="signup-name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              icon={HiOutlineUser}
              autoComplete="name"
              required
            />

            {/* Email */}
            <InputField
              label="Email address"
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              icon={HiOutlineMail}
              autoComplete="email"
              required
            />

            {/* Password with strength indicator */}
            <PasswordField
              label="Password"
              id="signup-password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              autoComplete="new-password"
              showStrength
              required
            />

            {/* Confirm Password */}
            <PasswordField
              label="Confirm Password"
              id="signup-confirm-password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              autoComplete="new-password"
              required
            />

            {/* Terms & Conditions Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 accent-primary cursor-pointer"
                  aria-describedby="terms-error"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-primary hover:text-primary-hover font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-primary hover:text-primary-hover font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {touched.acceptTerms && errors.acceptTerms && (
                <motion.p
                  id="terms-error"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-danger ml-7"
                >
                  {errors.acceptTerms}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
              Create Account
            </SubmitButton>
          </form>

          {/* Divider */}
          <Divider text="or continue with" />

          {/* Google Button */}
          <GoogleButton onClick={handleGoogleSignup} disabled={isSubmitting}>
            Sign up with Google
          </GoogleButton>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Sign in
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
};

export default SignupPage;
