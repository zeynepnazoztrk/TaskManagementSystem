import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="flex h-screen">
      <div
        className="h-full flex-shrink-0"
        style={{
          width: "14rem",
          backgroundColor: "var(--surface-card)",
        }}
      >
        <Sidebar />
      </div>
      <div className="flex flex-column flex-grow-1 overflow-x-hidden">
        <Header />
        <div className="flex-grow-1 p-3 px-6 overflow-y-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
