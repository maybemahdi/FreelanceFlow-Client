import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import Loading from "../components/shared/Loading/Loading";

const WithAdmin = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateAdmin = async () => {
      if (token) {
        const isValidToken = verifyToken(token) as { role?: string } | null;

        if (!isValidToken || isValidToken.role !== "ADMIN") {
          dispatch(logout());
          navigate("/login"); // Redirect if not authenticated
        } else {
          setLoading(false); // Stop loading once authenticated
        }
      } else {
        dispatch(logout());
        navigate("/login");
      }
    };

    validateAdmin();
  }, [token, dispatch, navigate]);

  if (loading) {
    return <Loading />; // Prevent rendering anything while loading
  }

  return <>{children}</>; // Render the children if authenticated
};

export default WithAdmin;
