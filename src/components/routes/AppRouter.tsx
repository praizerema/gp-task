import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/login";
import Reigister from "../../pages/auth/register";
import PrivateRoutes from "./ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<PrivateRoutes />}>
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reigister />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
