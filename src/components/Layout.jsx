import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";

export function Layout() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}
