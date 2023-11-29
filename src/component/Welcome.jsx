import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBerita from "./modal/AddBerita.jsx";

const Welcome = () => { 
  const { user } = useSelector((state) => state.auth)
  const [modalActive, setModalActive] = useState(false);
  const [msg, setMsg] = useState("");


  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
    setMsg("");
  };


  return (
    <div>
      <div className="is-flex is-justify-content-space-between mb-5">
        <div className="">
          <h1 className="title">Dashboard</h1>
          <h2 className="subtitle">Selamat datang di SI Atlet PPLPD</h2>
        </div>

        {user && user.role === "Atlet" && (
          <div
            class="media card p-1"
            style={{
              border: "1px solid #666",
            }}
          >
            <div class="media-left">
              <img
                className="image is-64x64 is-rounded"
                src={user && user.url}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "1px solid #666",
                }}
              />
            </div>
            <div class="media-content">
              <p class="title is-4">
                {user.name_awal}{""} {user.nama_tengah}{""} {user.nama_akhir}{""}
              </p>
              <p class="subtitle is-6">{user.email}</p>
            </div>
          </div>
        )}
        {user && user.role === "Admin" && (
          <button className="button" onClick={openModal}>
            Tambah Berita
          </button>
        )}
      </div>
      
      <AddBerita isActive={modalActive} onClose={closeModal} />
    </div>
  );
};

export default Welcome;
