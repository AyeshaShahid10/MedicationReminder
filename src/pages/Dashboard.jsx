// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReminderCard from "../components/ReminderCard";
import EmptyState from "../components/EmptyState";
import { MOCK_REMINDERS } from "../mock/Reminders";

export default function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) {
      setReminders(JSON.parse(saved));
    } else {
      setReminders(MOCK_REMINDERS);
      localStorage.setItem("reminders", JSON.stringify(MOCK_REMINDERS));
    }
  }, []);

  const updateReminders = (updated) => {
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    updateReminders(reminders.filter((r) => r.id !== id));
  };

  const handleToggleDone = (id) => {
    updateReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, done: !r.done } : r
      )
    );
  };

  const handleModify = (id) => { navigate(`/add?id=${id}`)};

  return (
    <div className="space-y-6 pb-16">
      <header className="flex items-center justify-between">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-semibold">Welcome, User</h1>
          <p className="text-gray-500 mt-1">
            Here are your upcoming reminders
          </p>
        </div>
      </header>

      {reminders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reminders.map((r) => (
            <ReminderCard
              key={r.id}
              {...r}
              onDelete={() => handleDelete(r.id)}
              onToggleDone={() => handleToggleDone(r.id)}
              onModify={() => handleModify(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
