import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PerkembanganLatihan = () => {
  const [komponens, setKomponen] = useState([]);
  const [komponennya, setKomponennya] = useState([]);
  const [atlets, setAtlet] = useState([]);
  const { id } = useParams();
  const [selectedPeriode, setSelectedPeriode] = useState(""); // State untuk menyimpan periode yang dipilih

  const idCabor = atlets && atlets.id_cabor;

  const handleSelectChange = (e) => {
    setSelectedPeriode(e.target.value);
  };
  const getKomponenByPeriodeAndCabor = async (id, periode) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/komponen/periode/${id}/${periode}`
      );
      setKomponen(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getKomponenByCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/komponen/cabor/${id}`
      );
      setKomponennya(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getKomponenByCabor(idCabor);
    if (selectedPeriode !== "") {
      getKomponenByPeriodeAndCabor(idCabor, selectedPeriode);
    }
  }, [idCabor, selectedPeriode]);

  console.log(komponens);

  const uniquePeriodes = [
    ...new Set(komponennya.map((komponen) => komponen.periode)),
  ];

  useEffect(() => {
    getAtlet(id);
  }, [id]);

  const getAtlet = async (idatlet) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/atlet/${idatlet}`
      );
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="has-background-grey-light p-3 mt-5">
      <div className="mb-3">
        <Navbar />
      </div>
      <h1 className="title mt-5">Perkembangan latihan</h1>
      <h2 className="subtitle">Input Perkembangan Latihan Atlet</h2>
      <div className="is-flex is-align-items-center mb-3">
        <Link
          to={`/cabor/atlet/${idCabor}/${atlets && atlets.uuid}`}
          className="button is-dark"
        >
          Kembali
        </Link>
        <div className="is-flex is-align-items-center ml-3">
          <label className="mr-2 label">Periode :</label>
          <select className="select" onChange={handleSelectChange}>
            <option value={komponennya.periode}></option>
            {uniquePeriodes.map((periode, index) => (
              <option key={index} value={periode}>
                {periode}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card latihan-card" style={{ maxWidth: "100%" }}>
        <header className="card-header column">
          <p className="card-header-title">Input Perkembangan</p>
        </header>
        <div
          className="card-content"
          // style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <div className="content">
            <div>
              <p>Nama : {atlets && atlets.nama}</p>
              <p>Jenis Kelamin : {atlets.kelamin}</p>
              <p>Cabor : {atlets && atlets.Cabor && atlets.Cabor.namaCabor}</p>

              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Komponen</th>
                      <th className="has-text-centered">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {komponens.map((komponen, index) => (
                      <tr key={komponen && komponen.id_komponen}>
                        <td>{index + 1}</td>
                        <td>{komponen && komponen.namaKomponen}</td>
                        <td className="has-text-centered">
                          <Link
                            className="button is-small"
                            to={`/komponen-indikator/${atlets.uuid}/${id}/${
                              komponen && komponen.id_komponen
                            }`}
                          >
                            Atur
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganLatihan;
