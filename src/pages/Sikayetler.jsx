import React, { useEffect, useMemo, useState } from "react";
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
  const [page, setPage] = useState(1);
  const pageSize = 10;

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  const handleUpdate = (id, patch) => {
    const updated = updateComplaint(id, patch);
    setComplaints(updated);
    if (selected && selected.id === id) {
      setSelected({ ...selected, ...patch });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Şikayətlər</h2>
        <p>Filtrləyin, axtarın və şikayət detalları ilə işləyin.</p>
      </div>
      <div className="section">
        <div className="section-header">
          <h3>Filtrlər</h3>
          <span>{filtered.length} nəticə</span>
        </div>
        <div className="filters">
          <div className="filter-group">
            <label>
              Mənbə
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange("source", e.target.value)}
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
                  handleFilterChange("department", e.target.value)
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
                onChange={(e) => handleFilterChange("category", e.target.value)}
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
                onChange={(e) => handleFilterChange("priority", e.target.value)}
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
                onChange={(e) => handleFilterChange("sentiment", e.target.value)}
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
                  handleFilterChange("severity_code", e.target.value)
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Şikayət, xülasə və ya filial"
            />
          </label>
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <h3>Şikayət siyahısı</h3>
          <span>
            Səhifə {page} / {totalPages}
          </span>
        </div>
        <ComplaintsTable complaints={paginated} onRowClick={setSelected} />
        <div className="pagination">
          <button
            className="ghost"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Əvvəlki
          </button>
          <div className="pagination-info">
            <span>{filtered.length} şikayət</span>
            <span>Hər səhifə: {pageSize}</span>
          </div>
          <button
            className="primary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Növbəti
          </button>
        </div>
      </div>
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
