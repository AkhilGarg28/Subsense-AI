import { Routes, Route } from 'react-router-dom';
import { PublicLayout, ProtectedLayout } from '../components/layout';

// Page imports
import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import DashboardPage from '../pages/Dashboard';
import UploadReceiptPage from '../pages/UploadReceipt';
import SubscriptionsPage from '../pages/Subscriptions';
import AIChatPage from '../pages/AIChat';
import NotificationsPage from '../pages/Notifications';
import ProfilePage from '../pages/Profile';

/**
 * AppRoutes — Central routing configuration for SubSense AI.
 * Public routes use PublicLayout (no sidebar/navbar).
 * Protected routes use ProtectedLayout (with sidebar/navbar).
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadReceiptPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/chat" element={<AIChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
