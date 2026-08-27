import { Card } from "primereact/card";
import { memo } from "react";

interface StatsCardProps {
  label: string;
  value: number;
  color: string;
}

function StatsCardComponent({ label, value, color }: StatsCardProps) {
  return (
    <Card
      className="flex-1"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: "8px",
      }}
    >
      <div className="text-center">
        <div className="text-3xl font-bold" style={{ color }}>
          {value}
        </div>
        <div className="text-color-secondary white-space-nowrap mt-2">
          {label}
        </div>
      </div>
    </Card>
  );
}

export const StatsCard = memo(StatsCardComponent);
