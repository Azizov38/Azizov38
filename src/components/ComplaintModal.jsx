import React, { useState } from "react";

const departments = ["İnsan Resursları", "Keyfiyyətə Nəzarət", "Əməliyyat"];
const statuses = ["new", "in_progress", "resolved"];

const ComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [status, setStatus] = useState(complaint.status);
  const [department, setDepartment] = useState(complaint.department);

  const handleSave = () => {
    onUpdate(complaint.id, { status, department });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(complaint, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${complaint.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>Şikayət Detalı</h2>
          <button onClick={onClose}>Bağla</button>
        </div>
        <div className="modal-body">
          <div className="modal-grid">
            <div>
              <span className="modal-label">Müştəri</span>
              <p>{complaint.customer_name}</p>
            </div>
            <div>
              <span className="modal-label">Əlaqə</span>
              <p>{complaint.contactNumber || "Yoxdur"}</p>
            </div>
            <div>
              <span className="modal-label">Mənbə</span>
              <p>{complaint.source}</p>
            </div>
            <div>
              <span className="modal-label">Filial</span>
              <p>{complaint.branchName || "Naməlum"}</p>
            </div>
            <div>
              <span className="modal-label">Prioritet</span>
              <p>{complaint.priority}</p>
            </div>
            <div>
              <span className="modal-label">Severity</span>
              <p>{complaint.severity_code}</p>
            </div>
            <div>
              <span className="modal-label">Sentiment</span>
              <p>{complaint.sentiment}</p>
            </div>
            <div>
              <span className="modal-label">Kateqoriya</span>
              <p>{complaint.category}</p>
            </div>
          </div>
          <div className="modal-section">
            <span className="modal-label">Qısa xülasə</span>
            <p>{complaint.summary}</p>
          </div>
          <div className="modal-section">
            <span className="modal-label">Tam şikayət</span>
            <p>{complaint.complaint}</p>
          </div>
          <div className="modal-actions">
            <label>
              Status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Departament
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <button className="primary" onClick={handleSave}>
              Dəyişiklikləri yadda saxla
            </button>
            <button className="ghost" onClick={handleExport}>
              JSON export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
