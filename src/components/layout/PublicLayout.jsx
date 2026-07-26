import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * PublicLayout — Clean layout wrapper for public landing & auth pages.
 */
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white selection:bg-[#5B8CFF]/30 selection:text-white">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
