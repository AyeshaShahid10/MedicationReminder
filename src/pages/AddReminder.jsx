// src/pages/AddReminder.jsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MOCK_REMINDERS } from "../mock/Reminders";

export default function AddReminder() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id"); // if present → edit mode

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");
  const [repeat, setRepeat] = useState("Daily");

  const navigate = useNavigate();

  // Load reminder data if editing
  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem("reminders");
      const reminders = saved ? JSON.parse(saved) : MOCK_REMINDERS;
      const reminder = reminders.find((r) => String(r.id) === String(editId));

      if (reminder) {
        setName(reminder.name);
        setDosage(reminder.dosage);

        // split time "08:30 PM"
        const [h, rest] = reminder.time.split(":");
        const [m, ap] = rest.split(" ");
        setHour(h);
        setMinute(m);
        setAmPm(ap);

        setRepeat(reminder.repeat);
      }
    }
  }, [editId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = `${hour}:${minute} ${ampm}`;

    // Load reminders
    const saved = localStorage.getItem("reminders");
    let reminders = saved ? JSON.parse(saved) : MOCK_REMINDERS;

    if (editId) {
      // Update existing reminder
      reminders = reminders.map((r) =>
        String(r.id) === String(editId)
          ? { ...r, name, dosage, time, repeat }
          : r
      );
    } else {
      // Add new reminder
      const newReminder = {
        id: Date.now(),
        name,
        dosage,
        time,
        repeat,
        done: false,
      };
      reminders.push(newReminder);
    }

    // Save back
    localStorage.setItem("reminders", JSON.stringify(reminders));

    navigate("/"); // go back to dashboard
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editId ? "Modify Reminder" : "Add Reminder"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-5"
      >
        {/* Medication */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Medication
          </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        {/* Dosage */}
        <div>
          <label className="block text-sm font-medium mb-1">Dosage</label>
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <div className="flex gap-2">
            {/* Hours */}
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm"
            >
              {[...Array(12).keys()].map((h) => {
                const val = String(h + 1).padStart(2, "0");
                return <option key={val}>{val}</option>;
              })}
            </select>

            {/* Minutes */}
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm"
            >
              {[...Array(60).keys()].map((m) => {
                const val = String(m).padStart(2, "0");
                return <option key={val}>{val}</option>;
              })}
            </select>

            {/* AM/PM */}
            <select
              value={ampm}
              onChange={(e) => setAmPm(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>

        {/* Repeat */}
        <div>
          <label className="block text-sm font-medium mb-1">Repeat</label>
          <select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Once</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded-lg font-medium hover:bg-blue-900 transition"
        >
          {editId ? "Update Reminder" : "Save Reminder"}
        </button>
      </form>
    </div>
  );
}
