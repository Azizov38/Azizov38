import React from "react";

const ComplaintsTable = ({ complaints, onRowClick }) => {
  return (
    <div className="table-wrapper">
      <table className="complaints-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Müştəri</th>
            <th>Mənbə</th>
            <th>Departament</th>
            <th>Kateqoriya</th>
            <th>Prioritet</th>
            <th>Status</th>
            <th>Filial</th>
            <th>Tarix</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item.id} onClick={() => onRowClick(item)}>
              <td>{item.id}</td>
              <td>{item.customer_name}</td>
              <td>{item.source}</td>
              <td>{item.department}</td>
              <td>{item.category}</td>
              <td>
                <span className={`priority-badge priority-${item.priority}`}>
                  P{item.priority}
                </span>
              </td>
              <td>
                <span className={`status-badge status-${item.status}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.branchName || "Naməlum"}</td>
              <td>{new Date(item.createdAt).toLocaleDateString("az-AZ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {complaints.length === 0 && (
        <div className="empty-state">Heç bir şikayət tapılmadı.</div>
      )}
    </div>
  );
};

export default ComplaintsTable;
