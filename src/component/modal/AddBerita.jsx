import React, { useState } from 'react'
import axios from 'axios';

const AddBerita = ({isActive, onClose}) => {
    const [judul, setJudul] = useState("");
    const [isiBerita, setIsiBerita]= useState("");
    const [msg, setMsg] = useState("");


    const saveBerita = async (e)=> {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/berita", {
                judul : judul,
                isiBerita : isiBerita,
            });
            window.location.reload();

        } catch (error) {
             if (error.response) {
               setMsg(error.response.data.msg);
             }
        }
    }
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
          <form onSubmit={saveBerita}>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                <div className="komp">
                  <div className="field">
                    <label htmlFor="namaBerita" className="label">
                      Judul Berita
                    </label>
                    <div className="control">
                      <input
                        title="Judul Berita"
                        autoComplete="off"
                        type="text"
                        className="input"
                        id="namaBerita"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="iconCabang" className="label">
                      Isi Berita
                    </label>
                    <div className="control">
                      <input
                        autoComplete="off"
                        type="text"
                        className="input"
                        
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

export default AddBerita
