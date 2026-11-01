import Icon from "./Icon";
import { PRIORITY_BADGE } from "../theme";
import { PRIORITIES, STATUSES } from "../../domain/constants";
import { isOverdue } from "../../domain/taskRules";

const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const overdue = isOverdue(task);
  const priority = PRIORITIES.find((p) => p.id === task.priority);

  return (
    <article
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
      className="cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition active:cursor-grabbing hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-sm font-semibold leading-snug text-slate-900">
          {task.title}
        </h3>
        <div className="flex shrink-0 gap-1 text-slate-400">
          <button
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="rounded-md p-1.5 hover:bg-slate-100 hover:text-slate-700"
          >
            <Icon name="edit" />
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
            className="rounded-md p-1.5 hover:bg-rose-50 hover:text-rose-600"
          >
            <Icon name="trash" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-1.5 line-clamp-3 break-words text-sm leading-relaxed text-slate-500">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${PRIORITY_BADGE[task.priority]}`}
        >
          {priority?.label}
        </span>
        {task.dueDate && (
          <span
            className={`inline-flex items-center gap-1 text-xs ${
              overdue ? "font-medium text-rose-600" : "text-slate-500"
            }`}
          >
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {formatDate(task.dueDate)}
            {overdue && " · Overdue"}
          </span>
        )}
      </div>

      <div className="mt-3 border-t border-slate-100 pt-3">
        <label className="flex items-center justify-between gap-2 text-xs text-slate-500">
          Move to
          <select
            value={task.status}
            onChange={(e) => onMove(task.id, e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </article>
  );
}
