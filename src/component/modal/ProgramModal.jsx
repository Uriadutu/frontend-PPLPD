import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProgramModal = ({ Muncul, tidakMuncul }) => {
  const { id } = useParams();
  const [namaKomponen, setNamaKomponen] = useState("");
  const [filePreview, setFilePreview] = useState(""); // Menyimpan nama file untuk ditampilkan

  const [namaProgram, setNamaProgram] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState("");

  const LoadProgram = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(selectedFile ? selectedFile.name : ""); // Mengatur nama file untuk ditampilkan
  };
  const saveProgram = async (e) => {
    e.preventDefault();
    if (!File) {
      setMsg("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", namaProgram);
    formData.append("id_cabor", id);
    try {
      await axios.post("http://localhost:5000/program", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      //  navigate("/panduan");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`modal ${Muncul ? "is-active" : ""}`}>
      <div className="modal-background">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Tambah Program</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                tidakMuncul();
                setMsg(""); // Mengatur pesan menjadi string kosong saat tombol ditutup
              }}
            ></button>
          </header>
          <form onSubmit={saveProgram}>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                <div className="komp">
                  <div className="field">
                    <label htmlFor="namaCabang" className="label">
                      Nama Program
                    </label>
                    <div className="control">
                      <input
                        autoComplete="off"
                        type="text"
                        className="input"
                        id="namaCabang"
                        value={namaProgram}
                        onChange={(e) => setNamaProgram(e.target.value)}
                      />
                    </div>
                    <div className="control">
                      <div className="file">
                        <label className="file-label">
                          <input
                            type="file"
                            name="file"
                            className="file-input"
                            onChange={LoadProgram}
                          />
                          <span className="file-cta">
                            <span className="file-label">Pilih File</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    {filePreview && (
                      <p className="mt-2">File yang dipilih: {filePreview}</p>
                    )}
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
};

export default ProgramModal
{}