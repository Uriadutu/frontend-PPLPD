import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddClub = ({ Muncul, TidakMuncul }) => {
  const { id } = useParams();
  const [clubNama, setClubNama] = useState("");
  const [msg, setMsg]= useState("")
  const saveClub = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/club", {
        id_cabor: id,
        nama_club: clubNama,
      });
      window.location.reload();
      setMsg("")
    } catch (error) {
        if(error){
          setMsg(error.response.data.msg);
        }
      console.log(error);
    }
  };

  console.log(id);
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
                setMsg("")
              }}
            ></button>
          </header>
          <form onSubmit={saveClub}>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                <div className="field">
                  <label htmlFor="namaBerita" className="label">
                    Nama Club
                  </label>
                  <div className="control is-full">
                    <input
                      title="Judul Berita"
                      autoComplete="off"
                      type="text"
                      className="input"
                      aria-rowspan={10}
                      id="namaBerita"
                      value={clubNama}
                      onChange={(e) => setClubNama(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="is-flex is-align-items-center">
                <button type="submit" className="button is-success mr-3">
                  {" "}
                  Simpan
                </button>
                <p>{msg}</p>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClub;
