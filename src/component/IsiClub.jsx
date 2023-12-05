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
      <div className="box is-full-width">
        <table className="table is-bordered is-full-width">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Atlet</th>
            </tr>
          </thead>
          <tbody>
            {atlets.map((atlet) => (
              <tr key={atlet && atlet.id_atlet}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  {atlet && atlet.name_awal} {atlet && atlet.nama_tengah}{" "}
                  {atlet && atlet.nama_akhir}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IsiClub;
