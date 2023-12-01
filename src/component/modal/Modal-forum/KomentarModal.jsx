import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const KomentarModal = ({ tutupmodal, Lihat }) => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newQueryId = searchParams.get("Komen");
  const [isi, setIsi] = useState("");
  const [msg, setMsg] = useState("");
  const createForum = async (e) => {
    console.log(newQueryId, "Komen");
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/komentar", {
        id_forumCabor :newQueryId,
        isi_komen :isi,
      });
      tutupmodal();
      window.location.reload();
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };
  useEffect(() => {}, []);

  return (
    <div className={`modal ${Lihat ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={() => {
          setMsg("");
          tutupmodal();
        }}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Balasan/Komentar</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              setMsg("");
              tutupmodal();
            }}
          ></button>
        </header>
        <form onSubmit={createForum}>
          <section className="modal-card-body">
            
            <div className="field">
              <label className="label">Isi Balasan/Komentar</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Isi Post"
                  rows={10}
                  style={{ resize: "none" }}
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                ></textarea>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-success">
              Simpan
            </button>
            <a
              className="button"
              onClick={() => {
                tutupmodal();
                setMsg("");
              }}
            >
              Batal
            </a>
            <p className="ml-2">{msg}</p>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default KomentarModal;
