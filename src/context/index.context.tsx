import { ReactNode } from "react";
import { AuthProvider } from "./index";
import { NewsletterProvider } from "./newsletter.context";

export const Provider = ({ children }:{children: ReactNode}) => {
  return <NewsletterProvider><AuthProvider>{children}</AuthProvider></NewsletterProvider>;
};
