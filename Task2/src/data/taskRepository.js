// Data layer: the ONLY place that knows tasks live in localStorage.
// To switch to a real API later, change this file and nothing else.

const STORAGE_KEY = "kanban-tasks-v1";

export const taskRepository = {
  getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveAll(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or unavailable */
    }
  },
};
