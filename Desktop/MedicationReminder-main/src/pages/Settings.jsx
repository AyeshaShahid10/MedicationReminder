import { useRef, useState } from "react";
import { Bell, Moon, Sun, Download, Upload, Trash2, User } from "lucide-react";
import toast from "react-hot-toast";
import { useReminders } from "../context/ReminderContext";
import { useTheme } from "../context/ThemeContext";
import ConfirmModal from "../components/ConfirmModal";

export default function Settings() {
  const { settings, setSettings, exportData, importData, clearAllData } = useReminders();
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [name, setName] = useState(settings.userName || "");

  const handleToggleNotifications = async () => {
    if (!settings.notificationsEnabled && typeof Notification !== "undefined") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        toast.error("Notifications permission was denied by the browser");
        return;
      }
    }
    setSettings((s) => ({ ...s, notificationsEnabled: !s.notificationsEnabled }));
  };

  const handleTestNotification = () => {
    toast.success("This is what a reminder looks like 💊");
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("💊 Test reminder", { body: "This is what a real reminder will look like." });
    }
  };

  const handleSaveName = () => {
    setSettings((s) => ({ ...s, userName: name.trim() || "there" }));
    toast.success("Profile updated");
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medtrack-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importData(reader.result);
        toast.success("Data imported successfully");
      } catch {
        toast.error("That doesn't look like a valid backup file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Profile
        </h2>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            onClick={handleSaveName}
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Bell className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Notifications
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700 dark:text-slate-300">Reminder notifications</span>
          <button
            onClick={handleToggleNotifications}
            aria-pressed={settings.notificationsEnabled}
            className={`relative h-6 w-12 rounded-full transition-colors ${
              settings.notificationsEnabled ? "bg-teal-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                settings.notificationsEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <button
          onClick={handleTestNotification}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          Send test notification
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          ) : (
            <Sun className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          )}
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700 dark:text-slate-300">Dark mode</span>
          <button
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            className={`relative h-6 w-12 rounded-full transition-colors ${
              theme === "dark" ? "bg-teal-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold">Your data</h2>
        <button
          onClick={handleExport}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
        >
          <Download className="h-4 w-4" /> Export backup (.json)
        </button>
        <button
          onClick={handleImportClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
        >
          <Upload className="h-4 w-4" /> Import backup
        </button>
        <input type="file" accept="application/json" ref={fileInputRef} onChange={handleImportFile} className="hidden" />
        <button
          onClick={() => setConfirmClear(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" /> Clear all data
        </button>
      </section>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        MedTrack v1.0 · Your data stays on this device
      </p>

      <ConfirmModal
        open={confirmClear}
        title="Clear all data?"
        message="This permanently deletes every reminder and history entry. This cannot be undone."
        confirmLabel="Clear everything"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearAllData();
          toast.success("All data cleared");
          setConfirmClear(false);
        }}
      />
    </div>
  );
}
