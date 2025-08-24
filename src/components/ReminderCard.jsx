// src/components/ReminderCard.jsx
import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const pillColors = [
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
];

function ReminderCard({ id, name, time, done, onDelete, onModify, onToggleDone }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const colorClass =
    pillColors[
      name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
        pillColors.length
    ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-4 shadow-sm relative transition 
      ${done ? "bg-green-50 border border-green-200" : "bg-white"}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-3 rounded-full ${colorClass} rotate-45`}
        ></div>
        <div>
          <h3
            className={`font-semibold ${done ? "line-through text-gray-500" : ""}`}
          >
            {name}
          </h3>
          <p className="text-sm text-gray-500">{time}</p>
          {done && (
            <span className="text-green-700 text-xs font-medium mt-1 inline-block">
              ✅ Completed
            </span>
          )}
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="More options"
        >
          <BsThreeDotsVertical className="text-gray-500" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-10">
            <button
              onClick={() => {
                onDelete(id);
                setMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={() => {
                onModify(id);
                setMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              Modify
            </button>
            <button
              onClick={() => {
                onToggleDone(id);
                setMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              {done ? "Mark as undone" : "Mark as done"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReminderCard;
