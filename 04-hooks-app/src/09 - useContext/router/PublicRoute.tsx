import type React from "react";
import { use } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
  element: React.ReactNode;
}

export const PublicRoute = ({ element }: Props) => {
  const { authStatus } = use(UserContext);

  if (authStatus === "checking") {
    return <div>Loading...</div>;
  }

  if (authStatus === "not-authenticated") {
    return element;
  }

  return <Navigate to="/" replace />;
};
