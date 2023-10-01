import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="bg-black w-screen h-screen">
      <Outlet />
    </div>
  );
};
