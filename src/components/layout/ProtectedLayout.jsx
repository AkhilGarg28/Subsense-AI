import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Loader from '../ui/Loader';

/**
 * ProtectedLayout — Layout wrapper for authenticated pages.
 * Redirects to login if user is not authenticated.
 * Includes Navbar and Sidebar.
 */
const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  // Show loader while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  // NOTE: Temporarily disabled for development — uncomment when backend is connected
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — hidden on mobile, visible on lg+ */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Navbar — visible on mobile, hidden on lg+ (sidebar handles nav) */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
