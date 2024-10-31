import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { _getUser } from "../utils";
import { UserProps } from "../vite-env";

interface AuthContextProps {
  user: UserProps | null | undefined;
	setUser: Dispatch<SetStateAction<UserProps | null | undefined >>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { Provider } = AuthContext;

  const [user, setUser] = useState(() => _getUser());
  const value = useMemo(
    () => ({
      user,
      setUser
    }),
    [user]
  );

  return(
   <Provider value={value}>
   {children}
   </Provider>)
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context must be provided");
  }
  return context;
};
