import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
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
import { validateLoginForm } from '../../utils/validators';
import { APP_NAME, ROUTES } from '../../utils/constants';

/**
 * LoginPage — Premium authentication page with glassmorphism design.
 * Features: email/password validation, remember me, Google OAuth placeholder,
 * toast notifications, animated backgrounds, and full accessibility.
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle input change — clears field error on type
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
      if (serverError) setServerError('');
    },
    [errors, serverError]
  );

  // Handle blur — mark field as touched and validate it
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validateLoginForm(formData);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
    },
    [formData]
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate all fields
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call — replace with actual backend call later
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Welcome back! Redirecting to dashboard...');

      // Simulate successful login
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 1000);
    } catch (err) {
      setServerError('Invalid email or password. Please try again.');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google login placeholder
  const handleGoogleLogin = () => {
    toast.info('Google authentication will be available soon.');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Animated background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/15 blur-[100px]"
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
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Sign in to your {APP_NAME} account
          </p>
        </motion.div>

        {/* Auth Card */}
        <AuthCard>
          {/* Server Error */}
          <ErrorMessage message={serverError} />
          {serverError && <div className="h-4" />}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <InputField
              label="Email address"
              id="login-email"
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

            {/* Password */}
            <PasswordField
              label="Password"
              id="login-password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              autoComplete="current-password"
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-primary cursor-pointer"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="#"
                className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
              Sign In
            </SubmitButton>
          </form>

          {/* Divider */}
          <Divider text="or continue with" />

          {/* Google Button */}
          <GoogleButton onClick={handleGoogleLogin} disabled={isSubmitting} />

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className="font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Create an account
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
};

export default LoginPage;
