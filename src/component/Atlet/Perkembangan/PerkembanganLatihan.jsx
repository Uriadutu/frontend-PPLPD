import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PerkembanganLatihan = () => {
  const [atlets, setAtlet] = useState([]);
  const { id } = useParams();

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
  const idCabor = atlets && atlets.id_cabor;

  return (
    <div className="has-background-grey-light p-3 mt-5">
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
            Input Perkembangan {atlets && atlets.nama}{" "}
          </p>
        </header>
        <div
          className="card-content"
          // style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <div className="content">
            <div>
              <h2></h2>
              <div style={{ overflowX: "auto" }}>
                <h1>Uria</h1>
              </div>
            </div>
          </div>
        </div>

        <footer className="card-footer">
          <button className="card-footer-content" type="submit">
            Simpan
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PerkembanganLatihan;
