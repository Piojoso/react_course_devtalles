import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    // Jaja... I share the same brain cell with Fernando. I also choose the indigo color. It is beatiful.
    <div className="bg-indigo-600 min-h-screen">
      <Outlet />
    </div>
  );
};
