// Domain layer: business vocabulary. No React, no browser APIs.

export const STATUSES = [
  { id: "todo", label: "To do" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
];

export const PRIORITIES = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export const TITLE_MAX = 80;
export const DESCRIPTION_MAX = 300;

export const EMPTY_TASK_FORM = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  status: "todo",
};
