import { Outlet, Navigate } from "react-router-dom";
import { _getToken } from "../../utils";
const PrivateRoutes = () => {
  const token = _getToken()
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
