import { NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-md";
export default function Navbar() {
  return (
    <nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
    <span class="font-semibold text-xl text-gray-900">Medication Reminder</span>
    <div class="flex gap-6 text-sm">
      <a href="/" 
         class="px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition font-medium">
        Dashboard
      </a>
      <a href="/add" 
         class="px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition font-medium">
        Add
      </a>
      <a href="/settings" 
         class="px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition font-medium">
        Settings
      </a>
    </div>
  </div>
</nav>

  );
}
