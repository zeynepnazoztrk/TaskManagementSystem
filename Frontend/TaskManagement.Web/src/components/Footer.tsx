export function Footer() {
  return (
    <div
      className="p-2 text-center text-color-secondary text-sm"
      style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}
    >
      {new Date().getFullYear()} Task Management System
    </div>
  );
}
