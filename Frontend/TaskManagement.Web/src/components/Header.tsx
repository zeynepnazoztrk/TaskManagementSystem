import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "primereact/button";
import { useTheme } from "../hooks/useTheme";

export function Header() {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="flex align-items-center justify-content-end gap-3 px-3"
      style={{
        height: "4rem",
      }}
    >
      <Button
        label={isDark ? "Dark Mode" : "Light Mode"}
        text
        onClick={toggleTheme}
      />
      <Button label="Profile" text onClick={() => navigate("/profile")} />
      <Button label="Logout" text onClick={logout} />
    </div>
  );
}
