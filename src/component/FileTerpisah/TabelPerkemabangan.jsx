// KomponenTable.js
import React from "react";

const TabelPerkembangan = ({
  komponen,
  hasils,
  uniqueIndikators,
  groupHasilByTanggal
}) => {
  return (
    <div className="content mt-3">
      <div className="box card">
        <h3 className="subtitle">{komponen}</h3>
        {hasils.length > 0 ? (
          <table className="table is-bordered is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Tgl Latihan</th>
                {uniqueIndikators
                  .filter((indikator) =>
                    hasils.find(
                      (hasil) =>
                        hasil.Indikator.Komponen.namaKomponen === komponen &&
                        hasil.Indikator.namaIndikator === indikator
                    )
                  )
                  .map((indikator, index) => (
                    <th key={index}>{indikator}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupHasilByTanggal(hasils)).map(
                ([tgl, hasilByTanggal], index) => (
                  <tr key={index}>
                    {hasilByTanggal &&
                      hasilByTanggal[0] &&
                      hasilByTanggal[0].Indikator.Komponen.namaKomponen ===
                        komponen && <td>{tgl}</td>}
                    {uniqueIndikators
                      .filter((indikator) =>
                        hasilByTanggal.find(
                          (hasil) =>
                            hasil.Indikator.Komponen.namaKomponen ===
                              komponen &&
                            hasil.Indikator.namaIndikator === indikator
                        )
                      )
                      .map((indikator, index) => (
                        <td key={index}>
                          {hasilByTanggal
                            .filter(
                              (hasil) =>
                                hasil.Indikator.Komponen.namaKomponen ===
                                  komponen &&
                                hasil.Indikator.namaIndikator === indikator &&
                                hasil.tgl === tgl
                            )
                            .map((hasil, index) => (
                              <div key={index}>{hasil.hasilTes}</div>
                            ))}
                        </td>
                      ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p>Tidak ada data yang tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default TabelPerkembangan;
