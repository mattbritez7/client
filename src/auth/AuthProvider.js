import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);

  return children;
};

export default AuthProvider;
