/**
 * AppRoutes component defines the routing structure for the application.
 * It uses react-router-dom for routing and react-redux for state management.
 * 
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/register" renders the Register component.
 * - "/login" renders the Login component.
 * - "/vip" renders the VIPArea component if the user is logged in, otherwise redirects to the Login component.
 *   - "/vip/posts" renders the Posts component if the user is logged in, otherwise redirects to the Login component.
 *  - "/vip/products" renders the Products component if the user is logged in, otherwise redirects to the Login component.
 * - "*" renders the NotFound component for any undefined routes.
 * 
 * The VIP routes are nested under the VIPArea route. The route 
 *  /vip/posts must be nested inside 
 *  /vip. 
 * See: https://reactrouter.com/start/library/routing. 
 * 
 * @component
 */

// TODO: Import the necessary React Router components

import { useSelector } from "react-redux";
<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
=======
>>>>>>> de41159ccaf81ef0e38ed0c7e6eef5b16ad144b9
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import VIPArea from "./components/VIPArea"; // VIP-only
import Posts from "./components/Posts"; // VIP-only
import Products from "./components/Products"; // VIP-only
import ProductDetail from "./components/ProductDetail"; // VIP-only
import ProductCreator from "./components/ProductCreator"; // VIP-only
import ProductModify from "./components/ProductModify"; // VIP-only

export default function AppRoutes() {
<<<<<<< HEAD
  const user = useSelector((state) => state.auth?.user || null);
  
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<div><h1>Login Page</h1><Login /></div>} />
      <Route path="/vip" element={user ? <VIPArea /> : <Navigate to="/login" />}>
        <Route path="posts" element={user ? <Posts /> : <Navigate to="/login" />} />
        <Route path="products" element={user ? <Products /> : <Navigate to="/login" />} />
        <Route path="products/:id" element={user ? <ProductDetail /> : <Navigate to="/login" />} />
        <Route path="products/create" element={user ? <ProductCreator /> : <Navigate to="/login" />} />
        <Route path="products/:id/edit" element={user ? <ProductModify /> : <Navigate to="/login" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    
=======

  return (
    {/* TODO: Define the routes for the application */}
>>>>>>> de41159ccaf81ef0e38ed0c7e6eef5b16ad144b9
  );
}
