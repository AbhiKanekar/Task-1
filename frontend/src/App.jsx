import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./Pages/AuthPage/AuthPage";
import LandingPage from "./Pages/User/Landing";
import LoginPage from "./Pages/AuthPage/AdminReg";
import ProtectedRoute from "./components/ProtectedRoute";
import isLogin from "../lib/isLogin";
import { Toaster } from "react-hot-toast";
import AdminLanding from "./Pages/Admin/LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isLogin();
      setIsAuthenticated(auth);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/user" /> : <AuthPage />}
          />
          <Route
            path="/admin/register"
            element={isAuthenticated ? <Navigate to="/admin" /> : <LoginPage />}
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/register" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLanding /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
