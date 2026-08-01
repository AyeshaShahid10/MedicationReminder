import { Link } from "react-router-dom";
import { Pill } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
        <Pill className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
