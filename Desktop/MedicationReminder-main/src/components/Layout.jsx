import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDueDoseNotifications } from "../hooks/useDueDoseNotifications";

export default function Layout() {
  useDueDoseNotifications();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 transition-colors dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6 pb-24 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
