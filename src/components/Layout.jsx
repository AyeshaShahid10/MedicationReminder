import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-16">
        <Outlet />
      </main>

      {/* Footer (always at bottom) */}
      <Footer />
    </div>
  );
}

export default Layout;
