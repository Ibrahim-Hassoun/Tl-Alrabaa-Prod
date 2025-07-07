import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../lib/remote/axios';

const AuthGuard = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const { success } = await request({ method: "GET", route: "/profile" });

      if (!success) {
        localStorage.removeItem("access_token");
        navigate("/"); // Redirect to login/home
      } else {
        setChecking(false); // Token is valid
      }
    };

    verifyToken();
  }, []);

  if (checking) return null; // or a spinner

  return children;
};

export default AuthGuard;
