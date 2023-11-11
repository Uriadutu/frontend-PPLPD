import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';



const Pelatihlist = () => {
   const [cabors, setCabor] = useState([]);

   const getCabor = async () => {
     const response = await axios.get("http://localhost:5000/cabor");
     // Mengambil data cabor dari respons server
     const caborData = response.data;

     // Mengambil data jumlah atlet dari server
     const atletCountResponse = await axios.get(
       "http://localhost:5000/atlet/countByCabor"
     );
     const atletCountData = atletCountResponse.data;

     // Menggabungkan data jumlah atlet dengan data cabor
     const caborWithAtletCount = caborData.map((cabor) => ({
       ...cabor,
       jumlahAtlet: atletCountData[cabor.kodeCabor] || 0,
     }));

     setCabor(caborWithAtletCount);
   };

  useEffect(()=> { 
    getCabor();
  }, []);




  return (
    <div>
      <h1 className="title">Pelatih</h1>
      <h2 className="subtitle">List Pelatih</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Cabang Olahraga</th>
            <th className="has-text-centered">Jumlah Atlet</th>
          </tr>
        </thead>
        <tbody>
          {cabors.map((cabor, index) => (
            <tr key={cabor.id_cabor}>
              <td>{index + 1}</td>
              <td>{cabor.namaCabor}</td>
              <td className="has-text-centered">{cabor.jumlahAtlet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pelatihlist
