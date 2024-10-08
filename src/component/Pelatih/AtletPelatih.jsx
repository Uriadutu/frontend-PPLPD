import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoEye } from "react-icons/io5";

const Atletpage = () => {
  const [atlets, setAtlet] = useState([]);
  const [sortBy, setSortBy] = useState("nama");
  const [searchText, setSearchText] = useState("");
  const { user } = useSelector((state) => state.auth);

  const idCabor = user && user.Cabor && user.Cabor.id_cabor;
  useEffect(() => {
    getAtlet(idCabor);
  }, [idCabor]);

  const getAtlet = async (idcabor) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/atlet/${idcabor}`
      );
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function capitalizeWords(sentence) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Atlet</h1>
      <h2 className="subtitle is-size-7-mobile">List Atlet</h2>
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <div className="is-flex is-align-items-center">
          <Link to={"/dashboard"} className="button mr-3">
            Dashboard
          </Link>
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
              <th>Nama Atlet</th>
              <th>Cabang Olahraga</th>
              <th>Status</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {atlets.map((atlet, index) => (
              <tr key={atlet.id_atlet}>
                <td>{index + 1}</td>
                <td>
                  <div className="is-flex" style={{width:"130px"}}>
                   {capitalizeWords(atlet && atlet.name_awal)}{" "}
                    {capitalizeWords(atlet && atlet.nama_tengah)}{" "}
                  {capitalizeWords(atlet && atlet.nama_akhir)}
                  </div>
                </td>
                <td>{atlet && atlet.Cabor && atlet.Cabor.namaCabor}</td>
                <td>{capitalizeWords(atlet && atlet.status)}</td>
                <td className="has-text-centered">
                  <Link
                    className="button is-primary is-small"
                    to={`/pelatih/datadiri/atlet/${atlet && atlet.id_atlet}`}
                  >
                    Lihat
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

export default Atletpage;
