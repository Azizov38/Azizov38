import React, { useEffect, useState } from "react";
import StatCards from "../components/StatCards";
import BarChart from "../components/BarChart";
import { getComplaints } from "../data/complaints";

const groupCounts = (items, key) => {
  return items.reduce((acc, item) => {
    const value = item[key] || "Naməlum";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

const mapToChartData = (grouped) =>
  Object.entries(grouped).map(([label, value]) => ({ label, value }));

const Statistika = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const total = complaints.length;
  const bySource = mapToChartData(groupCounts(complaints, "source"));
  const byDepartment = mapToChartData(groupCounts(complaints, "department"));
  const byCategory = mapToChartData(groupCounts(complaints, "category"));
  const byPriority = mapToChartData(groupCounts(complaints, "priority"));
  const bySeverity = mapToChartData(groupCounts(complaints, "severity_code"));

  const lastTen = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Statistika</h2>
        <p>Ümumi göstəricilər və son şikayətlər.</p>
      </div>
      <StatCards
        items={[
          { label: "Ümumi şikayətlər", value: total },
          {
            label: "Yeni şikayətlər",
            value: complaints.filter((item) => item.status === "new").length
          },
          {
            label: "Həll olunmuş",
            value: complaints.filter((item) => item.status === "resolved").length
          }
        ]}
      />
      <div className="grid-2">
        <BarChart title="Mənbə üzrə" data={bySource} />
        <BarChart title="Departament üzrə" data={byDepartment} />
        <BarChart title="Kateqoriya üzrə" data={byCategory} />
        <BarChart title="Prioritet üzrə" data={byPriority} />
        <BarChart title="Severity üzrə" data={bySeverity} />
      </div>
      <div className="panel">
        <h3>Son 10 şikayət</h3>
        <ul className="list">
          {lastTen.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.summary}</strong>
                <span>{item.branchName || "Naməlum"}</span>
              </div>
              <span>{new Date(item.createdAt).toLocaleDateString("az-AZ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistika;
