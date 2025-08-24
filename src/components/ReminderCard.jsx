// src/components/ReminderCard.jsx
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

// Pick pill colors for different medicines
const pillColors = [
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
];

function ReminderCard({ name, time, onDelete, onModify, onDone }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Assign color based on hash of medicine name
  const colorClass =
    pillColors[
      name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
        pillColors.length
    ];

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm relative">
      {/* Left Section with pill icon and text */}
      <div className="flex items-center gap-3">
        {/* Slanted pill icon */}
        <div
          className={`w-6 h-3 rounded-full ${colorClass} rotate-45`}
        ></div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="More options"
        >
          <BsThreeDotsVertical className="text-gray-500" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-10">
            <button
              onClick={onDelete}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={onModify}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              Modify
            </button>
            <button
              onClick={onDone}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              Mark as done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReminderCard;
