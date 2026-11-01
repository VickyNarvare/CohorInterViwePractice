// Domain layer: pure business rules for tasks. Easy to unit test.
import { TITLE_MAX, DESCRIPTION_MAX } from "./constants";

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function createTask(data) {
  return {
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
    id: uid(),
    createdAt: Date.now(),
  };
}

export function updateTask(task, data) {
  return {
    ...task,
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
  };
}

export function validateTask(form) {
  const errors = {};
  const title = form.title.trim();
  if (!title) errors.title = "Enter a title for this task.";
  else if (title.length > TITLE_MAX)
    errors.title = `Keep the title under ${TITLE_MAX} characters.`;
  if (form.description.length > DESCRIPTION_MAX)
    errors.description = `Keep the description under ${DESCRIPTION_MAX} characters.`;
  return errors;
}

export function isOverdue(task) {
  if (!task.dueDate || task.status === "completed") return false;
  const today = new Date().toISOString().slice(0, 10);
  return task.dueDate < today;
}

export const DEFAULT_FILTERS = { query: "", priority: "all", status: "all" };

export function hasActiveFilters(f) {
  return f.query.trim() !== "" || f.priority !== "all" || f.status !== "all";
}

export function filterTasks(tasks, { query, priority, status }) {
  const q = query.trim().toLowerCase();
  return tasks.filter(
    (t) =>
      (!q || t.title.toLowerCase().includes(q)) &&
      (priority === "all" || t.priority === priority) &&
      (status === "all" || t.status === status)
  );
}
