import React from "react";

const Qaydalar = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Qaydalar</h2>
        <p>Kateqoriya və prioritet qaydaları üçün istinad.</p>
      </div>
      <div className="grid-2">
        <div className="panel">
          <h3>Kateqoriya → Departament</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Kateqoriya</th>
                <th>Departament</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>işçi_davranışı</td>
                <td>İnsan Resursları</td>
              </tr>
              <tr>
                <td>məhsul_keyfiyyəti</td>
                <td>Keyfiyyətə Nəzarət</td>
              </tr>
              <tr>
                <td>qiymət_fərqi</td>
                <td>Əməliyyat</td>
              </tr>
              <tr>
                <td>mağaza_təmizliyi</td>
                <td>Əməliyyat</td>
              </tr>
              <tr>
                <td>təklif</td>
                <td>Əməliyyat</td>
              </tr>
              <tr>
                <td>digər</td>
                <td>Əməliyyat</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Prioritet qaydaları</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Prioritet</th>
                <th>Təsvir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Təcili müdaxilə, mağazaya təsiri yüksək</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Orta risk, standart SLA daxilində</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Aşağı risk, təklif və qeydlər</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Severity kod qaydaları</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Kod</th>
                <th>Təsvir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Code Red</td>
                <td>Risk yüksək, dərhal eskalasiya</td>
              </tr>
              <tr>
                <td>Code Yellow</td>
                <td>Orta risk, 24 saat içində cavab</td>
              </tr>
              <tr>
                <td>Code Green</td>
                <td>Aşağı risk, normal izləmə</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Qaydalar;
