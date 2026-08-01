import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useReminders } from "../context/ReminderContext";
import { nowTime24, todayISO, formatTime, isReminderActiveOn } from "../utils/time";

/**
 * Polls every 20s for reminders whose scheduled time matches "now" and that
 * haven't been logged yet today. Surfaces an actionable in-app toast, and a
 * native browser Notification if the user has granted permission.
 */
export function useDueDoseNotifications() {
  const { reminders, getLogFor, logDose, settings } = useReminders();
  const alreadyNotified = useRef(new Set());

  useEffect(() => {
    if (!settings.notificationsEnabled) return;

    const checkDue = () => {
      const now = nowTime24();
      const date = new Date();
      const iso = todayISO(date);

      reminders.forEach((reminder) => {
        if (!isReminderActiveOn(reminder, date)) return;

        (reminder.times || []).forEach((time) => {
          if (time !== now) return;

          const key = `${reminder.id}-${time}-${iso}`;
          if (alreadyNotified.current.has(key)) return;
          if (getLogFor(reminder.id, time, iso)) return;

          alreadyNotified.current.add(key);

          toast.custom(
            (t) => (
              <div
                className={`${t.visible ? "opacity-100" : "opacity-0"} pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-4 shadow-lg transition-opacity dark:border-slate-700 dark:bg-slate-800`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none">💊</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      Time for {reminder.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {reminder.dosage} · {formatTime(time)}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          logDose(reminder, time, "taken", iso);
                          toast.dismiss(t.id);
                          toast.success(`${reminder.name} marked as taken`);
                        }}
                        className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700"
                      >
                        Mark taken
                      </button>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ),
            { duration: 15000 }
          );

          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            try {
              new Notification(`💊 Time for ${reminder.name}`, {
                body: `${reminder.dosage} · ${formatTime(time)}`,
                tag: key,
              });
            } catch {
              /* some browsers disallow this outside a service worker; ignore */
            }
          }
        });
      });
    };

    checkDue();
    const interval = setInterval(checkDue, 20000);
    return () => clearInterval(interval);
  }, [reminders, settings.notificationsEnabled, getLogFor, logDose]);
}
