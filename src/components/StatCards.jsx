import React from "react";

const StatCards = ({ items }) => {
  return (
    <div className="stat-cards">
      {items.map((item) => (
        <div key={item.label} className="stat-card">
          <span className="stat-label">{item.label}</span>
          <span className="stat-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
