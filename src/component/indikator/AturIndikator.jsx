import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AddKomponenModal from "../modal/Perkembangan/AddKomponenModal";

const AturIndikator = () => {
  const [komponens, setKomponen] = useState([]);
  const [cabors, setCabor] = useState("");
  const { id } = useParams();
  const [modalUsersAktif, setModalUsersAktif] = useState(false);

  const getKomponen = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/komponen/cabor/${id}`
      );
      setKomponen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/${id}`
      );
      setCabor(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const hapusKomponen = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/komponen/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKomponen(id);
    getCabor(id);
  }, [id]);

  const bukaModal = () => {
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
  };

  return (
    <div>
      <h1 className="title">Komponen</h1>
      <h2 className="subtitle">List Komponen {cabors && cabors.namaCabor}
      </h2>
      <Link className="button is-dark mb-5" to={"/cabor/komponen-indikator"}>
        Kembali
      </Link>
      <Link
        className="ml-3 button is-success"
        onClick={() => bukaModal()}
        to={`/cabor/komponen-indikator/atur/${id}?tambah-komponen`}
      >
        Tambah Komponen
      </Link>
      <div className="columns is-multiline">
        {komponens.map((komponen) => (
          <div className="column is-one-fifth" key={komponen.id_komponen}>
              <div
                className="card"
                style={{ boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)" }}
              >
            <Link to={`cabor/komponen-indikator/atur/${komponen.id_komponen}`}>
                <div className="image has-text-centered">
                  <h1 className="is-1 p-6 has-text-centered">
                    {komponen.namaKomponen}
                  </h1>
                </div>
            </Link>
            <footer className="card-footer has-background-dark">
              <button
                className="card-footer-item button is-dark has-text-light"
                onClick={() => hapusKomponen(komponen.id_komponen)} // Perbaikan di sini, kirim ID ke fungsi hapusKomponen
              >
                Hapus
              </button>
            </footer>
              </div>
          </div>
        ))}
      </div>
      <AddKomponenModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
};

export default AturIndikator;
