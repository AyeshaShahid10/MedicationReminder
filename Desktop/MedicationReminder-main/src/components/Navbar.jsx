import { Link } from "react-router-dom";
import { Pill, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useReminders } from "../context/ReminderContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { stats } = useReminders();

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-teal-600 dark:text-teal-400">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white shadow-sm">
            <Pill className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">MedTrack</span>
        </Link>

        <div className="flex items-center gap-3">
          {stats.total > 0 && (
            <span className="hidden items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 sm:inline-flex dark:bg-teal-900/30 dark:text-teal-300">
              {stats.adherence}% today
            </span>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
