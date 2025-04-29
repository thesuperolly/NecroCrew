import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@/App";

import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons

import "primeflex/primeflex.css";

import { ToastProvider } from './components/ToastContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import ManageGangs from '@/pages/ManageGangs';
import CreateGang from '@/pages/CreateGang';
import UploadData from '@/pages/UploadData';
import GangDetails from '@/pages/GangDetails';
import AddFighter from './pages/AddFighter';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage-gangs" element={<ManageGangs />} />
        <Route path="/create-gang" element={<CreateGang />} />
        <Route path="/upload-data" element={<UploadData />} />
        <Route path="/gang/:id" element={<GangDetails />} />
        <Route path="/gang/:id/add-fighter" element={<AddFighter />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
