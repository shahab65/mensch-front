import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "store/user";
import { useEffect } from "react";

const PrivateRoute = () => {
  const token = useUser((state) => state.token);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [token, navigate, location]);
  return <Outlet />;
};

export default PrivateRoute;
