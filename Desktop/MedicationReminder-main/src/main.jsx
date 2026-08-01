import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

import Providers from "./Providers.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddReminder from "./pages/AddReminder.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add", element: <AddReminder /> },
      { path: "history", element: <History /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#d1fae5", color: "#065f46", fontWeight: 500 } },
          error: { style: { background: "#fee2e2", color: "#991b1b", fontWeight: 500 } },
        }}
      />
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
