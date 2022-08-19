import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const {
    user: { token },
  } = useContext(GlobalContext);
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
