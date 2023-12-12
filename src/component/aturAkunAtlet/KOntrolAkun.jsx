import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const KontrolAkun = () => {
  const [status, setStatus] = useState({}); // State untuk menyimpan status setiap atlet
  const [atlets, setAtlets] = useState([]);
  const { idCabor } = useParams();

  useEffect(() => {
    getAtlet(idCabor);
  }, [idCabor]);


  

  const getAtlet = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/atlet/${id}`
      );
      const atletData = response.data;

      // Membuat objek status untuk setiap atlet
      const statusData = {};
      atletData.forEach((atlet) => {
        statusData[atlet.id_atlet] = atlet.status;
      });

      setStatus(statusData); // Menetapkan status awal dari database
      setAtlets(atletData); // Menetapkan data atlet
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (e, atletId) => {
    e.preventDefault();
    if (!atletId || !status[atletId]) {
      console.error("ID Atlet tidak valid atau status tidak ditemukan");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("status", status[atletId]);

      await axios.patch(`http://localhost:5000/atlet/${atletId}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      getAtlet(idCabor); // Ambil kembali data atlet setelah pembaruan
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      <h1 className="title">Pengaturan Akun</h1>
      <h2 className="subtitle">Kontrol Akun</h2>
      <Link to={"/kontrolatlet"} className="button mb-3 is-dark">
        Kembali
      </Link>
      {atlets.length === 0 ? (
        <p>Tidak ada atlet di cabor ini.</p>
      ) : (
          <form onSubmit={updateStatus}>
          <label htmlFor="" className="label">Atlet :</label>
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Status</th>
                  <td className="has-text-centered">Aksi</td>
                </tr>
              </thead>
              <tbody>
                {atlets.map((atlet, index) => {
                  const namaLengkap = `${atlet.name_awal || ""} ${
                    atlet.nama_tengah || ""
                  } ${atlet.nama_akhir || ""}`;

                  return (
                    <tr key={atlet.id_atlet}>
                      <td>{index + 1}</td>
                      <td>{namaLengkap}</td>
                      <td>{atlet.username}</td>
                      <td>
                        <select
                          className="select is-small"
                          value={status[atlet.id_atlet] || ""}
                          onChange={(e) => {
                            const newStatus = {
                              ...status,
                              [atlet.id_atlet]: e.target.value,
                            };
                            setStatus(newStatus);
                          }}
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                      </td>
                      <td className="has-text-centered">
                        <button
                          type="submit"
                          className="is-success button is-small"
                          onClick={(e) => updateStatus(e, atlet.id_atlet)}
                        >
                          Simpan
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
          </form>

      )}
      
    </div>
  );
};

export default KontrolAkun;
