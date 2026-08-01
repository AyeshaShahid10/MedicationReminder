import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils/id";
import { todayISO, isReminderActiveOn } from "../utils/time";
import { SEED_REMINDERS } from "../mock/seedReminders";

const ReminderContext = createContext(null);

const DEFAULT_SETTINGS = {
  notificationsEnabled: true,
  userName: "there",
};

export function ReminderProvider({ children }) {
  const [reminders, setReminders] = useLocalStorage("medtrack-reminders", SEED_REMINDERS);
  const [history, setHistory] = useLocalStorage("medtrack-history", []);
  const [settings, setSettings] = useLocalStorage("medtrack-settings", DEFAULT_SETTINGS);

  const addReminder = useCallback(
    (reminder) => {
      const newReminder = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...reminder,
      };
      setReminders((prev) => [...prev, newReminder]);
      return newReminder;
    },
    [setReminders]
  );

  const updateReminder = useCallback(
    (id, updates) => {
      setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
    },
    [setReminders]
  );

  const deleteReminder = useCallback(
    (id) => {
      setReminders((prev) => prev.filter((r) => r.id !== id));
      setHistory((prev) => prev.filter((h) => h.reminderId !== id));
    },
    [setReminders, setHistory]
  );

  /** Record (or overwrite) a dose outcome for a given reminder/time/date. */
  const logDose = useCallback(
    (reminder, time, status, date = todayISO()) => {
      setHistory((prev) => {
        const idx = prev.findIndex(
          (h) => h.reminderId === reminder.id && h.time === time && h.date === date
        );
        const entry = {
          id: idx >= 0 ? prev[idx].id : generateId(),
          reminderId: reminder.id,
          reminderName: reminder.name,
          dosage: reminder.dosage,
          time,
          date,
          status, // "taken" | "missed"
          loggedAt: new Date().toISOString(),
        };
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = entry;
          return copy;
        }
        return [...prev, entry];
      });

      if (status === "taken" && typeof reminder.pillsRemaining === "number") {
        setReminders((prev) =>
          prev.map((r) =>
            r.id === reminder.id && typeof r.pillsRemaining === "number"
              ? { ...r, pillsRemaining: Math.max(0, r.pillsRemaining - 1) }
              : r
          )
        );
      }
    },
    [setHistory, setReminders]
  );

  const getLogFor = useCallback(
    (reminderId, time, date = todayISO()) =>
      history.find((h) => h.reminderId === reminderId && h.time === time && h.date === date),
    [history]
  );

  /** Every dose due today, across every active reminder, sorted by time. */
  const todaysSchedule = useMemo(() => {
    const date = new Date();
    const iso = todayISO(date);
    const items = [];
    reminders.forEach((r) => {
      if (!isReminderActiveOn(r, date)) return;
      (r.times || []).forEach((time) => {
        const log = history.find(
          (h) => h.reminderId === r.id && h.time === time && h.date === iso
        );
        items.push({ reminder: r, time, log });
      });
    });
    return items.sort((a, b) => a.time.localeCompare(b.time));
  }, [reminders, history]);

  const stats = useMemo(() => {
    const total = todaysSchedule.length;
    const taken = todaysSchedule.filter((i) => i.log?.status === "taken").length;
    const missed = todaysSchedule.filter((i) => i.log?.status === "missed").length;
    const pending = total - taken - missed;
    const adherence = total > 0 ? Math.round((taken / total) * 100) : 100;
    return { total, taken, missed, pending, adherence };
  }, [todaysSchedule]);

  const exportData = useCallback(
    () => JSON.stringify({ reminders, history, settings, exportedAt: new Date().toISOString() }, null, 2),
    [reminders, history, settings]
  );

  const importData = useCallback(
    (json) => {
      const data = JSON.parse(json);
      if (Array.isArray(data.reminders)) setReminders(data.reminders);
      if (Array.isArray(data.history)) setHistory(data.history);
      if (data.settings) setSettings((s) => ({ ...s, ...data.settings }));
    },
    [setReminders, setHistory, setSettings]
  );

  const clearAllData = useCallback(() => {
    setReminders([]);
    setHistory([]);
  }, [setReminders, setHistory]);

  const value = {
    reminders,
    history,
    settings,
    setSettings,
    addReminder,
    updateReminder,
    deleteReminder,
    logDose,
    getLogFor,
    todaysSchedule,
    stats,
    exportData,
    importData,
    clearAllData,
  };

  return <ReminderContext.Provider value={value}>{children}</ReminderContext.Provider>;
}

export function useReminders() {
  const ctx = useContext(ReminderContext);
  if (!ctx) throw new Error("useReminders must be used inside ReminderProvider");
  return ctx;
}
