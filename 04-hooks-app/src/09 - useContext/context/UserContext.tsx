import { useState, createContext, type PropsWithChildren } from "react";
import { users, type User } from "../data/user-mock.data";

// interface Props {
//   children: React.ReactNode;
// }

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  // state
  authStatus: AuthStatus;
  user: User | null;

  // methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      setAuthStatus("not-authenticated");
      setUser(null);

      return false;
    }

    setAuthStatus("authenticated");
    setUser(user);

    return true;
  };

  const handleLogout = () => {
    setAuthStatus("not-authenticated");
    setUser(null);
  };

  return (
    <UserContext
      value={{
        authStatus,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
