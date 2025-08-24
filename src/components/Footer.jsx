import { NavLink } from "react-router-dom";
import { Home, PlusCircle, Settings, History } from "lucide-react";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-3 text-sm transition rounded-md
            ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"}`
          }
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Home</span>
        </NavLink>

        {/* Add */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-3 text-sm transition rounded-md
            ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"}`
          }
        >
          <PlusCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">Add</span>
        </NavLink>

        {/* History */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-3 text-sm transition rounded-md
            ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"}`
          }
        >
          <History className="w-5 h-5 mb-1" />
          <span className="text-xs">History</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-3 text-sm transition rounded-md
            ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"}`
          }
        >
          <Settings className="w-5 h-5 mb-1" />
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
