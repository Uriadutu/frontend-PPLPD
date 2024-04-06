import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PelatihPage = () => {
  const [pelatihs, setPelatih] = useState([]);
  const [sortBy, setSortBy] = useState("nama");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getPelatih();
  }, []);

  const getPelatih = async () => {
    const response = await axios.get("http://localhost:5000/pelatih");
    setPelatih(response.data);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredAndSortedPelatihs = pelatihs
    .filter((pelatih) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      return (
        pelatih.nama.toLowerCase().includes(lowerCaseSearchText) ||
        (pelatih.username &&
          pelatih.username.toLowerCase().includes(lowerCaseSearchText))
      );
    })
    .sort((a, b) => {
      if (sortBy === "nama") {
        return a.nama.localeCompare(b.nama);
      } else if (sortBy === "username") {
        const usernameA = a.username || "";
        const usernameB = b.username || "";
        return usernameA.localeCompare(usernameB);
      }
      return 0;
    });

    const deletePelatih = async (pelatihId) => {
      if(window.confirm('Anda ingin menghapus pelatih ini?')){
        try {
          await axios.delete(`http://localhost:5000/pelatih/${pelatihId}`);
          getPelatih();
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <div className="p-3">
      <h1 className="title  is-size-6-mobile">Pelatih</h1>
      <h2 className="subtitle  is-size-7-mobile">List Pelatih</h2>
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <div className="is-flex is-align-items-center">
          <Link to={"/dashboard"} className="button mr-3">
            Dashboard
          </Link>

          <div className="is-flex is-align-items-center">
            <label className="mr-2 is-size-7-mobile is-hidden-desktop">Urut:</label>
            <label className="mr-2 is-size-7-mobile is-hidden-mobile">Urut Berdasarkan:</label>
            <select
              className="is-normal select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="nama">Nama</option>
              <option value="username">Username</option>
            </select>
          </div>
        </div>

        <div>
          <input
            type="text"
            className="input is-normal"
            placeholder="Cari Nama / ID Username"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-scroll-mobile">

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pelatih</th>
            <th>Username</th>
            <th>Create by</th>
            <th>Cabang Olahraga</th>
            <th>Status</th>
            <th className="has-text-centered">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPelatihs.map((pelatih, index) => (
            <tr key={pelatih.id_pelatih}>
              <td>{index + 1}</td>
              <td>
                <div className="" style={{width:"130px"}}>

                {pelatih.name_awal.charAt(0).toUpperCase() +
                  pelatih.name_awal.slice(1)}{" "}
                {pelatih.nama_tengah.charAt(0).toUpperCase() +
                  pelatih.nama_tengah.slice(1)}{" "}
                {pelatih.nama_akhir.charAt(0).toUpperCase() +
                  pelatih.nama_akhir.slice(1)}
                </div>
              </td>
              <td>{pelatih.username}</td>
              <td>{pelatih && pelatih.Admin && pelatih.Admin.nama}</td>
              <td>{pelatih && pelatih.Cabor && pelatih.Cabor.namaCabor}</td>
              <td>{pelatih && pelatih.status}</td>
              <td className="has-text-centered">
                <Link
                  className="button is-danger is-small"
                  onClick={() => deletePelatih(pelatih.id_pelatih)}
                >
                  Hapus
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PelatihPage;
