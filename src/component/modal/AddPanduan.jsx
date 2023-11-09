import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPanduan = ({ Muncul, TidakMuncul }) => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null); // Menyimpan objek file yang dipilih
  const [filePreview, setFilePreview] = useState(""); // Menyimpan nama file untuk ditampilkan

  useEffect(() => {}, []);

  const LoadPanduan = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(selectedFile ? selectedFile.name : ""); // Mengatur nama file untuk ditampilkan
  };

  const savePanduan = async (e) => {
    e.preventDefault();
    if (!file) {
      setMsg("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", nama);
    try {
      await axios.post("http://localhost:5000/panduan", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/panduan");
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
            <p className="modal-card-title">Tambah Panduan Pelaksanaan</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                TidakMuncul();
                setMsg("");
              }}
            ></button>
          </header>
          <form onSubmit={savePanduan}>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                <div className="komp">
                  <div className="field">
                    <label className="label">
                      Nama File
                    </label>
                    <div className="control">
                      <input
                        autoComplete="off"
                        type="text"
                        className="input"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="control">
                    <div className="file">
                      <label className="file-label">
                        <input
                          type="file"
                          name="file"
                          className="file-input"
                          onChange={LoadPanduan}
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
            </section>
            <footer className="modal-card-foot">
              <div className="is-flex">
                <a
                  className="button"
                  onClick={() => {
                    TidakMuncul();
                    setMsg("");
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

export default AddPanduan;
