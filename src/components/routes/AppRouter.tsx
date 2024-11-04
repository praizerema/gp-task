import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoutes from "./ProtectedRoute";
import Home from "../../pages/home/Dashboard";
import Login from "../../pages/auth/Login";
import Reigister from "../../pages/auth/Register";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home/>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reigister />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
