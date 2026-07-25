import { Outlet } from 'react-router-dom';
import Footer from './Footer';

/**
 * PublicLayout — Layout wrapper for unauthenticated pages.
 * Includes footer but no sidebar or navbar.
 */
const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
