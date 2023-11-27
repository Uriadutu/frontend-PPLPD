import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import IndikatorEdit from "./IndikatorEdit";

const PerkembanganLatihan = () => {
  const [komponens, setKomponen] = useState([]);
  const [komponennya, setKomponennya] = useState([]);
  const [indikators, setIndikator] = useState([]);
  const [atlets, setAtlet] = useState([]);
  const [modalUsersAktif, setModalUsersAktif] = useState(false);
  const { id } = useParams();
  const [selectedPeriode, setSelectedPeriode] = useState(""); // State untuk menyimpan periode yang dipilih
  const idCabor = atlets && atlets.id_cabor;
  const[hasils, setHasil] = useState([]);

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

  const getIndibyCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/indikator/cabor/${id}`
      );
      setIndikator(response.data);
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
    getIndibyCabor(idCabor);
    getKomponenByCabor(idCabor);
    if (selectedPeriode !== "") {
      getKomponenByPeriodeAndCabor(idCabor, selectedPeriode);
    }
  }, [idCabor, selectedPeriode]);

  const uniquePeriodes = [
    ...new Set(komponennya.map((komponen) => komponen && komponen.periode)),
  ];

  useEffect(() => {
    getAtlet(id);
    getHasilByAtlet(id)
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

  const bukaModal = () => {
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
  };
  const getHasilByAtlet = async (id)=> {
    try {
      const response = await axios.get(`http://localhost:5000/perkembangan/atlet/${id}`);
      setHasil(response.data);
    } catch (error) {
      console.log(error);
    }
  }

console.log(hasils, "hayy", id);
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
              <p>
                Nama : {atlets && atlets.name_awal}{" "}
                {atlets && atlets.nama_tengah} {atlets && atlets.nama_akhir}
              </p>
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
                            onClick={() => bukaModal()}
                            to={`?id=${komponen && komponen.id_komponen}`}
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
      <div
        className="card latihan-card mt-5 tampil"
        style={{ maxWidth: "100%" }}
      >
        <header className="card-header column">
          <p className="card-header-title">
            Perkembangan Latihan {atlets && atlets.name_awal}{" "}
            {atlets && atlets.nama_akhir}
          </p>
        </header>
        <div className="card-content">
          <div className="content" style={{ overflowX: "auto" }}>
            {komponens.map((komp) => (
              <div key={komp.id_komponen}>
                <h3>Komponen: {komp.namaKomponen}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Indikator</th>
                      <th>Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indikators
                      .filter(
                        (hasil) =>
                          hasil &&
                          hasil.Indikator &&
                          hasil.Indikator.Komponen &&
                          hasil.Indikator.Komponen.id_komponen ===
                            komp.id_komponen
                      )
                      .map((filteredHasil) => (
                        <tr key={filteredHasil.id_atlet}>
                          <td>
                            {filteredHasil &&
                              filteredHasil.Indikator &&
                              filteredHasil.Indikator.namaIndikator}
                          </td>
                          <td>{filteredHasil.tgl}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>

      <IndikatorEdit Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
      <div className="content">
        {komponens.map((komponen) => (
          <div key={komponen.id_komponen}>
            <h2>{komponen.namaKomponen}</h2>
            <div style={{ overflowX: "auto" }}>
              <table
                className="table is-bordered mb-5"
                style={{ minWidth: "800px" }}
              >
                <thead>
                  <tr>
                    <th colSpan={2} className="has-text-centered">
                      Nama Latihan / Tgl
                    </th>
                    {indikators
                      .filter(
                        (indiKomponen) =>
                          indiKomponen.id_komponen === komponen.id_komponen
                      )
                      .map((indiKomponenFiltered) => (
                        <th
                          key={indiKomponenFiltered.id_indikator}
                          className="is-vcentered has-text-centered"
                        >
                          {indiKomponenFiltered.namaIndikator}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 1 }).map((_, index) => (
                    <tr>
                      <td className="is-flex is-justify-content-center">
                        
                      </td>
                      <td>
                        <div className="is-flex is-justify-content-center">
                        
                        </div>
                      </td>
                      {indikators
                        .filter(
                          (indiKomponen) =>
                            indiKomponen.id_komponen === komponen.id_komponen
                        )
                        .map((indiKomponenFiltered) => (
                          <td
                            key={indiKomponenFiltered.id_indikator}
                            className=""
                          >
                            <div className="is-flex is-justify-content-center">
                              
                            </div>
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerkembanganLatihan;
