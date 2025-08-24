// src/pages/AddReminder.jsx
import { useState } from "react";
import { MOCK_REMINDERS }from "../mock/Reminders"; // import the mock array

export default function AddReminder() {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");
  const [repeat, setRepeat] = useState("Daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = `${hour}:${minute} ${ampm}`;
    const newReminder = { name, dosage, time, repeat };

    // Push into the shared reminders array
     MOCK_REMINDERS.push(newReminder);

    // Reset fields
    setName("");
    setDosage("");
    setHour("08");
    setMinute("00");
    setAmPm("AM");
    setRepeat("Daily");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Reminder</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-5"
      >
        {/* Medication */}
        <div>
          <label className="block text-sm font-medium mb-1">Add Medication</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(12).keys()].map((h) => {
                const val = String(h + 1).padStart(2, "0");
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>

            {/* Minutes */}
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(60).keys()].map((m) => {
                const val = String(m).padStart(2, "0");
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>

            {/* AM/PM */}
            <select
              value={ampm}
              onChange={(e) => setAmPm(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
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
          Save Reminder
        </button>
      </form>
    </div>
  );
}
