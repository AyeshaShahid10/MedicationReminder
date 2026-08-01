import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { useReminders } from "../context/ReminderContext";
import { to24Hour, from24Hour } from "../utils/time";

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const emptyTimeSlot = () => ({ hour: "08", minute: "00", ampm: "AM" });

export default function AddReminder() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const navigate = useNavigate();
  const { reminders, addReminder, updateReminder } = useReminders();

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [days, setDays] = useState([]);
  const [onceDate, setOnceDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([emptyTimeSlot()]);
  const [pillsRemaining, setPillsRemaining] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("");

  useEffect(() => {
    if (!editId) return;
    const reminder = reminders.find((r) => r.id === editId);
    if (!reminder) return;
    setName(reminder.name);
    setDosage(reminder.dosage);
    setNotes(reminder.notes || "");
    setFrequency(reminder.frequency || "daily");
    setDays(reminder.days || []);
    setOnceDate(reminder.date || "");
    setTimeSlots((reminder.times && reminder.times.length ? reminder.times : ["08:00"]).map(from24Hour));
    setPillsRemaining(reminder.pillsRemaining ?? "");
    setLowStockThreshold(reminder.lowStockThreshold ?? "");
  }, [editId, reminders]);

  const toggleDay = (d) => {
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()));
  };

  const updateSlot = (idx, field, value) => {
    setTimeSlots((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const addSlot = () => setTimeSlots((prev) => [...prev, emptyTimeSlot()]);
  const removeSlot = (idx) => setTimeSlots((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !dosage.trim()) {
      toast.error("Please fill in the medication name and dosage");
      return;
    }
    if (frequency === "weekly" && days.length === 0) {
      toast.error("Select at least one day of the week");
      return;
    }
    if (frequency === "once" && !onceDate) {
      toast.error("Pick a date for a one-time reminder");
      return;
    }

    const times = timeSlots.map((s) => to24Hour(s.hour, s.minute, s.ampm)).sort();

    const payload = {
      name: name.trim(),
      dosage: dosage.trim(),
      notes: notes.trim(),
      frequency,
      days: frequency === "weekly" ? days : [],
      date: frequency === "once" ? onceDate : null,
      times,
      pillsRemaining: pillsRemaining === "" ? null : Number(pillsRemaining),
      lowStockThreshold: lowStockThreshold === "" ? null : Number(lowStockThreshold),
    };

    if (editId) {
      updateReminder(editId, payload);
      toast.success("Reminder updated");
    } else {
      addReminder(payload);
      toast.success("Reminder added");
    }
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-6 text-2xl font-bold">{editId ? "Edit reminder" : "New reminder"}</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium">Medication name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aspirin"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Dosage</label>
          <input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g. 100mg, 1 tablet"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900"
            required
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-sm font-medium">Reminder times</label>
            <button
              type="button"
              onClick={addSlot}
              className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:underline dark:text-teal-400"
            >
              <Plus className="h-3.5 w-3.5" /> Add time
            </button>
          </div>
          <div className="space-y-2">
            {timeSlots.map((slot, idx) => (
              <div key={idx} className="flex gap-2">
                <select
                  value={slot.hour}
                  onChange={(e) => updateSlot(idx, "hour", e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  {HOURS.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
                <select
                  value={slot.minute}
                  onChange={(e) => updateSlot(idx, "minute", e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  {MINUTES.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select
                  value={slot.ampm}
                  onChange={(e) => updateSlot(idx, "ampm", e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
                {timeSlots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(idx)}
                    aria-label="Remove time"
                    className="grid w-9 shrink-0 place-items-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Repeat</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="daily">Every day</option>
            <option value="weekly">Specific days each week</option>
            <option value="once">Once, on a specific date</option>
          </select>
        </div>

        {frequency === "weekly" && (
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleDay(idx)}
                className={`h-10 w-10 rounded-full text-xs font-semibold transition ${
                  days.includes(idx)
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {frequency === "once" && (
          <div>
            <label className="mb-1.5 block text-sm font-medium">Date</label>
            <input
              type="date"
              value={onceDate}
              onChange={(e) => setOnceDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Pills remaining</label>
            <input
              type="number"
              min="0"
              value={pillsRemaining}
              onChange={(e) => setPillsRemaining(e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Low stock alert at</label>
            <input
              type="number"
              min="0"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Take with food"
            rows={2}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-teal-600 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          {editId ? "Update reminder" : "Save reminder"}
        </button>
      </form>
    </div>
  );
}
