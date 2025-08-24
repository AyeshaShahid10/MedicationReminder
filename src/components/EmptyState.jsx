import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed p-8 text-center text-gray-600 dark:text-gray-300">
      <p className="mb-3">No reminders yet.</p>
      <Link to="/add" className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white">
        + Add your first reminder
      </Link>
    </div>
  );
}
