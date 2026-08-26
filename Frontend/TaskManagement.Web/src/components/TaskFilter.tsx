import { Dropdown } from "primereact/dropdown";
import { priorityOptions, statusOptions } from "../utils/taskTags";
import type { TaskFilter as TaskFilterType } from "../types/task";

interface TaskFilterProps {
  filter: TaskFilterType;
  onChange: (filter: TaskFilterType) => void;
}

export function TaskFilter({ filter, onChange }: TaskFilterProps) {
  return (
    <div className="flex gap-3 mb-4">
      <Dropdown
        placeholder="Status"
        value={filter.status}
        options={statusOptions}
        onChange={(e) => onChange({ ...filter, status: e.value })}
        showClear
        className="app-dropdown"
      />
      <Dropdown
        placeholder="Priority"
        value={filter.priority}
        options={priorityOptions}
        onChange={(e) => onChange({ ...filter, priority: e.value })}
        showClear
        className="app-dropdown"
      />
    </div>
  );
}
