import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from "./context/UserContext"
import { useEffect } from 'react';
/**
 * A wrapper component that checks for authentication and roles.
 * @param {Object} children - The child component to render if checks pass.
 * @param {Array} allowedRoles - (Optional) List of roles allowed to access this route.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, setShowSignIn } = useContext(UserContext);
  const location = useLocation();

  // 1. Check if user is authenticated
  // Note: We don't need to check 'loading' here because UserProvider 
  // already blocks rendering until the initial session check is done.

  useEffect(() => {
    if (!user) {
      // User is not logged in -> Turn on the Modal!
      setShowSignIn(true);
    }
  }, [user, setShowSignIn]);

  if (!user) {
    // Redirect to Sign-in, but save the current location so we can 
    // send them back there after they login (optional UX improvement)
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // 2. Check for specific roles (if required)
  // We assume your UserDTO returns a role string like 'ADMIN' or 'CUSTOMER'
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have permission.
    // Redirect to home or an "Unauthorized" page.
    return <Navigate to="/Unauthorized" replace />;
  }

  // 3. If all checks pass, render the protected page
  return children;
};

export default ProtectedRoute;