import { useState } from "react";
import Icon from "./Icon";
import { CONTROL_CLASS } from "../theme";
import {
  EMPTY_TASK_FORM,
  PRIORITIES,
  STATUSES,
} from "../../domain/constants";
import { validateTask } from "../../domain/taskRules";

const FIELD =
  CONTROL_CLASS.replace("rounded-lg", "mt-1.5 w-full rounded-lg") +
  " placeholder:text-slate-400";

export default function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(task ?? EMPTY_TASK_FORM);
  const [errors, setErrors] = useState({});
  const editing = Boolean(task);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validateTask(form);
    if (Object.keys(found).length) return setErrors(found);
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-label={editing ? "Edit task" : "Add task"}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:max-w-md sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {editing ? "Edit task" : "Add task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Title
              <input
                autoFocus
                value={form.title}
                onChange={set("title")}
                placeholder="e.g. Design login screen"
                className={`${FIELD} ${errors.title ? "border-rose-400" : ""}`}
              />
            </label>
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
              <textarea
                rows={3}
                value={form.description}
                onChange={set("description")}
                placeholder="Add a few details (optional)"
                className={`${FIELD} resize-none ${
                  errors.description ? "border-rose-400" : ""
                }`}
              />
            </label>
            {errors.description && (
              <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium text-slate-700">
              Priority
              <select value={form.priority} onChange={set("priority")} className={FIELD}>
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Due date
              <input
                type="date"
                value={form.dueDate}
                onChange={set("dueDate")}
                className={FIELD}
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Status
            <select value={form.status} onChange={set("status")} className={FIELD}>
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {editing ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}
