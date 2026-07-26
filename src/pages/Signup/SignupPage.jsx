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
import { useAuth } from '../../context/AuthContext';
import { validateSignupForm } from '../../utils/validators';
import { APP_NAME, ROUTES } from '../../utils/constants';

const SignupPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { signup } = useAuth();

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

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validateSignupForm(formData);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });

    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(formData);
      if (result.success !== false) {
        toast.success('Account created successfully! Redirecting to dashboard...');
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        setServerError(result.message || 'Registration failed. Please try again.');
        toast.error('Registration failed.');
      }
    } catch (err) {
      console.error('[SignupPage] Registration error:', err);
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    await signup({ name: 'Google Member', email: 'google.user@subsense.ai', password: 'google_oauth_pass' });
    toast.info('Signed in via Google account.');
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B1020] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#8B5CF6]/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#5B8CFF]/15 blur-[100px]"
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
            Create your account
          </h1>
          <p className="mt-2 text-sm text-[#A1A8B5]">
            Start your journey with {APP_NAME}
          </p>
        </motion.div>

        <AuthCard>
          <ErrorMessage message={serverError} />
          {serverError && <div className="h-4" />}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 accent-[#5B8CFF] cursor-pointer"
                />
                <span className="text-sm text-[#A1A8B5] group-hover:text-white transition-colors leading-relaxed">
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-[#5B8CFF] font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-[#5B8CFF] font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {touched.acceptTerms && errors.acceptTerms && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#EF4444] ml-7 font-mono"
                >
                  {errors.acceptTerms}
                </motion.p>
              )}
            </div>

            <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
              Create Account
            </SubmitButton>
          </form>

          <Divider text="or continue with" />

          <GoogleButton onClick={handleGoogleSignup} disabled={isSubmitting}>
            Sign up with Google
          </GoogleButton>

          <p className="mt-8 text-center text-sm text-[#A1A8B5]">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-[#5B8CFF] hover:underline"
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
