//Student Name: Kisan Rai 
//Student Number: C0910925

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();  // Hook for navigation
  const location = useLocation();  // Hook to get the current path

  return (
    <div className="layout">
      {/* Header - Only one instance */}
      <header className="d-flex justify-content-between align-items-center w-100 p-3 bg-light position-sticky top-0">
      
        <h1 className="mx-auto">User Management System</h1>
      </header>

      {/* Main content - Pass the page-specific content here */}
      <main>{children}</main>

      {/* Footer - Only one instance */}
      <footer className="text-center p-3 bg-light">
        <p>&copy; 2024 Kisan Rai, Student Number C0910925. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
