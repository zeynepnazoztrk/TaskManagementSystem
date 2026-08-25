import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "primereact/button";

export function Header() {
  const { logout } = useAuth();

  return (
    <div
      className="flex align-items-center justify-content-end px-3"
      style={{
        height: "4.5rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
      }}
    >
      <div className="flex align-items-center gap-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `p-2 border-round no-underline ${isActive ? "bg-primary text-white" : "text-color"}`
          }
        >
          Profile
        </NavLink>
        <Button label="Logout" text onClick={logout} />
      </div>
    </div>
  );
}
