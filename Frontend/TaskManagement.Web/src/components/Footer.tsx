export function Footer() {
  return (
    <div
      className="p-2 text-centertext-sm"
      style={{
        color: "var(--text-color-secondary)",
      }}
    >
      {new Date().getFullYear()} Task Management System
    </div>
  );
}
