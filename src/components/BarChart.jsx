import React from "react";

const BarChart = ({ title, data }) => {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="bar-chart">
      <div className="bar-chart-header">
        <h3>{title}</h3>
      </div>
      <div className="bar-chart-body">
        {data.map((item) => (
          <div key={item.label} className="bar-row">
            <span className="bar-label">{item.label}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="bar-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
