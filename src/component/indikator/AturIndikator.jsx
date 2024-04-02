import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddKomponenModal from "../modal/Perkembangan/AddKomponenModal";
import { useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";


const AturIndikator = () => {
  const [komponens, setKomponen] = useState([]);
  const [komponennya, setKomponennya] = useState([]);
  const [cabors, setCabor] = useState("");
  const { id } = useParams();
  const [modalUsersAktif, setModalUsersAktif] = useState(false);
  const [selectedPeriode, setSelectedPeriode] = useState(""); // State untuk menyimpan periode yang dipilih

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

  console.log("haha",komponennya
    );

  const getCabor = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`);
      setCabor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCabor(id);
    getKomponenByCabor(id)
   if (selectedPeriode !== "") {
     getKomponenByPeriodeAndCabor(id, selectedPeriode);
   }
    
  }, [id, selectedPeriode]);


  const hapusKomponen = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/komponen/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const bukaModal = () => {
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
  };

  const { user } = useSelector((state) => state.auth);

  const uniquePeriodes = [
    ...new Set(komponennya.map((komponen) => komponen.periode)),
  ];


  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Komponen</h1>
      <h2 className="subtitle is-size-7-mobile">
        List Komponen {cabors && cabors.namaCabor}
      </h2>
      <div className="is-flex is-align-items-center mb-5 is-justify-content-space-between">
        <div className="">
          {user && user.role !== "Pelatih" && (
            <Link className="button is-dark" to={"/cabor/komponen-indikator"}>
              Kembali
            </Link>
          )}
          {user && user.role === "Pelatih" && (
            <Link className="button" to={"/dashboard"}>
              Dashboard
            </Link>
          )}

          <Link
            className="ml-3 button is-success"
            onClick={() => bukaModal()}
            to={`/cabor/komponen-indikator/atur/${id}?tambah-komponen`}
          >
            <IoAdd />
            <p className="is-hidden-mobile">Tambah Komponen</p>
          </Link>
        </div>
        <div className="is-flex is-align-items-center ml-3 ">
          <label className="mr-2 label is-size-7-mobile">Periode :</label>
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

      <div className="columns is-multiline">
        {komponens.map((komponen) => (
          <div className="column is-one-fifth" key={komponen.id_komponen}>
            <div
              className="card"
              style={{ boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)" }}
            >
              <Link
                to={`cabor/komponen-indikator/atur/${komponen.id_komponen}`}
              >
                <div className="image has-text-centered">
                  <h1 className="is-1 p-6 has-text-centered">
                    {komponen.namaKomponen.split("-")[0].slice(0, -4)}
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
