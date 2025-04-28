/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import Loading from "../components/ui/Loading/Loading";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const WithAuth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(selectCurrentToken);
  useEffect(() => {
    if (token) {
      const decoded: CustomJwtPayload = verifyToken(token);
      if (!decoded || decoded.role !== "FREELANCER") {
        navigate("/login"); // Redirect if not authenticated
      } else {
        setLoading(false); // Stop loading once authenticated
      }
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  if (loading) {
    return <Loading />; // Prevent rendering anything while loading
  }

  return children; // Render the children if authenticated
};

export default WithAuth;
