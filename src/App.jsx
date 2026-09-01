import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Statistika from "./pages/Statistika";
import Sikayetler from "./pages/Sikayetler";
import Departamentler from "./pages/Departamentler";
import Branchlar from "./pages/Branchlar";
import Qaydalar from "./pages/Qaydalar";
import Ayarlar from "./pages/Ayarlar";
import { seedMockData } from "./data/complaints";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 600 : true
  );

  useEffect(() => {
    seedMockData();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="content">
          <div className="mobile-header">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              Menyu
            </button>
            <span>OBA Market</span>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/statistika" replace />} />
            <Route path="/statistika" element={<Statistika />} />
            <Route path="/sikayetler" element={<Sikayetler />} />
            <Route path="/departamentler" element={<Departamentler />} />
            <Route path="/branchlar" element={<Branchlar />} />
            <Route path="/qaydalar" element={<Qaydalar />} />
            <Route path="/ayarlar" element={<Ayarlar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
