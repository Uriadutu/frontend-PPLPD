import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddBerita from "./modal/AddBerita.jsx";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2";
const Welcome = () => { 
  const { user } = useSelector((state) => state.auth)
  const [modalActive, setModalActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [jmlAtlet, setJumlahAtlet] = useState("0")
  const [jmlAdmin, setJumlAdmint] = useState("0")
  const [jmlPelatih, setJumlahPelatig] = useState("0")
  const [jmlCabor, setJumlahCbor] = useState("0")
  const [jmlForum, setjumlForum] = useState("0")


  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
    setMsg("");
  };
  // const data = {
  //   atlet: 200,
  //   pelatih: 65,
  //   cabangOlahraga: 90,
  // };

  const getNormalizedValue = (value) => {
    return value > 100 ? 100 : value; // Normalisasi nilai untuk tidak melebihi maksimum
  };

  const getCabor = async ()=> {
    try {
      const response = await fetch("http://localhost:5000/cabor");
      const data = await response.json();
      setJumlahCbor(data.length)
    } catch (error) {
      
    }
  }
  const getForum = async ()=> {
    try {
      const response = await fetch("http://localhost:5000/forumcabor");
      const data = await response.json();
      setjumlForum(data.length)
    } catch (error) {
      
    }
  }
  const getAtlet = async ()=> {
    try {
      const response = await fetch("http://localhost:5000/atlet");
      const data = await response.json();
      setJumlahAtlet(data.length)
    } catch (error) {
      
    }
  }
  const getPelatih = async ()=> {
    try {
      const response = await fetch("http://localhost:5000/pelatih");
      const data = await response.json();
      setJumlahPelatig(data.length)
    } catch (error) {
      
    }
  }
  const getAdmin = async ()=> {
    try {
      const response = await fetch("http://localhost:5000/admin");
      const data = await response.json();
      setJumlAdmint(data.length)
    } catch (error) {
      
    }
  }

  useEffect(()=> {
    getCabor();
    getForum();
    getAtlet();
    getPelatih();
    getAdmin();

  },[])
  console.log(jmlCabor);


  return (
    <div>
      <div className="is-flex is-justify-content-space-between mb-5">
        <div>
          <h1 className="title">Dashboard</h1>
          <h2 className="subtitle">Selamat datang di SI Atlet PPLPD</h2>
        </div>
      </div>
      {user && user.role === "Admin" && (
        <div className="columns is-multiline">
          <div className="column is-one-quarter" style={{ opacity: "70%" }}>
            <div>
              <div
                className="card"
                style={{
                  boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                  background: "#C75959",
                }}
              >
                <div className="p-2 " style={{ position: "absolute" }}>
                  <p className="title is-3 has-text-light">{jmlCabor}</p>
                  <p className="subtitle has-text-light is-6">Cabor</p>
                </div>
                <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                  <h1 className="">
                    <IoIosFootball color="#9E3131" size={110} />
                  </h1>
                </div>
                <footer className="card-footer">
                  <Link to={"/cabor"}
                    className="card-footer-item has-text-light"
                    style={{ background: "#9E3131" }}
                  >
                    <div className="has-text-centered has-text-light is-flex is-align-items-center">
                      <p className="mb-1 mr-2">Info Lengkap</p>{" "}
                      <FaRegArrowAltCircleRight />
                    </div>
                  </Link>
                </footer>
              </div>
            </div>
          </div>
          <div className="column is-one-quarter" style={{ opacity: "70%" }}>
            <div>
              <div
                className="card"
                style={{
                  boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                  background: "#6159C7",
                }}
              >
                <div className="p-2 " style={{ position: "absolute" }}>
                  <p className="title is-3 has-text-light">{jmlForum}</p>
                  <p className="subtitle has-text-light is-6">Forum</p>
                </div>
                <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                  <h1 className="">
                    <HiMiniChatBubbleLeftRight color="#313C9E" size={110} />
                  </h1>
                </div>
                <footer className="card-footer">
                  <Link
                    to={"/forum"}
                    className="card-footer-item has-text-light"
                    style={{ background: "#313C9E" }}
                  >
                    <div className="has-text-centered has-text-light is-flex is-align-items-center">
                      <p className="mb-1 mr-2">Info Lengkap</p>{" "}
                      <FaRegArrowAltCircleRight />
                    </div>
                  </Link>
                </footer>
              </div>
            </div>
          </div>
          <div className="column is-one-quarter" style={{ opacity: "70%" }}>
            <div>
              <div
                className="card"
                style={{
                  boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                  background: "#68C759",
                }}
              >
                <div className="p-2 " style={{ position: "absolute" }}>
                  <p className="title is-3 has-text-light">{jmlAtlet}</p>
                  <p className="subtitle has-text-light is-6">Atlet</p>
                </div>
                <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                  <h1 className="">
                    <HiUserGroup color="#409E31" size={110} />
                  </h1>
                </div>
                <footer className="card-footer">
                  <Link
                    to={"/daftaratlet"}
                    className="card-footer-item has-text-light"
                    style={{ background: "#409E31" }}
                  >
                    <div className="has-text-centered has-text-light is-flex is-align-items-center">
                      <p className="mb-1 mr-2">Info Lengkap</p>{" "}
                      <FaRegArrowAltCircleRight />
                    </div>
                  </Link>
                </footer>
              </div>
            </div>
          </div>
          <div className="column is-one-quarter" style={{ opacity: "70%" }}>
            <div>
              <div
                className="card"
                style={{
                  boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                  background: "#D7B04B",
                }}
              >
                <div className="p-2 " style={{ position: "absolute" }}>
                  <p className="title is-3 has-text-light">{jmlPelatih}</p>
                  <p className="subtitle has-text-light is-6">Pelatih</p>
                </div>
                <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                  <h1 className="">
                    <HiUserGroup color="#B78F29" size={110} />
                  </h1>
                </div>
                <footer className="card-footer">
                  <Link
                    to={"/daftarpelatih"}
                    className="card-footer-item has-text-light"
                    style={{ background: "#B78F29" }}
                  >
                    <div className="has-text-centered has-text-light is-flex is-align-items-center">
                      <p className="mb-1 mr-2">Info Lengkap</p>{" "}
                      <FaRegArrowAltCircleRight />
                    </div>
                  </Link>
                </footer>
              </div>
            </div>
          </div>
          <div className="column is-one-quarter" style={{ opacity: "70%" }}>
            <div>
              <div
                className="card"
                style={{
                  boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                  background: "#C75959",
                }}
              >
                <div className="p-2 " style={{ position: "absolute" }}>
                  <p className="title is-3 has-text-light">{jmlAdmin}</p>
                  <p className="subtitle has-text-light is-6">Admin</p>
                </div>
                <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                  <h1 className="">
                    <HiUserGroup color="#9E3131" size={110} />
                  </h1>
                </div>
                <footer className="card-footer">
                  <Link
                    to={"/daftaradmin"}
                    className="card-footer-item has-text-light"
                    style={{ background: "#9E3131" }}
                  >
                    <div className="has-text-centered has-text-light is-flex is-align-items-center">
                      <p className="mb-1 mr-2">Info Lengkap</p>{" "}
                      <FaRegArrowAltCircleRight />
                    </div>
                  </Link>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="columns">
        <div className="column">
          <p>Atlet</p>
          <progress
            className="progress is-primary"
            value={getNormalizedValue(data.atlet)}
            max="100"
          >
            {data.atlet}%
          </progress>
        </div>
        <div className="column">
          <p>Pelatih</p>
          <progress
            className="progress is-info"
            value={getNormalizedValue(data.pelatih)}
            max="100"
          >
            {data.pelatih}%
          </progress>
        </div>
        <div className="column">
          <p>Cabang Olahraga</p>
          <progress
            className="progress is-success"
            value={getNormalizedValue(data.cabangOlahraga)}
            max="100"
          >
            {data.cabangOlahraga}%
          </progress>
        </div>
      </div> */}
      <AddBerita isActive={modalActive} onClose={closeModal} />
    </div>
  );
};

export default Welcome;
