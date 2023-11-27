import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Hasil = () => {
  const [komponens, setKomponen] = useState([]);
  const {idCabor} = useParams;
  const getKomponenByCabor = async(id)=> {
    try {
      const response= await axios.get(`http://localhost:5000/komponen/cabor${id}`)
      setKomponen(response.data)
    } catch (error) {
     console.log(error); 
    }
  }

  useEffect(()=>{
    getKomponenByCabor(idCabor);
  },[idCabor])



console.log(idCabor);
  return (
    <div className="mt-5">
      <div className="card latihan-card" style={{ maxWidth: "100%" }}>
        <header className="card-header column">
          <p className="card-header-title">Perkembangan Latihan</p>
        </header>
        <div
          className="card-content">
          <div className="content">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hasil;
