import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "primereact/chart";
import { Message } from "primereact/message";
import { Tag } from "primereact/tag";
import { taskService } from "../services/taskService";
import { StatsCard } from "../components/StatsCard";
import { statusTags } from "../utils/taskTags";
import type { TaskStatistics } from "../types/statistics";
import type { TaskItem } from "../types/task";

const statusLegend = [
  { label: "Pending", color: "#a16207" },
  { label: "In Progress", color: "#1d4ed8" },
  { label: "Completed", color: "#15803d" },
  { label: "Cancelled", color: "#4b5563" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<TaskStatistics | null>(null);
  const [overdueTasks, setOverdueTasks] = useState<TaskItem[]>([]);
  const [recentTasks, setRecentTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    taskService.getStats().then(setStats);
    taskService.getOverdue().then(setOverdueTasks);
    taskService.getAll({ pageSize: 5 }).then((result) => {
      const sorted = [...result.items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setRecentTasks(sorted.slice(0, 5));
    });
  }, []);

  const chartData = stats && {
    labels: ["Pending", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          stats.pendingCount,
          stats.inProgressCount,
          stats.completedCount,
          stats.cancelledCount,
        ],
        backgroundColor: ["#a16207", "#1d4ed8", "#15803d", "#4b5563"],
        borderColor: "#16171C",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div>
      {stats && (
        <div className="flex gap-3 mb-3">
          <StatsCard label="Total" value={stats.totalTasks} color="#A09DF4" />
          <StatsCard
            label="Pending"
            value={stats.pendingCount}
            color="#a16207"
          />
          <StatsCard
            label="In Progress"
            value={stats.inProgressCount}
            color="#1d4ed8"
          />
          <StatsCard
            label="Completed"
            value={stats.completedCount}
            color="#15803d"
          />
          <StatsCard
            label="Cancelled"
            value={stats.cancelledCount}
            color="#4b5563"
          />
        </div>
      )}

      {overdueTasks.length > 0 && (
        <div
          className="flex justify-content-center align-items-center gap-2 p-2 mb-6"
          style={{
            backgroundColor: "#3f3c6b",
            color: "#ffffff",
            borderRadius: "6px",
          }}
        >
          <span>{overdueTasks.length} tasks overdue.</span>
        </div>
      )}

      <div className="flex gap-4">
        <div style={{ flex: 2 }}>
          <h3 className="mb-3" style={{ visibility: "hidden" }}>
            Tasks by Status
          </h3>
          <div className="flex align-items-center gap-4">
            <div style={{ maxWidth: "25em" }}>
              {chartData && (
                <Chart type="pie" data={chartData} options={chartOptions} />
              )}
            </div>
            <div className="flex flex-column gap-3">
              {statusLegend.map((item) => (
                <div key={item.label} className="flex align-items-center gap-2">
                  <span
                    style={{
                      width: "1rem",
                      height: "1rem",
                      borderRadius: "3px",
                      backgroundColor: item.color,
                    }}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 2 }}>
          <h3 className="mb-4">Recent Tasks</h3>
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-content-between align-items-center p-2 mb-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderRadius: "6px",
              }}
            >
              <span>{task.title}</span>
              <div className="flex gap-2">
                <Tag
                  value={statusTags[task.status].label}
                  style={{
                    backgroundColor: statusTags[task.status].background,
                    color: statusTags[task.status].text,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
