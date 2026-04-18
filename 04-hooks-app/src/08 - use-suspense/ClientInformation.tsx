// import { useEffect, useState } from "react";
import { use, type Usable } from "react";
import { type User } from "./actions/get-users.action";

interface Props {
  getUser: Usable<User>;
}

// Valid but, only when you don't need a parameter
// const getUserActionPromise = getUserAction(1);

export const ClientInformation = ({ getUser }: Props) => {
  // ! Without use + Suspense component
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   getUserAction(client_id).then(setUser);
  // }, [client_id]);

  // ------------
  // ! With use + Suspense component
  const user: User = use(getUser);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user?.name} - #{user?.id}
      </h2>

      <p className="text-white text-2xl">{user?.location}</p>
      <p className="text-white text-xl">{user?.role.join(", ")}</p>
    </div>
  );
};
