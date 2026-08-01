const TONES = {
  teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function StatCard({ label, value, icon: Icon, tone = "teal" }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${TONES[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xl font-bold leading-none">{value}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}
