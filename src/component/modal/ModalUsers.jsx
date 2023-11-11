import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom"; // Import useLocation
import User from "../../img/Person.png";
import axios from "axios";
import { IoDice, IoPerson, IoTrashOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
const ModalUsers = ({ Muncul, tidakMuncul }) => {
  const [caborr, setCabor] = useState([]); // Mengubah tipe data caborr menjadi array
  const { id } = useParams();
  const [namaCabor, setNamacabor] = useState("");
  const [msg, setMsg] = useState("");
  const location = useLocation(); // Gunakan useLocation untuk mengambil lokasi saat ini

  const {user} =  useSelector((state) => state.auth);
  const [atlet, setAtlet] = useState("");


  const [queryId, setQueryId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQueryId = searchParams.get("id");
    getAtlet();
    if (newQueryId) {
      getCaborById(newQueryId);
      setQueryId(newQueryId); // Simpan ID cabor dalam state lokal
    }
  }, [location]);

  const getAtlet = async () => {
    try {
      const response = await axios.get("http://localhost:5000/atlet" ) 
      setAtlet(response.data);
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  }
  const getCaborById = async (queryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/${queryId}`
      );
      setCabor(response.data);
      setNamacabor(response.data.namaCabor);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const deleteCabor = async (queryId) => {
    try {
      await axios.delete(`http://localhost:5000/komponen/cabor/${queryId}`);
      tidakMuncul();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className={`modal ${Muncul ? "is-active" : ""}`}>
      <div className="modal-background">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{namaCabor}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                tidakMuncul();
                setMsg(""); // Mengatur pesan menjadi string kosong saat tombol ditutup
              }}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="is-flex p-3">
              <div className="container">
                <div className="columns is-full is-multiline is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
                  <div className="is-flex p-3">
                    <Link to={`/cabor/atlet/${queryId}`} className="column">
                      <div
                        className="card"
                        style={{
                          boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                          border: "solid 1px black",
                        }}
                      >
                        <div className="header p-2 m-0">
                          <p>Atlet</p>
                        </div>
                        <img
                          src={User}
                          className="mb-0 p-0 image is-128x128"
                          style={{ opacity: "0.7" }}
                        />
                        <a
                          className="card-footer-item button is-dark m-0"
                          style={{ borderRadius: "0px" }}
                        >
                          Atlet
                        </a>
                      </div>
                    </Link>
                    <Link to={`/cabor/atlet/${queryId}`} className="column">
                      <div
                        className="card"
                        style={{
                          boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                          border: "solid 1px black",
                        }}
                      >
                        <div className="header p-2 m-0">
                          <p>Pelatih</p>
                        </div>
                        <img
                          src={User}
                          className="mb-0 p-0 image is-128x128"
                          style={{ opacity: "0.7" }}
                        />
                        <a
                          className="card-footer-item button is-dark m-0"
                          style={{ borderRadius: "0px" }}
                        >
                          Pelatih
                        </a>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            {user && user.role === "Admin" && (
              <div className="">
                <button
                  className="button is-danger"
                  onClick={() => deleteCabor(queryId)}
                >
                  <IoTrashOutline /> Hapus {caborr.namaCabor}
                </button>
                <p>{msg}</p>
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ModalUsers;
