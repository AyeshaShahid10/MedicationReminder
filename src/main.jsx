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
    <App />
    <RouterProvider router={router} />
  </StrictMode>,
)
