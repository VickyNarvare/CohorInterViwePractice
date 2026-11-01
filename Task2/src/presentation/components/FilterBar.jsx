import Icon from "./Icon";
import { CONTROL_CLASS } from "../theme";
import { PRIORITIES, STATUSES } from "../../domain/constants";

export default function FilterBar({ filters, onQuery, onPriority, onStatus }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          value={filters.query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search by title"
          aria-label="Search tasks by title"
          className={`${CONTROL_CLASS} w-full pl-9`}
        />
      </div>
      <select
        value={filters.priority}
        onChange={(e) => onPriority(e.target.value)}
        aria-label="Filter by priority"
        className={CONTROL_CLASS}
      >
        <option value="all">All priorities</option>
        {PRIORITIES.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label} priority
          </option>
        ))}
      </select>
      <select
        value={filters.status}
        onChange={(e) => onStatus(e.target.value)}
        aria-label="Filter by status"
        className={CONTROL_CLASS}
      >
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
