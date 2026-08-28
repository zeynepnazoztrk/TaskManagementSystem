import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { priorityOptions, statusOptions } from "../utils/taskTags";
import type { TaskFilter as TaskFilterType } from "../types/task";
import { Panel } from "primereact/panel";
import { Chip } from "primereact/chip";

interface TaskFilterProps {
  filter: TaskFilterType;
  onChange: (filter: TaskFilterType) => void;
}

export function TaskFilter({ filter, onChange }: TaskFilterProps) {
  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (filter.searchTerm) {
    chips.push({
      key: "search",
      label: `Search: ${filter.searchTerm}`,
      onRemove: () => onChange({ ...filter, searchTerm: undefined }),
    });
  }
  if (filter.status !== undefined) {
    chips.push({
      key: "status",
      label: `Status: ${statusOptions.find((o) => o.value === filter.status)?.label}`,
      onRemove: () => onChange({ ...filter, status: undefined }),
    });
  }
  if (filter.priority !== undefined) {
    chips.push({
      key: "priority",
      label: `Priority: ${priorityOptions.find((o) => o.value === filter.priority)?.label}`,
      onRemove: () => onChange({ ...filter, priority: undefined }),
    });
  }
  if (filter.dueDate) {
    chips.push({
      key: "dueDate",
      label: `Due: ${new Date(filter.dueDate).toLocaleDateString()}`,
      onRemove: () => onChange({ ...filter, dueDate: undefined }),
    });
  }
  return (
    <Panel header="Filters" toggleable className="mb-4">
      <div className="flex flex-column lg:flex-row gap-3 mb-4">
        <InputText
          placeholder="Search by title"
          value={filter.searchTerm ?? ""}
          onChange={(e) =>
            onChange({ ...filter, searchTerm: e.target.value || undefined })
          }
        />
        <Dropdown
          placeholder="Status"
          value={filter.status}
          options={statusOptions}
          onChange={(e) => onChange({ ...filter, status: e.value })}
          showClear
        />
        <Dropdown
          placeholder="Priority"
          value={filter.priority}
          options={priorityOptions}
          onChange={(e) => onChange({ ...filter, priority: e.value })}
          showClear
        />
        <Calendar
          placeholder="Due date"
          value={filter.dueDate ? new Date(filter.dueDate) : null}
          onChange={(e) =>
            onChange({
              ...filter,
              dueDate: e.value ? (e.value as Date).toISOString() : undefined,
            })
          }
          showIcon
        />
      </div>
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              removable
              onRemove={chip.onRemove}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
