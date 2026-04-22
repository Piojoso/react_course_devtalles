import { UserContext } from "@/09 - useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const { user, logout } = use(UserContext);

  const navigation = useNavigate();

  const handleSalirClick = () => {
    logout();

    navigation("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Profile</h1>
      <hr />

      <pre className="my-4 overflow-x-auto ">
        {JSON.stringify(user, null, 2)}
      </pre>

      <Button variant="destructive" onClick={handleSalirClick}>
        Salir
      </Button>
    </div>
  );
};
