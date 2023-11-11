import React, { useState, useEffect } from "react";
import Addcabor from "./modal/Addcabor.jsx";
import ModalUsers from "./modal/ModalUsers.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Caborlist = () => {
  const [modalUsersAktif, setModalUsersAktif] = useState(false);
  const [caborr, setCabor] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [caborId, setCaborId] = useState(""); // State untuk menyimpan caborId
  const [msg, setMsg] = useState(""); // State untuk menyimpan caborId

  const navigate = useNavigate();
  const bukaModal = (id) => {
    setCaborId(id); // Atur caborId sesuai dengan id yang diklik
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
    navigate("/cabor");
    setMsg("");
  };

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
    setMsg("");

  };

  useEffect(() => {
    getCabor();
  }, []);

  const getCabor = async () => {
    const response = await axios.get("http://localhost:5000/cabor");
    // Mengambil data cabor dari respons server
    const caborData = response.data;

    // Mengambil data jumlah atlet dari server
    const atletCountResponse = await axios.get(
      "http://localhost:5000/atlet/countByCabor"
    );
    const atletCountData = atletCountResponse.data;

    // Menggabungkan data jumlah atlet dengan data cabor
    const caborWithAtletCount = caborData.map((cabor) => ({
      ...cabor,
      jumlahAtlet: atletCountData[cabor.kodeCabor] || 0,
    }));

    setCabor(caborWithAtletCount);
  };


  const { user } = useSelector((state) => state.auth);

  const backgroundStyles = {
    bg0: {
      backgroundColor: "#253069",
    },
    bg1: {
      backgroundColor: "#E6342E",
    },
    bg2: {
      backgroundColor: "#438E33",
    },
    bg3: {
      backgroundColor: "#E85A36",
    },
    txt0: {
      color: "#253069",
    },
    txt1: {
      color: "#E6342E",
    },
    txt2: {
      color: "#438E33",
    },
    txt3: {
      color: "#E85A36",
    },
  };

  
  return (
    <div>
      <h1 className="title">Cabang Olahraga</h1>
      <h2 className="subtitle">List Cabang Olahraga</h2>
      <div className="container mt-5">
        {user && user.role === "Admin" && (
          <Link to={`/cabor/komponen-indikator`} className="button mb-3">
            Komponen Dan Indikator
          </Link>
        )}
        <div className="columns is-multiline">
          {caborr.map((cabor, index) => (
            <div className="column is-one-quarter" key={cabor.id}>
              <Link
                to={`/cabor?id=${cabor.kodeCabor}`}
                onClick={() => bukaModal(cabor.kodeCabor)}
              >
                <div
                  className="card"
                  style={{ boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="p-2" style={{ position: "absolute" }}>
                    <p>{cabor.jumlahAtlet} Atlet</p>
                  </div>
                  <div className="image has-text-centered">
                    <h1
                      className="title is-1 p-6 has-text-centered"
                      style={backgroundStyles[`txt${index % 4}`]}
                    >
                      {cabor.inisialCabor}
                    </h1>
                  </div>
                  <footer
                    className="card-footer"
                    style={backgroundStyles[`bg${index % 4}`]}
                  >
                    <div className="card-footer-item has-text-light">
                      {cabor.namaCabor}
                    </div>
                  </footer>
                </div>
              </Link>
            </div>
          ))}

          {user && user.role === "Admin" && (
            <div className="column is-one-quarter">
              <div
                className="card"
                onClick={openModal}
                style={{ boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="image has-text-centered">
                  <h1 className="title is-1 p-6 has-text-centered">
                    <IoAdd />
                  </h1>
                </div>
                <footer className="card-footer">
                  <div className="card-footer-item has-background-dark has-text-light">
                    Tambah Cabor
                  </div>
                </footer>
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalUsers Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
      <Addcabor isActive={modalActive} onClose={closeModal} />
    </div>
  );
};

export default Caborlist;
