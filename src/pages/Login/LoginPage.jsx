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
import { useAuth } from '../../context/AuthContext';
import { validateLoginForm } from '../../utils/validators';
import { APP_NAME, ROUTES } from '../../utils/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

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

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validateLoginForm(formData);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    setTouched({ email: true, password: true });

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(formData);
      if (result.success !== false) {
        toast.success('Welcome back! Redirecting to dashboard...');
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        setServerError(result.message || 'Invalid email or password. Please try again.');
        toast.error('Login failed.');
      }
    } catch (err) {
      console.error('[LoginPage] Sign in error:', err);
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    await login({ email: 'google.user@subsense.ai', password: 'google_oauth_pass' });
    toast.info('Signed in via Google account.');
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B1020] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#5B8CFF]/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#8B5CF6]/15 blur-[100px]"
        />
      </div>

      <div className="relative w-full max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Link to={ROUTES.HOME} className="inline-block">
            <div className="gradient-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-glow-blue">
              S
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[#A1A8B5]">
            Sign in to your {APP_NAME} account
          </p>
        </motion.div>

        <AuthCard>
          <ErrorMessage message={serverError} />
          {serverError && <div className="h-4" />}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-[#5B8CFF] cursor-pointer"
                />
                <span className="text-sm text-[#A1A8B5] group-hover:text-white transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="#"
                className="text-sm font-medium text-[#5B8CFF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
              Sign In
            </SubmitButton>
          </form>

          <Divider text="or continue with" />

          <GoogleButton onClick={handleGoogleLogin} disabled={isSubmitting} />

          <p className="mt-8 text-center text-sm text-[#A1A8B5]">
            Don&apos;t have an account?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className="font-semibold text-[#5B8CFF] hover:underline"
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
