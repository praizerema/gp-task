import { ReactNode } from "react";
import { AuthProvider } from "./index";

export const Provider = ({ children }:{children: ReactNode}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
