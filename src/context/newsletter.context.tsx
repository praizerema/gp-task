import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    Dispatch,
    SetStateAction,
    ReactNode,
  } from "react";
  import { MessageProps } from "../vite-env";
  
  // Define the context props interface
  interface NewsletterContextProps {
    messages: MessageProps[];
    setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  }
  
  // Create the context with an initial undefined value
  const NewsletterContext = createContext<NewsletterContextProps | undefined>(undefined);
  
  // Define the provider props interface
  interface NewsletterProviderProps {
    children: ReactNode;
  }
  
  // Create the provider component
  export const NewsletterProvider: React.FC<NewsletterProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
  
    const value = useMemo(() => ({ messages, setMessages }), [messages]);
  
    return (
      <NewsletterContext.Provider value={value}>
        {children}
      </NewsletterContext.Provider>
    );
  };
  
  // Custom hook to use the NewsletterContext
  // eslint-disable-next-line react-refresh/only-export-components
  export const useNewsletterContext = (): NewsletterContextProps => {
    const context = useContext(NewsletterContext);
    if (!context) {
      throw new Error("useNewsletterContext must be used within a NewsletterProvider");
    }
    return context;
  };
  