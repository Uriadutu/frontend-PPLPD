import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Navbar";
import { useParams , Link} from "react-router-dom";

const Latihan = () => {
  const { id } = useParams();
  const [tgl, setTanggal] = useState("");
  const [hasilTes, setHasilTes] = useState("");
  const [namaLatihan, setNamaLatihan] = useState("");
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


  const saveLatihan = async (e)=>{
    e.preventDefault();
    const idIndi = indikators && indikators.id_indikator;

    try {
      const latihanResponse = await axios.post("http://localhost:5000:/latihan", {
        id_cabor :idCabor ,
        id_komponen : idKomponen,
        namaLatihan : namaLatihan,
      });
      const id_latihan = latihanResponse.data.id_latihan;

      await axios.post("http://localhost:5000/perkembangan", {
        id_atlet: id,
        id_indikator: idIndi,
        id_latihan: id_latihan,
        tgl: tgl,
        hasilTes: hasilTes,
      });


      
    } catch (error) {
      
    }
  }

  return (
    <div className="has-background-grey-light p-3 mt-5">
      <form onSubmit={saveLatihan}>
        <div className="mb-3">
          <Navbar />
        </div>
        <h1 className="title mt-5">
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

        <div className="card latihan-card" style={{ maxWidth: "100%" }}>
          <header className="card-header column">
            <p className="card-header-title">
              Input Perkembangan {atlets && atlets.nam_awal}
              {atlets && atlets.nama_tengah}
              {atlets && atlets.nama_akhir}{" "}
            </p>
          </header>
          <div
            className="card-content"
            // style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
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
                                indiKomponen.id_komponen ===
                                komponen.id_komponen
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
                              <input
                                value={namaLatihan}
                                onChange={(e) => setNamaLatihan(e.target.value)}
                                type="text"
                                placeholder={`Latihan...`}
                              />
                            </td>
                            <td>
                              <div className="is-flex is-justify-content-center">
                                <input
                                  value={tgl}
                                  onChange={(e) => setTanggal(e.target.value)}
                                  type="date"
                                  name=""
                                  id=""
                                />
                              </div>
                            </td>
                            {indikators
                              .filter(
                                (indiKomponen) =>
                                  indiKomponen.id_komponen ===
                                  komponen.id_komponen
                              )
                              .map((indiKomponenFiltered) => (
                                <td
                                  key={indiKomponenFiltered.id_indikator}
                                   
                                >
                                  <div className="is-flex is-justify-content-center">
                                    <input
                                      value={hasilTes}
                                      onChange={(e) =>
                                        setHasilTes(e.target.value)
                                      }
                                      type="text"
                                    />
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

          <footer className="card-footer">
            <button type="submit"></button>
          </footer>
        </div>
      </form>
    </div>
  );
};

export default Latihan;
