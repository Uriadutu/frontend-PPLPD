import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Modal = ({ handleClose, show, children }) => {
const [judul, setJudul] =useState("")
const [isi, setIsi]= useState("")
const {idCabor} = useParams()
const [msg, setMsg] = useState("")
const createForum = async(e)=>{
    e.preventDefault();
    try {
        await axios.post("http://localhost:5000/forumcabor", {
          id_cabor: idCabor,
          judul_forum: judul,
          isi_forum: isi,
        });
        handleClose();
        setIsi("")
        setJudul("")
        // window.location.reload();
    } catch (error) {
        if(error) {
            setMsg(error.response.data.msg)
        }
    }
}
useEffect(()=> {
    
}, [])

  return (
    <div className={`modal ${show ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={() => {
          setMsg("");
          handleClose();
        }}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Tambah Post</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              setMsg("");
              handleClose();
            }}
          ></button>
        </header>
        <form onSubmit={createForum}>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Judul Post</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Judul Post"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Isi Post</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Isi Post"
                  rows={7}
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
                handleClose();
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

export default Modal;
