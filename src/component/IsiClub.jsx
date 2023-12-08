import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const IsiClub = () => {
  const { idCabor } = useParams();
  const [club, setClub] = useState([]);
  const {idClub} = useParams();
  const [atlets, setAtlet]= useState([]);

  const getClub = async (idClub) => {
    try {
      const response = await axios.get(`http://localhost:5000/club/id/${idClub}`);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    getClub(idClub)
    getAtletbyCabor(idCabor);
  },[idClub, idCabor])

  const getAtletbyCabor = async (idCabor)=> {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/atlet/${idCabor}`);
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="mt-5 p-3">
      <Navbar />
      <h1 className="title mt-5 mb-3">Club {club && club.nama_club}</h1>
      <Link to={`/cabor/club/${idCabor}`} className="button is-dark mb-3">
        Kembali
      </Link>
      <div className="">
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="column is-half card">
            <div className="column">
              <label htmlFor="" className="label">
                Daftar Atlet
              </label>
              <div className="box is-fullwidth">
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Atlet</th>
                      <th className="has-text-centered">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atlets.map((atlet, index) => (
                      <tr key={atlet && atlet.id_atlet}>
                        <td>{index + 1}</td>
                        <td>
                          {atlet && atlet.name_awal}{" "}
                          {atlet && atlet.nama_tengah}{" "}
                          {atlet && atlet.nama_akhir}
                        </td>
                        <td className="has-text-centered">
                          <button className="button is-primary is-small">
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

          <div class="column card">
            <div className="column">
              <label htmlFor="" className="label">
                Atlet Terdaftar
              </label>
              <div className="box is-fullwidth">
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Atlet</th>
                      <th className="has-text-centered">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atlets.map((atlet, index) => (
                      <tr key={atlet && atlet.id_atlet}>
                        <td>{index + 1}</td>
                        <td>
                          {atlet && atlet.name_awal}{" "}
                          {atlet && atlet.nama_tengah}{" "}
                          {atlet && atlet.nama_akhir}
                        </td>
                        <td className="has-text-centered">
                          <button className="button is-danger is-small">
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
    </div>
  );
};

export default IsiClub;
