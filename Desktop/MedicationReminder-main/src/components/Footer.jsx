import { NavLink } from "react-router-dom";
import { Home, PlusCircle, History, Settings } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/add", label: "Add", icon: PlusCircle, end: false },
  { to: "/history", label: "History", icon: History, end: false },
  { to: "/settings", label: "Settings", icon: Settings, end: false },
];

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-5xl justify-around">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-2.5 text-xs font-medium transition ${
                isActive
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </footer>
  );
}
