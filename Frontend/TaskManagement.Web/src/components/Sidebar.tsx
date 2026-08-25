import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="flex flex-column h-full">
      <div
        className="flex justify-content-center align-items-center px-3 surface-border"
        style={{ height: "4.5rem" }}
      >
        <NavLink to="/" className="flex align-items-center no-underline">
          <span className="text-2xl font-bold text-primary">Task Manager</span>
        </NavLink>
      </div>
      <nav className="flex flex-column align-items-start gap-2 w-full p-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-link text-left  p-2 border-round no-underline w-full ${isActive ? "bg-primary text-white" : "text-color"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `sidebar-link p-2 text-left border-round no-underline w-full ${isActive ? "bg-primary text-white" : "text-color"}`
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `sidebar-link p-2 text-left border-round no-underline w-full ${isActive ? "bg-primary text-white" : "text-color"}`
          }
        >
          Categories
        </NavLink>
      </nav>
    </div>
  );
}
