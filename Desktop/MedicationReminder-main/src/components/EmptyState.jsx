import { Link } from "react-router-dom";
import { PlusCircle, PillBottle } from "lucide-react";

export default function EmptyState({
  title = "No reminders yet",
  message = "Add your first medication to start tracking doses and building a healthy routine.",
  ctaLabel = "Add your first reminder",
  ctaTo = "/add",
}) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/40">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
        <PillBottle className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
      <Link
        to={ctaTo}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-700"
      >
        <PlusCircle className="h-4 w-4" />
        {ctaLabel}
      </Link>
    </div>
  );
}
