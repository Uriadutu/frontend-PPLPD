import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Latihan = () => {
  const { id } = useParams();
  const [tgl, setTanggal] = useState("");
  const [hasilTes, setHasilTes] = useState("");
  const [atlets, setAtlet] = useState("");
  const [indikators, setIndikator] = useState([]);
  const [komponens, setKomponen] = useState([]);
  const [indiKomponens, setIndiKomponen] = useState([]);
  const [idKomponen, setIdKomponen] = useState(null);
  const [selectedKomponen, setSelectedKomponen] = useState("");
    
    useEffect(() => {
      getAtlet(id);
      if(idKomponen) {
      getIndikatorByKomponen(idKomponen);

      }
    }, [id, idKomponen]);
    
    const getAtlet = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/atlet/${id}`);
            setAtlet(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const path = window.location.pathname;
    let idCabor = null;

    const match = path.match(/\/atlet\/(\d+)/);

    if (match) {
      idCabor = parseInt(match[1], 10);
    }

    const getKomponenByCabor = async (idCabor) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/komponen/cabor/${idCabor}`
        );
        setKomponen(response.data);
        const firstKomponenId =
          response.data.length > 0 ? response.data[0].id_komponen : null;
        setIdKomponen(firstKomponenId);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("Id komponen :", indiKomponens);

    
     const getIndikatorByKomponen = async (idKomponen) => {
       try {
         const response = await axios.get(
           `http://localhost:5000/indikator/komponen/${idKomponen}`
         );
         setIndiKomponen(response.data);
       } catch (error) {
         console.log(error);
       }
     };

    const getIndikator = async(idCabor)=> {
        try {
            const response = await axios.get(`http://localhost:5000/indikator/cabor/${idCabor}`);
            setIndikator(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
      if (idCabor) {
        getIndikator(idCabor);
        getKomponenByCabor(idCabor);
      }
    }, [idCabor]);
const uniqueKomponen = [
  ...new Set(indikators.map((komponen) => komponen.namaKomponen)),
];

  return (
    <div>
      <h1 className="title">
        Perkembangan latihan{" "}
        {indikators.length > 0 && indikators[0].namaIndikator}
      </h1>
      <h2 className="subtitle">Input Perkembangan Latihan Atlet</h2>
      <select value={selectedKomponen}>
        <option value=""></option>
        {komponens.map((komponen) => (
          <option key={komponen.id_komponen} value={komponen.id_komponen}>
            {komponen.namaKomponen}
          </option>
        ))}
      </select>

      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Input Perkembangan {atlets && atlets.nama}{" "}
          </p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <table>
              <thead>
                <tr>
                  <th colspan={2}>Nama Latihan</th>
                  {indikators.map((indikator) => (
                    <th key={indikator.id_indikator}>
                      {indikator && indikator.namaIndikator}
                    </th>
                  ))}
                  {/* Kolom untuk setiap namaKomponen yang unik
                  {uniqueKomponen.map((komponen) => (
                    <th key={komponen.namaKomponen}>{komponen.namaKomponen}</th>
                  ))} */}
                </tr>
              </thead>
              {/* ... body tabel */}
            </table>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Save
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Latihan
