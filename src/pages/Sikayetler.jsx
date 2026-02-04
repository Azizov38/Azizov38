import React, { useMemo, useState } from "react";
import ComplaintsTable from "../components/ComplaintsTable";
import ComplaintModal from "../components/ComplaintModal";
import { getComplaints, updateComplaint } from "../data/complaints";

const Sikayetler = () => {
  const [complaints, setComplaints] = useState(getComplaints());
  const [filters, setFilters] = useState({
    source: "",
    department: "",
    category: "",
    priority: "",
    sentiment: "",
    severity_code: ""
  });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const options = useMemo(() => {
    const build = (key) =>
      Array.from(new Set(complaints.map((item) => item[key])));
    return {
      source: build("source"),
      department: build("department"),
      category: build("category"),
      priority: build("priority"),
      sentiment: build("sentiment"),
      severity_code: build("severity_code")
    };
  }, [complaints]);

  const filtered = useMemo(() => {
    return complaints.filter((item) => {
      const matchesFilters = Object.entries(filters).every(([key, value]) =>
        value ? String(item[key]) === String(value) : true
      );
      const searchValue = search.toLowerCase();
      const matchesSearch =
        item.complaint.toLowerCase().includes(searchValue) ||
        item.summary.toLowerCase().includes(searchValue) ||
        (item.branchName || "").toLowerCase().includes(searchValue);
      return matchesFilters && matchesSearch;
    });
  }, [complaints, filters, search]);

  const handleUpdate = (id, patch) => {
    const updated = updateComplaint(id, patch);
    setComplaints(updated);
    if (selected && selected.id === id) {
      setSelected({ ...selected, ...patch });
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Şikayətlər</h2>
        <p>Filtrləyin, axtarın və şikayət detalları ilə işləyin.</p>
      </div>
      <div className="filters">
        <div className="filter-group">
          <label>
            Mənbə
            <select
              value={filters.source}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, source: e.target.value }))
              }
            >
              <option value="">Hamısı</option>
              {options.source.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Departament
            <select
              value={filters.department}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, department: e.target.value }))
              }
            >
              <option value="">Hamısı</option>
              {options.department.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Kateqoriya
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">Hamısı</option>
              {options.category.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Prioritet
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              <option value="">Hamısı</option>
              {options.priority.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sentiment
            <select
              value={filters.sentiment}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sentiment: e.target.value }))
              }
            >
              <option value="">Hamısı</option>
              {options.sentiment.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Severity
            <select
              value={filters.severity_code}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, severity_code: e.target.value }))
              }
            >
              <option value="">Hamısı</option>
              {options.severity_code.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="search">
          Axtarış
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Şikayət, xülasə və ya filial"
          />
        </label>
      </div>
      <ComplaintsTable complaints={filtered} onRowClick={setSelected} />
      {selected && (
        <ComplaintModal
          complaint={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Sikayetler;
