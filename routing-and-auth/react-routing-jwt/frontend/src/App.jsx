/**
 * Main application component that sets up the router and renders the application content.
 *
 * @param {Object} props - Component props.
 * @param {React.ComponentType} [props.router=BrowserRouter] - The router component to use. Defaults to BrowserRouter.
 * @returns {JSX.Element} The rendered application component.
 */

/**
 * Component that contains the main content of the application, including navigation and routes.
 *
 * @returns {JSX.Element} The rendered application content.
 */

import { Link, useLocation, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LastVisitedPages from "./components/LastVisitedPages";
import Notifications from "./components/Notifications";
import ErrorMessage from "./components/ErrorMessage";
import AppRoutes from "./AppRoutes";
import { LOGOUT_USER } from "./redux/actionTypes";

export default function App({ router: RouterComponent = BrowserRouter }) {

  return (
    <RouterComponent>
      <AppContent />
    </RouterComponent>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const error = useSelector((state) => state.error);
<<<<<<< HEAD
  const notification = useSelector((state) => state.notification);
=======
>>>>>>> de41159ccaf81ef0e38ed0c7e6eef5b16ad144b9

  useEffect(() => {
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

<<<<<<< HEAD
  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
    window.location.href = '/';
  }

  return (
    <>
    <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {(!user || user.role === 'guest') && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {user && user.role === 'vip' && (
            <>
              <li>
                <Link to="/vip">VIP Area</Link>
              </li>
              <li>
                <Link to="/vip/products">VIP Products</Link>
              </li>
              <li>
                <Link to="/vip/posts">VIP Posts</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {error && <ErrorMessage message={error.message} />}
      <LastVisitedPages />
      {notification && <Notifications />}
      <AppRoutes />
     
=======
  return (
    <>
      {/* TODO
    Check user.role to conditionally render React Router navigation links.
    Show "Register" and "Login" links if the user is not logged in or has a "guest" role.
    Show VIP links if the user is authenticated and has the appropriate role. If the user is not authenticated, their role is null or "guest".

    Logout Handling
    Implement a dispatch functionto trigger LOGOUT_USER. Ensure that logout clears the user state and redirects appropriately.

    Error HandlingDisplay an ErrorMessage component if an error exists in the state.

    Use a LastVisitedPages component to track recent navigation history.
    
    Implement a Notifications component to display real-time alerts or messages.
    
    Render AppRoutes to define and handle different routes in the application.
      
      */}
>>>>>>> de41159ccaf81ef0e38ed0c7e6eef5b16ad144b9
    </>
  );
}
