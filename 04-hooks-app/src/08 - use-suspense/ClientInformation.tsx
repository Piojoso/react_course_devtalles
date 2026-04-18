import { useEffect, useState } from "react";
import { getUserAction, type User } from "./actions/get-users.action";

export const ClientInformation = ({ client_id }: { client_id: number }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserAction(client_id).then(setUser);
  }, [client_id]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      {user ? (
        <>
          <h2 className="text-4xl font-thin text-white">
            {user?.name} - #{user?.id}
          </h2>

          <p className="text-white text-2xl">{user?.location}</p>
          <p className="text-white text-xl">{user?.role.join(", ")}</p>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
