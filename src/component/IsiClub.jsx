import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import AddPembimbing from "./modal/AddPembimbing";

const IsiClub = () => {
  const { idCabor } = useParams();
  const [club, setClub] = useState([]);
  const {idClub} = useParams();
  const [atlets, setAtlet]= useState([]);
  const [clubnol, setClubnol] = useState([]);
  const [clubisi, setClubisi] = useState([]);
  const [modalAktif, setmodalAktif] = useState(false);
  const [pelatihs, setPelatih] = useState([])

  const TutupModal = () => {
    setmodalAktif(false);
    getClub(idClub);
    getAtletbyCabor(idCabor);
    getAtletbyclubnol(clubsnol);
    getAtletbyclubisi(clubsisi);
    getPelatihbyClub(clubsisi)
  };

  const bukaModal = () => {
    setmodalAktif(true);
  };


  const getClub = async (idClub) => {
    try {
      const response = await axios.get(`http://localhost:5000/club/id/${idClub}`);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const clubsnol = idCabor + "0";
  const clubsisi = idCabor + "0" + idClub;
  useEffect(()=>{
    getClub(idClub)
    getAtletbyCabor(idCabor);
    getAtletbyclubnol(clubsnol)
    getAtletbyclubisi(clubsisi);
  },[idClub, idCabor]) 

  useEffect(()=>{
    getPelatihbyClub(clubsisi);

  },[clubsisi])
  const getPelatihbyClub = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/pelatih/club/${id}`);
      setPelatih(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  const getAtletbyCabor = async (idCabor)=> {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/atlet/${idCabor}`);
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const getAtletbyclubnol = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/atlet/club/nol/${id}`
        );
        setClubnol(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    const getAtletbyclubisi = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/atlet/club/isi/${id}`
          );
          setClubisi(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      
      const pindah = async (id) => {
        try {
          const formData = new FormData();
          formData.append("club", clubsisi);

          await axios.patch(`http://localhost:5000/atlet/${id}`, formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
          getAtletbyclubisi(clubsisi);
          getAtletbyclubnol(clubsnol);
        } catch (error) {
          console.log(error);
        }
      };
      const hapus = async (id) => {
        try {
          const formData = new FormData();
          formData.append("club", clubsnol);

          await axios.patch(`http://localhost:5000/atlet/${id}`, formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
          getAtletbyclubisi(clubsisi);
          getAtletbyclubnol(clubsnol);
        } catch (error) {
          console.log(error);
        }
      };
      const hapusPelatih = async (id) => {
        try {
          const formData = new FormData();
          formData.append("club", clubsnol);

          await axios.patch(`http://localhost:5000/pelatih/${id}`, formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
          getAtletbyclubisi(clubsisi);
          getPelatihbyClub(clubsisi)
          getAtletbyclubnol(clubsnol);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="mt-5 p-3">
      <Navbar />
      <h1 className="title mt-5 mb-3">Club {club && club.nama_club}</h1>
      <Link to={`/cabor/club/${idCabor}`} className="button is-dark mb-3">
        Kembali
      </Link>
      <button className="button is-success ml-3 mb-3" onClick={bukaModal}>
        <IoAdd /> Pelatih
      </button>
      <div className="">
        <div className="column box mb-0 mt-3 pb-3" style={{ borderRadius: "0px" }}>
          <label htmlFor="" className="label">
            Data Pelatih
          </label>
          <table className="table is-fullwidth is-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pelatih</th>
                <th>No HP</th>
                <th>Email</th>
                <th>Jenis Kelamin</th>
                <th className="has-text-centered">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pelatihs && pelatihs.length > 0 ? (
                pelatihs.map((pelatih, index) => (
                  <tr key={pelatih && pelatih.id_pelatih}>
                    <td>{index + 1}</td>
                    <td>
                      {pelatih.name_awal} {pelatih.nama_tengah}{" "}
                      {pelatih.nama_akhir}
                    </td>
                    <td>{pelatih && pelatih.hp_mobile}</td>
                    <td>{pelatih && pelatih.email}</td>
                    <td>{pelatih && pelatih.kelamin}</td>
                    <td className="has-text-centered">
                      <button
                        className="button is-small is-danger"
                        onClick={() =>
                          hapusPelatih(pelatih && pelatih.id_pelatih)
                        }
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="has-text-centered">
                    Belum Ada Pelatih Di Club Ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div class="columns is-gapless is-multiline is-mobile">
          <div
            class="column is-half box"
            style={{ borderRadius: "0px", boxShadow: "none" }}
          >
            <div className="column">
              <div className=" is-fullwidth">
                <label htmlFor="" className="label ">
                  Daftar Atlet
                </label>
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Atlet</th>
                      <th className="has-text-centered">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubnol.map((atlet, index) => (
                      <tr key={atlet && atlet.id_atlet}>
                        <td>{index + 1}</td>
                        <td>
                          {atlet && atlet.name_awal}{" "}
                          {atlet && atlet.nama_tengah}{" "}
                          {atlet && atlet.nama_akhir}
                        </td>
                        <td className="has-text-centered">
                          <button
                            className="button is-primary is-small"
                            onClick={() => pindah(atlet && atlet.id_atlet)}
                          >
                            Pindah
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            class="column box"
            style={{ borderRadius: "0px", boxShadow: "none" }}
          >
            <div className="column">
              <div className=" is-fullwidth">
                <label
                  htmlFor=""
                  className="label is-flex is-justify-content-end"
                >
                  Atlet Terdaftar
                </label>
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Atlet</th>
                      <th className="has-text-centered">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubisi.map((atlet, index) => (
                      <tr key={atlet && atlet.id_atlet}>
                        <td>{index + 1}</td>
                        <td>
                          {atlet && atlet.name_awal}{" "}
                          {atlet && atlet.nama_tengah}{" "}
                          {atlet && atlet.nama_akhir}
                        </td>
                        <td className="has-text-centered">
                          <button
                            className="button is-danger is-small"
                            onClick={() => hapus(atlet && atlet.id_atlet)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddPembimbing Muncul={modalAktif} TidakMuncul={TutupModal} />
    </div>
  );
};

export default IsiClub;
