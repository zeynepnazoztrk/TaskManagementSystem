import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

export function Sidebar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const runSearch = () => {
    if (search.trim()) {
      navigate(`/tasks?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "var(--primary-color)" : "var(--text-color)",
    fontWeight: isActive ? 700 : 400,
  });

  return (
    <div className="flex flex-column h-full">
      <div
        className="flex justify-content-center align-items-center px-3 surface-border"
        style={{ height: "4.5rem" }}
      >
        <h1 className="mt-6">Task Manager</h1>
      </div>
      <div className="p-3 mt-5">
        <span className="p-input-icon-left w-full">
          <InputText
            placeholder="Search for tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            className="app-input w-full"
          />
        </span>
      </div>
      <nav className="flex flex-column align-items-start gap-2 w-full p-3">
        <NavLink
          to="/"
          end
          className="sidebar-link text-left p-2 pl-3 border-round no-underline w-full"
          style={linkStyle}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className="sidebar-link p-2 pl-3 text-left border-round no-underline w-full"
          style={linkStyle}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/categories"
          className="sidebar-link p-2 pl-3  text-left border-round no-underline w-full"
          style={linkStyle}
        >
          Categories
        </NavLink>
      </nav>
    </div>
  );
}
