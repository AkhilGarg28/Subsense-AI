import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout, ProtectedLayout } from '../components/layout';

import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import DashboardPage from '../pages/Dashboard';
import UploadReceiptPage from '../pages/UploadReceipt';
import SubscriptionsPage from '../pages/Subscriptions';
import AIChatPage from '../pages/AIChat';
import NotificationsPage from '../pages/Notifications';
import ProfilePage from '../pages/Profile';

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
        <Route path="/subscription" element={<SubscriptionsPage />} />
        <Route path="/chat" element={<AIChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<ProfilePage />} />
      </Route>

      {/* Fallback Wildcard Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
