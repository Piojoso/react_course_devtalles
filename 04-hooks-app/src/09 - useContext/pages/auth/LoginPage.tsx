import { UserContext } from "@/09 - useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const { login } = useContext(UserContext);

  const navigation = useNavigate();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = login(+userId);

    if (!response) {
      toast.error("User not found");
      return;
    }

    navigation("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Login</h1>
      <hr />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-10">
        <Input
          type="number"
          placeholder="user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <Button type="submit">Login</Button>
      </form>

      <Link to="/">
        <Button variant="ghost">Go back</Button>
      </Link>
    </div>
  );
};
