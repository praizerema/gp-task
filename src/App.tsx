import React from "react";
import AppRouter from "./components/routes/AppRouter";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return <><AppRouter /> <ToastContainer/></> ;
};

export default App;
