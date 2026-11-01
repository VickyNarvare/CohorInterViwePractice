export default function EmptyState({ title, text, action }) {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{text}</p>
      {action}
    </div>
  );
}
