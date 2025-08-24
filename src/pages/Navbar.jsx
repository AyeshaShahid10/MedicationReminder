// src/components/Navbar.jsx
function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="flex items-center justify-center py-3">
        <span className="text-blue-600 p-2 text-2xl font-bold tracking-wide flex items-center gap-2">
          🩺 Medication Reminder
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
