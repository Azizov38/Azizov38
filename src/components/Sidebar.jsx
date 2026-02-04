import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/statistika", label: "Statistika" },
  { path: "/sikayetler", label: "Şikayətlər" },
  { path: "/departamentler", label: "Departamentlər" },
  { path: "/branchlar", label: "Branchlar" },
  { path: "/qaydalar", label: "Qaydalar" },
  { path: "/ayarlar", label: "Ayarlar" }
];

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div>
          <h1>OBA Market</h1>
          <p>Şikayət Analizi</p>
        </div>
        <button className="sidebar-toggle" onClick={onToggle}>
          {isOpen ? "Bağla" : "Menyu"}
        </button>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
