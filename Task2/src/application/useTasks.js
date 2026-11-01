// Application layer: use-cases. Connects UI to domain rules and the repository.
import { useCallback, useEffect, useState } from "react";
import { taskRepository } from "../data/taskRepository";
import { createTask, updateTask } from "../domain/taskRules";

export function useTasks() {
  const [tasks, setTasks] = useState(() => taskRepository.getAll());

  useEffect(() => {
    taskRepository.saveAll(tasks);
  }, [tasks]);

  const saveTask = useCallback((data) => {
    setTasks((prev) =>
      data.id
        ? prev.map((t) => (t.id === data.id ? updateTask(t, data) : t))
        : [createTask(data), ...prev]
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  return { tasks, saveTask, deleteTask, moveTask };
}
