import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useReminders } from "../context/ReminderContext";
import AdherenceBarChart from "../components/AdherenceBarChart";
import EmptyState from "../components/EmptyState";
import { formatTime, pad } from "../utils/time";

function lastNDates(n) {
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d);
  }
  return dates;
}

export default function History() {
  const { history } = useReminders();
  const [filter, setFilter] = useState("all");

  const chartData = useMemo(
    () =>
      lastNDates(7).map((d) => {
        const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const entries = history.filter((h) => h.date === iso);
        const taken = entries.filter((h) => h.status === "taken").length;
        const percent = entries.length > 0 ? Math.round((taken / entries.length) * 100) : 0;
        return { label: d.toLocaleDateString(undefined, { weekday: "short" })[0], percent };
      }),
    [history]
  );

  const grouped = useMemo(() => {
    const filteredEntries = history.filter((h) => filter === "all" || h.status === filter);
    const sorted = [...filteredEntries].sort((a, b) =>
      a.date + a.time < b.date + b.time ? 1 : -1
    );
    const map = new Map();
    sorted.forEach((h) => {
      if (!map.has(h.date)) map.set(h.date, []);
      map.get(h.date).push(h);
    });
    return Array.from(map.entries());
  }, [history, filter]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Track what you've taken and missed over time.
        </p>
      </header>

      {history.length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Last 7 days
          </h2>
          <AdherenceBarChart data={chartData} />
        </div>
      )}

      {history.length === 0 ? (
        <EmptyState
          title="No history yet"
          message="Once you start marking doses as taken or missed, they'll show up here."
          ctaLabel="Go to dashboard"
          ctaTo="/"
        />
      ) : (
        <>
          <div className="flex gap-2">
            {["all", "taken", "missed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition ${
                  filter === f
                    ? "bg-teal-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {grouped.map(([date, entries]) => (
              <div key={date}>
                <h3 className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>
                <div className="space-y-2">
                  {entries.map((h) => (
                    <div
                      key={h.id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                    >
                      <div>
                        <p className="font-medium">{h.reminderName}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {h.dosage} · {formatTime(h.time)}
                        </p>
                      </div>
                      {h.status === "taken" ? (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-4 w-4" /> Taken
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                          <XCircle className="h-4 w-4" /> Missed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
