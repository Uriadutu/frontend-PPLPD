import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IoAdd, IoTrashSharp } from 'react-icons/io5';



const ListIndikator = () => {
    const [indikators, setIndikator] = useState([]);
    const [komponens, setKomponen] = useState("");
    const {id} = useParams();
    const [namaIndikator, setNamaIndikator] = useState("");


    useEffect(() => {
        getIndikator(id);
        getKomponen(id);
    },[id]);

    const getIndikator = async(id) => {
        try {
            const response = await axios.get(`http://localhost:5000/indikator/komponen/${id}`);
            setIndikator(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }
    const getKomponen = async(id) => {
        try {
            const response = await axios.get(`http://localhost:5000/komponen/${id}`);
            setKomponen(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }
    const deleteIndi = async (idIndi) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus Indikator ini?")) {
        try {
          await axios.delete(`http://localhost:5000/indikator/${idIndi}`);
          getIndikator(id);
        } catch (error) {
          console.error("Error:", error)
        }
      }
    };

   const path = window.location.pathname;
   let idCabor = null;

   const match = path.match(/\/atur\/(\d+)/);

   if (match) {
     idCabor = parseInt(match[1], 10);
   }

   const saveIndi = async (e) => {
     e.preventDefault();
     try {
       if (idCabor !== null) {
         await axios.post("http://localhost:5000/indikator", {
           namaIndikator: namaIndikator,
           id_komponen: id,
           id_cabor: idCabor,
         });
         getIndikator(id)
         setNamaIndikator("")
       } else {
         console.log("ID Cabor tidak ditemukan.");
       }
     } catch (error) {
       console.log(error);
     }
   };


  return (
    <div className='p-3'>
      <h1 className="title is-size-6-mobile">Indikator</h1>
      <h2 className="subtitle is-size-7-mobile">
        List Indikator {komponens && komponens.namaKomponen.split("-")[0].slice(0, -4)}
      </h2>

      <div className="tombol mb-5 is-flex is-justify-content-space-between">
        <Link
          className="button is-dark"
          to={`/cabor/komponen-indikator/atur/${
            komponens && komponens.Cabor && komponens.Cabor.id_cabor
          }`}
        >
          Kembali
        </Link>
        <form className="is-flex" onSubmit={saveIndi}>
          <input
            value={namaIndikator}
            onChange={(e) => setNamaIndikator(e.target.value)}
            className="input"
            type="text"
            placeholder="Indikator baru"
          />
          <button type="submit" className="button is-success">
            <IoAdd/><p className='is-hidden-mobile'>Tambah</p>
          </button>
        </form>
      </div>
      <div className="overflow-x-scroll-mobile">

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th className="has-text-centered">Indikator</th>
            <th className="has-text-centered">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {indikators.map((indikator, index) => (
            <tr key={indikator.id_indikator}>
              <td>{index + 1}</td>
              <td className="has-text-centered">{indikator.namaIndikator}</td>
              <td className="has-text-centered">
                <Link onClick={() => deleteIndi(indikator.id_indikator)}>
                  <IoTrashSharp />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ListIndikator
