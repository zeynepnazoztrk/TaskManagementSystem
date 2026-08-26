import { Priority, TaskStatus } from "../types/enums";

interface TagInfo {
  label: string;
  background: string;
  text: string;
}

export const priorityTags: Record<Priority, TagInfo> = {
  [Priority.Low]: {
    label: "Low",
    background: "#2f4697",
    text: "#ffffff",
  },

  [Priority.Normal]: {
    label: "Normal",
    background: "#15803d",
    text: "#ffffff",
  },

  [Priority.High]: {
    label: "High",
    background: "#b5a846",
    text: "#ffffff",
  },

  [Priority.Urgent]: {
    label: "Urgent",
    background: "#c2410c",
    text: "#ffffff",
  },

  [Priority.Critical]: {
    label: "Critical",
    background: "#981919",
    text: "#ffffff",
  },
};

export const statusTags: Record<TaskStatus, TagInfo> = {
  [TaskStatus.Pending]: {
    label: "Pending",
    background: "#a16207",
    text: "#ffffff",
  },

  [TaskStatus.InProgress]: {
    label: "In Progress",
    background: "#1d4ed8",
    text: "#ffffff",
  },

  [TaskStatus.Completed]: {
    label: "Completed",
    background: "#15803d",
    text: "#ffffff",
  },

  [TaskStatus.Cancelled]: {
    label: "Cancelled",
    background: "#4b5563",
    text: "#ffffff",
  },
};

export const priorityOptions = Object.entries(priorityTags).map(
  ([value, info]) => ({
    label: info.label,
    value: Number(value) as Priority,
  }),
);

export const statusOptions = Object.entries(statusTags).map(
  ([value, info]) => ({
    label: info.label,
    value: Number(value) as TaskStatus,
  }),
);
