// Application layer: search + filter state and derived results.
import { useMemo, useState } from "react";
import {
  DEFAULT_FILTERS,
  filterTasks,
  hasActiveFilters,
} from "../domain/taskRules";

export function useTaskFilters(tasks) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const setFilter = (key) => (value) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const filtered = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  return {
    filters,
    filtered,
    active: hasActiveFilters(filters),
    setQuery: setFilter("query"),
    setPriority: setFilter("priority"),
    setStatus: setFilter("status"),
    clear: () => setFilters(DEFAULT_FILTERS),
  };
}
