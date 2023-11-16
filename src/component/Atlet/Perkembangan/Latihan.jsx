import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , Link} from "react-router-dom";

const Latihan = () => {
  const { id } = useParams();
  const [tgl, setTanggal] = useState("");
  const [hasilTes, setHasilTes] = useState("");
  const [atlets, setAtlet] = useState("");
  const [indikators, setIndikator] = useState([]);
  const [komponens, setKomponen] = useState([]);
  const [indiKomponens, setIndiKomponen] = useState([]);
  const [idKomponen, setIdKomponen] = useState(null);

  useEffect(() => {
    getAtlet(id);
    if (idKomponen) {
      getIndikatorByKomponen(idKomponen);
    }
  }, [id, idKomponen]);

  const getAtlet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/atlet/${id}`);
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const path = window.location.pathname;
  let idCabor = null;

  const match = path.match(/\/atlet\/(\d+)/);

  if (match) {
    idCabor = parseInt(match[1], 10);
  }

  const getKomponenByCabor = async (idCabor) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/komponen/cabor/${idCabor}`
      );
      setKomponen(response.data);
      const firstKomponenId =
        response.data.length > 0 ? response.data[0].id_komponen : null;
      setIdKomponen(firstKomponenId);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Id komponen :", indiKomponens);

  const getIndikatorByKomponen = async (idKomponen) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/indikator/komponen/${idKomponen}`
      );
      setIndiKomponen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIndikator = async (idCabor) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/indikator/cabor/${idCabor}`
      );
      setIndikator(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (idCabor) {
      getIndikator(idCabor);
      getKomponenByCabor(idCabor);
    }
  }, [idCabor]);

  return (
    <div>
      <h1 className="title">
        Perkembangan latihan{" "}
        {/* {indikators.length > 0 && indikators[0].namaIndikator} */}
      </h1>
      <h2 className="subtitle">Input Perkembangan Latihan Atlet</h2>
      <Link
        to={`/cabor/atlet/${idCabor}/${atlets && atlets.uuid}`}
        className="button is-dark mb-3"
      >
        Kembali
      </Link>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Input Perkembangan {atlets && atlets.nama}{" "}
          </p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div className="card-content is-overflow-auto">
          <div className="content">
            {komponens.map((komponen) => (
              <div key={komponen.id_komponen}>
                <h2>{komponen.namaKomponen}</h2>
                <div>
                  <form></form>
                  <table className="table is-bordered mb-5">
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
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr>
                          <td>
                            <input
                              type="text"
                              placeholder={`Latihan ${index + 1}...`}
                            />
                          </td>
                          <td>
                            <input type="date" name="" id="" />
                          </td>
                          {indikators
                            .filter(
                              (indiKomponen) =>
                                indiKomponen.id_komponen ===
                                komponen.id_komponen
                            )
                            .map((indiKomponenFiltered) => (
                              <td key={indiKomponenFiltered.id_indikator}>
                                <input type="text" />
                                {/* Tambahkan konten sesuai kebutuhan */}
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

        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Save
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Latihan;
