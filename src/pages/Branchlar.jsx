import React, { useMemo } from "react";
import { getComplaints } from "../data/complaints";

const Branchlar = () => {
  const complaints = getComplaints();

  const branches = useMemo(() => {
    const grouped = complaints.reduce((acc, item) => {
      const branch = item.branchName || "Naməlum";
      if (!acc[branch]) {
        acc[branch] = [];
      }
      acc[branch].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(([branch, items]) => {
      const categoryBreakdown = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});
      return { branch, count: items.length, categoryBreakdown };
    });
  }, [complaints]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Branchlar</h2>
        <p>Filiallar üzrə şikayət sayları və kateqoriya bölgüsü.</p>
      </div>
      <div className="grid-2">
        {branches.map((item) => (
          <div key={item.branch} className="panel">
            <div className="branch-header">
              <h3>{item.branch}</h3>
              <span>{item.count} şikayət</span>
            </div>
            <ul className="list compact">
              {Object.entries(item.categoryBreakdown).map(([key, value]) => (
                <li key={key}>
                  <span>{key}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branchlar;
