import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Check, X as XIcon, AlertCircle } from "lucide-react";
import { formatTime } from "../utils/time";

const PILL_COLORS = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-cyan-500",
];

function colorFor(name) {
  const sum = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PILL_COLORS[sum % PILL_COLORS.length];
}

export default function ReminderCard({ item, onMarkTaken, onMarkMissed, onDelete }) {
  const { reminder, time, log } = item;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const status = log?.status;
  const isLowStock =
    typeof reminder.pillsRemaining === "number" &&
    typeof reminder.lowStockThreshold === "number" &&
    reminder.pillsRemaining <= reminder.lowStockThreshold;

  return (
    <div
      className={`relative flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-sm transition ${
        status === "taken"
          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
          : status === "missed"
          ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
          : "border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className={`h-10 w-2.5 shrink-0 rounded-full ${colorFor(reminder.name)}`} />
        <div className="min-w-0">
          <h3
            className={`truncate font-semibold ${
              status === "taken" ? "text-slate-500 line-through dark:text-slate-400" : ""
            }`}
          >
            {reminder.name}
          </h3>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {reminder.dosage} · {formatTime(time)}
          </p>
          {isLowStock && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-3 w-3" /> Low stock: {reminder.pillsRemaining} left
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {!status ? (
          <>
            <button
              onClick={onMarkTaken}
              title="Mark as taken"
              className="grid h-9 w-9 place-items-center rounded-full bg-green-100 text-green-700 transition hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-800"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={onMarkMissed}
              title="Mark as missed"
              className="grid h-9 w-9 place-items-center rounded-full bg-red-100 text-red-700 transition hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-800"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </>
        ) : (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              status === "taken"
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
            }`}
          >
            {status === "taken" ? "Taken" : "Missed"}
          </span>
        )}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="More options"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-slate-100 bg-white text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate(`/add?id=${reminder.id}`);
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Edit reminder
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
                className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-slate-50 dark:text-red-400 dark:hover:bg-slate-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
