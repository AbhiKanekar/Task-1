import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          withCredentials: true,
        });
        if (!res.data || !res.data._id) {
          navigate("/");
        }
      } catch (err) {
        console.error("User not authenticated:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
