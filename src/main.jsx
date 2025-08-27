import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';
import Setting from './pages/Setting.jsx';
import AddReminder from './pages/AddReminder.jsx';
import Layout from './components/Layout.jsx';
import History from './pages/History.jsx';
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: '/',
    element : <Layout/>,
    children: [
   {
    path: "",
    element: <Dashboard/>
  },
  {
    path: "/settings",
    element: <Setting/>
  },
  {
    path: "/add",
    element: <AddReminder/>
  },
  {
    path: "/history",
    element: <History/>
  },]}
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
  position="top-right"
  toastOptions={{
    success: {
      style: {
        background: "#d1fae5",
        color: "#065f46",
        fontWeight: "500",
      },
    },
    error: {
      style: {
        background: "#fee2e2",
        color: "#991b1b",
        fontWeight: "500",
      },
    },
  }}
/>

    <RouterProvider router={router} />
  </StrictMode>,
)
