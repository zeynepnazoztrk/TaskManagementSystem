import { ProgressSpinner } from "primereact/progressspinner";

export function LoadingSpinner() {
  return (
    <div className="flex justify-content-center align-items-center p-5">
      <ProgressSpinner />
    </div>
  );
}
