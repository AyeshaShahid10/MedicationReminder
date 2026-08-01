import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Search, ListChecks, CheckCircle2, XCircle, Percent } from "lucide-react";
import { useReminders } from "../context/ReminderContext";
import ReminderCard from "../components/ReminderCard";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import ConfirmModal from "../components/ConfirmModal";
import { getGreeting } from "../utils/time";

export default function Dashboard() {
  const { reminders, todaysSchedule, stats, logDose, deleteReminder, settings } = useReminders();
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return todaysSchedule;
    const q = query.toLowerCase();
    return todaysSchedule.filter((i) => i.reminder.name.toLowerCase().includes(q));
  }, [todaysSchedule, query]);

  const upcoming = filtered.filter((i) => !i.log);
  const done = filtered.filter((i) => i.log);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {getGreeting()}, {settings.userName || "there"} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {stats.total === 0
            ? "You have no medications scheduled today."
            : stats.pending === 0
            ? "All doses handled for today. Nice work."
            : `You have ${stats.pending} dose${stats.pending === 1 ? "" : "s"} left to take today.`}
        </p>
      </header>

      {reminders.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Today's doses" value={stats.total} icon={ListChecks} tone="teal" />
          <StatCard label="Taken" value={stats.taken} icon={CheckCircle2} tone="green" />
          <StatCard label="Missed" value={stats.missed} icon={XCircle} tone="red" />
          <StatCard label="Adherence" value={`${stats.adherence}%`} icon={Percent} tone="amber" />
        </div>
      )}

      {reminders.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your medications…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      )}

      {reminders.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <p className="font-medium">No medications match "{query}"</p>
          <button onClick={() => setQuery("")} className="mt-2 text-sm text-teal-600 hover:underline dark:text-teal-400">
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {upcoming.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Up next
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {upcoming.map((item) => (
                  <ReminderCard
                    key={`${item.reminder.id}-${item.time}`}
                    item={item}
                    onMarkTaken={() => {
                      logDose(item.reminder, item.time, "taken");
                      toast.success(`${item.reminder.name} marked as taken`);
                    }}
                    onMarkMissed={() => {
                      logDose(item.reminder, item.time, "missed");
                      toast(`${item.reminder.name} marked as missed`, { icon: "⚠️" });
                    }}
                    onDelete={() => setDeleteTarget(item.reminder)}
                  />
                ))}
              </div>
            </section>
          )}

          {done.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Completed today
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {done.map((item) => (
                  <ReminderCard
                    key={`${item.reminder.id}-${item.time}`}
                    item={item}
                    onMarkTaken={() => {}}
                    onMarkMissed={() => {}}
                    onDelete={() => setDeleteTarget(item.reminder)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete reminder?"
        message={`This permanently removes "${deleteTarget?.name}" and its dose history.`}
        confirmLabel="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteReminder(deleteTarget.id);
          toast.success("Reminder deleted");
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
