import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddBerita from "./modal/AddBerita.jsx";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PrestasiDashboard from "./FileTerpisah/PrestasiDashboard.jsx";
import DataSingkatAtlet from "./FileTerpisah/DataSingkatAtlet.jsx";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalActive, setModalActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [jmlAtlet, setJumlahAtlet] = useState("0");
  const [jmlAdmin, setJumlAdmint] = useState("0");
  const [jmlPelatih, setJumlahPelatig] = useState("0");
  const [jmlCabor, setJumlahCbor] = useState("0");
  const [jmlForum, setjumlForum] = useState("0");
  const [jmlAtletcabor, setJumlahAtletcabor] = useState("0");
  const [cabors, setCabor] = useState([]);
  const [atlets, setAtlet] = useState([]);
  const [hasilTes, setHasiltes] = useState([]);
  const [jmlKelamin, setKelamin] = useState([]);

  const idAtlet = user && user.id_atlet;
  const idCabor = user && user.id_cabor;

  const getPerkembangan = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/perkembangan/atlet/${id}`
      );
      setHasiltes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getCabor = async () => {
    try {
      const response = await fetch("http://localhost:5000/cabor");
      const data = await response.json();
      setJumlahCbor(data.length);
    } catch (error) {}
  };

  const getAllCabor = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cabor");
      setCabor(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAtletbyCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/atlet/${id}`
      );
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAtlet = async () => {
    try {
      const response = await fetch("http://localhost:5000/atlet");
      const data = await response.json();
      setJumlahAtlet(data.length);
    } catch (error) {}
  };
  const getAtletcabor = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cabor/atlet/${id}`);
      const data = await response.json();
      setJumlahAtletcabor(data.length);
    } catch (error) {}
  };
  const getForumbycabor = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/forumcabor/cabor/${id}`
      );
      const data = await response.json();
      setjumlForum(data.length);
    } catch (error) {}
  };
  const getPelatih = async () => {
    try {
      const response = await fetch("http://localhost:5000/pelatih");
      const data = await response.json();
      setJumlahPelatig(data.length);
    } catch (error) {}
  };
  const getAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin");
      const data = await response.json();
      setJumlAdmint(data.length);
    } catch (error) {}
  };

  const kelamin = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/atlet/countByGenderAndCabor/${id}`
      );
      setKelamin(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getForumbycabor(idCabor);
    getAtletcabor(idCabor);
    kelamin(idCabor);
    getAllCabor();
    getCabor();
    getAtlet();
    getAtletbyCabor(idCabor);
    getPelatih();
    getAdmin();
    getPerkembangan(idAtlet);
  }, [idAtlet]);

  const lakilaki = jmlKelamin && jmlKelamin.Laki_Laki;
  const perempuan = jmlKelamin && jmlKelamin.Perempuan;

  const data = [
    {
      name: "Atlet",
      Atlet: jmlAtlet,
    },
    {
      name: "Pelatih",
      Pelatih: jmlPelatih,
    },
    {
      name: "Admin",
      Admin: jmlAdmin,
    },
  ];

  const jmljeniskelamin = [
    {
      name: "Laki-Laki",
      "Laki-Laki": lakilaki,
    },
    {
      name: "Perempuan",
      Perempuan: perempuan,
    },
  ];
  //  const groupedData = hasilTes.reduce((acc, item) => {
  //    const { tgl, Indikator, hasilTes } = item;
  //    const namaIndikator = Indikator && Indikator.namaIndikator;

  //    if (!acc[tgl]) {
  //      acc[tgl] = { tgl };
  //    }

  //    acc[tgl][namaIndikator] = hasilTes;
  //    return acc;
  //  }, {});

  //  // Mengonversi objek hasil kelompokan ke dalam array
  //  const transformedData = Object.values(groupedData);
  // //  console.log(transformedData);

  //  const data = [];

  //  transformedData.forEach((item) => {
  //    const { tgl, ...indikatorHasil } = item;
  //    Object.entries(indikatorHasil).forEach(([indikator, hasil]) => {
  //      data.push({ tgl, indikator, hasil });
  //    });
  //  });

  //  console.log(data);

  //  const hasil = data.map((item) => [
  //     {tgl : item.tgl},
  //     {indikator : item.indikator},
  //     {nilai : item.hasil},
  //  ])

  //  console.log(hasil);

  return (
    <div>
      <div className="is-flex is-justify-content-space-between mb-2">
        <div>
          <h1 className="title is-size-6-mobile">Dashboard</h1>
          <h2 className="subtitle is-size-7-mobile">Selamat Datang Di SI Atlet PPLPD</h2>
        </div>
      </div>
      {user && (user.role === "Admin" || user.role === "SuperAdmin") && (
        <div className="">
          <div
            className=" box p-3 mb-2 pb-2"
            style={{ borderTop: "5px solid #313C9E" }}
          >
            <div className=" columns is-multiline is-mobile">
              <div
                className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                style={{ opacity: "70%" }}
              >
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
                        <IoIosFootball color="#9E3131" size={90} />
                      </h1>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={"/cabor"}
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
              <div
                className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                style={{ opacity: "70%" }}
              >
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
                        <HiUserGroup color="#409E31" size={90} />
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
              <div
                className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                style={{ opacity: "70%" }}
              >
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
                        <HiUserGroup color="#B78F29" size={90} />
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
              <div
                className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                style={{ opacity: "70%" }}
              >
                <div>
                  <div
                    className="card"
                    style={{
                      boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                      background: "#6159C7",
                    }}
                  >
                    <div className="p-2 " style={{ position: "absolute" }}>
                      <p className="title is-3 has-text-light">{jmlAdmin}</p>
                      <p className="subtitle has-text-light is-6">Admin</p>
                    </div>
                    <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                      <h1 className="">
                        <HiUserGroup color="#313C9E" size={90} />
                      </h1>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={"/daftaradmin"}
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
            </div>
          </div>
          <div className=" mt-1">
            <div className="columns is-multiline is-mobile">
              <div className="column is-full-mobile is-half-tablet is-half-desktop overflow-x-scroll-mobile">
                <div
                  style={{ borderTop: "5px solid #409E31" }}
                  className=" box overflow-x-scroll-mobile"
                >
                  <label className="label">Daftar Cabang Olahraga</label>
                  <table className="table is-bordered is-fullwidth">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Cabang Olahraga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cabors.slice(0, 5).map((cabor, index) => (
                        <tr key={cabor && cabor.id_cabor}>
                          <td>{index + 1}</td>
                          <td>{cabor && cabor.namaCabor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="column is-full-mobile is-half-tablet is-half-desktop overflow-x-scroll-mobile mt-0"
                style={{}}
              >
                <div
                  className=" box overflow-x-scroll-mobile"
                  style={{ borderTop: "5px solid #9E3131" }}
                >
                  <label htmlFor="" className="label">
                    BarChart - Aktor
                  </label>
                  <BarChart width={500} height={220} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="Atlet" fill="#409E31" />
                    <Bar dataKey="Pelatih" fill="#B78F29" />
                    <Bar dataKey="Admin" fill="#313C9E" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.role === "Pelatih" && (
        <div className="">
          <div
            className=" box p-3 mb-2 pb-2"
            style={{ borderTop: "5px solid #313C9E" }}
          >
            <div className=" columns is-multiline is-mobile">
              <div
                className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                style={{ opacity: "70%" }}
              >
                <div>
                  <div
                    className="card"
                    style={{
                      boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                      background: "#C75959",
                    }}
                  >
                    <div className="p-2 " style={{ position: "absolute" }}>
                      <p className="title is-3 has-text-light">{jmlForum}</p>
                      <p className="subtitle has-text-light is-6">Forum</p>
                    </div>
                    <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                      <h1 className="">
                        <HiMiniChatBubbleLeftRight color="#9E3131" size={90} />
                      </h1>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={"/forum"}
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
              <div
                className="column is-full-mobile is-half-tablet is-one-quarter-desktop"
                style={{ opacity: "70%" }}
              >
                <div>
                  <div
                    className="card"
                    style={{
                      boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                      background: "#68C759",
                    }}
                  >
                    <div className="p-2 " style={{ position: "absolute" }}>
                      <p className="title is-3 has-text-light">
                        {jmlAtletcabor}
                      </p>
                      <p className="subtitle has-text-light is-6">Atlet</p>
                    </div>
                    <div className="image is-flex is-justify-content-end mr-3 p-0 mt-2 ">
                      <h1 className="">
                        <HiUserGroup color="#409E31" size={90} />
                      </h1>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={"/daftaratlet-cabor"}
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
              <div className="column"></div>
            </div>
          </div>
          <div className=" p-3 mt-1">
            <div className="columns is-multiline">
              <div
                className="column mr-2 mb-0 box"
                style={{ borderTop: "5px solid #409E31" }}
              >
                <label className="label">Daftar Cabang Olahraga</label>
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Atlet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atlets.slice(0, 5).map((atlet, index) => (
                      <tr key={atlet && atlet.id_atlet}>
                        <td>{index + 1}</td>
                        <td>
                          {atlet && atlet.name_awal}{" "}
                          {atlet && atlet.nama_tengah}{" "}
                          {atlet && atlet.nama_akhir}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="column ml-2 box"
                style={{ borderTop: "5px solid #9E3131" }}
              >
                <label htmlFor="" className="label">
                  BarChart - Jenis Kelamin
                </label>
                <BarChart width={500} height={250} data={jmljeniskelamin}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Laki-Laki" fill="#409E31" />
                  <Bar dataKey="Perempuan" fill="#B78F29" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.role === "Atlet" && (
        <div className="">
          <div
            className=" box mt-5 mb-2 pb-2"
            style={{ borderTop: "5px solid #313C9E" }}
          >
            <DataSingkatAtlet />
          </div>
          <div className="m-3">
            <div className="columns is-multiline mt-3">
              <div
                className="box column is-full-mobile is-full-tablet is-full-desktop overflow-x-scroll-mobile"
                style={{ borderTop: "5px solid #409E31" }}
              >
                <label className="label">Daftar Prestasi</label>
                <PrestasiDashboard />
              </div>
            </div>
          </div>
        </div>
      )}

      <AddBerita isActive={modalActive} onClose={closeModal} />
    </div>
  );
};

export default Welcome;
