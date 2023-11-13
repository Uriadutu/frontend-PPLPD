import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const AddKomponenModal = ({Muncul, tidakMuncul}) => {

    const [namaKomponen, setNamaKomponen] = useState("");
    const [msg, setMsg] = useState("");
    const {id} = useParams();

    const saveKomp = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/komponen", {
                namaKomponen : namaKomponen,
                id_cabor : id,
            });
            window.location.reload();
        } catch (error) {
            if (error.reponse) {
                setMsg(error.response.data.msg);
            }
        }
    }
  return (
    <div className={`modal ${Muncul ? "is-active" : ""}`}>
      <div className="modal-background">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Tambah Komponen</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                tidakMuncul();
                setMsg(""); // Mengatur pesan menjadi string kosong saat tombol ditutup
              }}
            ></button>
          </header>
          <form onSubmit={saveKomp}>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                <div className="komp">
                  <div className="field">
                    <label htmlFor="namaCabang" className="label">
                      Nama Komponen
                    </label>
                    <div className="control">
                      <input
                        autoComplete="off"
                        type="text"
                        className="input"
                        id="namaCabang"
                        value={namaKomponen}
                        onChange={(e) => setNamaKomponen(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="is-flex">
                <a
                  className="button"
                  onClick={() => {
                    tidakMuncul();
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

export default AddKomponenModal
