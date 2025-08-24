// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { MdHome, MdAdd, MdSettings } from "react-icons/md";

const linkBase =
  "flex flex-col items-center justify-center flex-1 py-2 text-sm transition";

export default function Footer() {
  return (
// Footer.jsx
<footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
  <div class="flex justify-around">
    <a href="/" 
       class="flex flex-col items-center py-2 text-sm text-gray-500 hover:text-blue-600 transition">
      <span class="text-lg">🏠</span>
      <span class="text-xs">Home</span>
    </a>
    <a href="/add" 
       class="flex flex-col items-center py-2 text-sm text-gray-500 hover:text-blue-600 transition">
      <span class="text-lg">➕</span>
      <span class="text-xs">Add</span>
    </a>
    <a href="/settings" 
       class="flex flex-col items-center py-2 text-sm text-gray-500 hover:text-blue-600 transition">
      <span class="text-lg">⚙️</span>
      <span class="text-xs">Settings</span>
    </a>
  </div>
</footer>

  );
}
