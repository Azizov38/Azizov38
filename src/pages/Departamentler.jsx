import React, { useMemo, useState } from "react";
import { getComplaints, updateComplaint } from "../data/complaints";

const departments = ["İnsan Resursları", "Keyfiyyətə Nəzarət", "Əməliyyat"];
const NOTE_KEY = "oba_internal_notes";

const readNotes = () => {
  const raw = localStorage.getItem(NOTE_KEY);
  return raw ? JSON.parse(raw) : {};
};

const writeNotes = (data) => {
  localStorage.setItem(NOTE_KEY, JSON.stringify(data));
};

const Departamentler = () => {
  const [complaints, setComplaints] = useState(getComplaints());
  const [activeTab, setActiveTab] = useState(departments[0]);
  const [notes, setNotes] = useState(readNotes());

  const list = useMemo(() => {
    return complaints
      .filter((item) => item.department === activeTab)
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [complaints, activeTab]);

  const handleUpdate = (id, patch) => {
    const updated = updateComplaint(id, patch);
    setComplaints(updated);
  };

  const handleNoteChange = (id, value) => {
    const updated = { ...notes, [id]: value };
    setNotes(updated);
    writeNotes(updated);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Departamentlər</h2>
        <p>Prioritet və tarixə görə sıralanmış şikayətlər.</p>
      </div>
      <div className="tabs">
        {departments.map((dept) => (
          <button
            key={dept}
            className={`tab ${activeTab === dept ? "active" : ""}`}
            onClick={() => setActiveTab(dept)}
          >
            {dept}
          </button>
        ))}
      </div>
      <div className="panel">
        {list.length === 0 && (
          <div className="empty-state">Bu departamentdə şikayət yoxdur.</div>
        )}
        {list.map((item) => (
          <div key={item.id} className="department-card">
            <div className="department-main">
              <div>
                <h4>{item.summary}</h4>
                <p>{item.complaint}</p>
                <div className="meta">
                  <span>Prioritet: {item.priority}</span>
                  <span>Status: {item.status}</span>
                  <span>
                    Tarix: {new Date(item.createdAt).toLocaleDateString("az-AZ")}
                  </span>
                </div>
              </div>
              <div className="department-actions">
                <button
                  className="ghost"
                  onClick={() => handleUpdate(item.id, { status: "resolved" })}
                >
                  Həll olundu
                </button>
                <label>
                  Prioritet
                  <select
                    value={item.priority}
                    onChange={(e) =>
                      handleUpdate(item.id, {
                        priority: Number(e.target.value)
                      })
                    }
                  >
                    {[1, 2, 3].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="note">
              <label>
                Daxili qeyd
                <textarea
                  value={notes[item.id] || ""}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                  placeholder="Daxili qeyd əlavə edin..."
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departamentler;
