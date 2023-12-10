import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoDisc, IoPerson } from "react-icons/io5";

function Addcabor({ isActive, onClose }) {
  useEffect(() => {}, []);

  const [namaCabor, setNamacabor] = useState("");
  const [kodeCabor, setKodecabor] = useState("");
  const [msg, setMsg] = useState("");

  const saveCabor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/cabor", {
        namaCabor: namaCabor,
        kodeCabor: kodeCabor,
      });
      onClose();
      setKodecabor("")
      setNamacabor("");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Tambah Cabang Olahraga</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                onClose();
                setMsg(""); // Mengatur pesan menjadi string kosong saat tombol ditutup
              }}
            ></button>
          </header>
          <form onSubmit={saveCabor}>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                <div className="komp">
                  <div className="field">
                    <label htmlFor="namaCabang" className="label">
                      Nama Cabang Olahraga
                    </label>
                    <div className="control">
                      <input
                        title="Nama Cabang Olahraga"
                        autoComplete="off"
                        type="text"
                        className="input"
                        id="namaCabang"
                        value={namaCabor}
                        onChange={(e) => setNamacabor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="iconCabang" className="label">
                      Kode Cabang Olahraga
                    </label>
                    <div className="control">
                      <input
                        autoComplete="off"
                        type="text"
                        title="Kode Unik"
                        className="input"
                        value={kodeCabor}
                        onChange={(e) => setKodecabor(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <p>This is a Bulma modal.</p> */}
            </section>
            <footer className="modal-card-foot">
              <div className="is-flex">
                <a
                  className="button"
                  onClick={() => {
                    onClose();
                    setMsg(""); // Mengatur pesan menjadi string kosong saat tombol ditutup
                  }}
                >
                  Batal
                </a>

                <button className="button is-success ml-4" type="submit">
                  Simpan
                </button>
                <p className="ml-3">{msg}</p>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addcabor;
