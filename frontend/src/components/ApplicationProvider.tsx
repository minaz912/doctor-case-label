import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from "react";

interface AppProviderProps {
  children: React.ReactNode;
}
export interface AppContextValue {
  onLogin(token: string): void;
  onLogout(): void;
  isAuthenticated: boolean;
  jwt?: string | null;
}

const Context = React.createContext<AppContextValue>({
  onLogin: (_token: string) => {},
  onLogout: () => {},
  isAuthenticated: false,
});

const JWT_KEY = "jwt";

const getToken = () => {
  return localStorage.getItem(JWT_KEY);
};
const restoreToken = () => {
  return getToken();
};
const saveJwt = (token: string) => {
  localStorage.setItem(JWT_KEY, token);
};

function AppProvider({ children }: AppProviderProps) {
  const [jwt, setJwt] = useState<string | null>(restoreToken());

  const handleLogout = useCallback(() => {
    localStorage.removeItem(JWT_KEY);
    setJwt(null);
  }, []);
  const handleLogin = useCallback((token) => {
    saveJwt(token);
    setJwt(token);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const currentToken = getToken();
      if (!currentToken && jwt) {
        handleLogout();
        return;
      }

      if (jwt !== currentToken) {
        window.location.reload();
      }
    };
    window.addEventListener("storage", handleStorage);
    document.addEventListener("AuthenticationRequiredError", handleLogout);

    return () => {
      window.removeEventListener("storage", handleLogout);
      document.removeEventListener("AuthenticationRequiredError", handleLogout);
    };
  }, [jwt, handleLogout]);

  const value = useMemo(
    () => ({
      jwt,
      isAuthenticated: !!jwt,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
    [jwt, handleLogin, handleLogout]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function withAppContext(WrappedComponent: any) {
  return function WithAppContext(props: any) {
    return (
      <Context.Consumer>
        {(state) => <WrappedComponent {...props} appContext={state} />}
      </Context.Consumer>
    );
  };
}

export function useAppContext() {
  const value = useContext<AppContextValue>(Context);

  return value;
}

export { AppProvider, withAppContext };

export default Context;
