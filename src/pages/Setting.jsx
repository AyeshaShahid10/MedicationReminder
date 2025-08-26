// src/pages/Settings.jsx
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    // Clear localStorage/session
    localStorage.clear();
    // Redirect to login (adjust route as per your app)
    window.location.href = "/login";
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Notifications Section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Reminder Notifications</span>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              notificationsEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                notificationsEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
        <button className="px-4 py-2 text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition">
          Test Notification
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
        <h3 className="text-lg font-semibold">Profile</h3>
        <div>
          <p className="text-gray-800 font-medium">User Name</p>
          <p className="text-gray-500 text-sm">username@email.com</p>
        </div>
        <button className="px-4 py-2 text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition">
          Update Profile
        </button>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
