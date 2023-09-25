import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from "react";
export const UserContext = createContext<any>({});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();

  const saveUserToContext = (user: any) => {
    setUser(user);
  };
  const removeUserFromContext = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUserToContext,
        removeUserFromContext,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
