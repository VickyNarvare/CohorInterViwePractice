// Presentation layer: the page. Only wires hooks (application) to components.
import { useState } from "react";
import { useTasks } from "../application/useTasks";
import { useTaskFilters } from "../application/useTaskFilters";
import { STATUSES } from "../domain/constants";
import Icon from "./components/Icon";
import FilterBar from "./components/FilterBar";
import BoardColumn from "./components/BoardColumn";
import TaskModal from "./components/TaskModal";
import EmptyState from "./components/EmptyState";
import { PRIMARY_BTN } from "./theme";

export default function KanbanBoard() {
  const { tasks, saveTask, deleteTask, moveTask } = useTasks();
  const f = useTaskFilters(tasks);
  const [modal, setModal] = useState(null); // null | { task? }

  const completed = tasks.filter((t) => t.status === "completed").length;
  const columns = STATUSES.filter(
    (s) => f.filters.status === "all" || s.id === f.filters.status
  );

  const handleSave = (data) => {
    saveTask(data);
    setModal(null);
  };

  const handleDelete = (task) => {
    if (window.confirm(`Delete "${task.title}"? This can't be undone.`)) {
      deleteTask(task.id);
    }
  };

  const addButton = (extra = "") => (
    <button onClick={() => setModal({})} className={`${PRIMARY_BTN} ${extra}`}>
      <Icon name="plus" />
      Add task
    </button>
  );

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task board</h1>
            <p className="mt-1 text-sm text-slate-500">
              {tasks.length === 0
                ? "Nothing here yet."
                : `${completed} of ${tasks.length} tasks completed`}
            </p>
          </div>
          {addButton()}
        </header>

        <FilterBar
          filters={f.filters}
          onQuery={f.setQuery}
          onPriority={f.setPriority}
          onStatus={f.setStatus}
        />

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            text="Add your first task to start planning. You can drag cards between columns as work moves forward."
            action={addButton("mt-5")}
          />
        ) : f.filtered.length === 0 ? (
          <EmptyState
            title="No matching tasks"
            text="Try a different search or remove a filter."
            action={
              <button
                onClick={f.clear}
                className="mt-5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <div
            className={`mt-6 grid gap-5 ${
              columns.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
            }`}
          >
            {columns.map((status) => (
              <BoardColumn
                key={status.id}
                status={status}
                tasks={f.filtered.filter((t) => t.status === status.id)}
                filtersActive={f.active}
                onEdit={(task) => setModal({ task })}
                onDelete={handleDelete}
                onMove={moveTask}
              />
            ))}
          </div>
        )}
      </div>

      {modal && (
        <TaskModal
          task={modal.task}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
