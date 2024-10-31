import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context";
const PrivateRoutes = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
