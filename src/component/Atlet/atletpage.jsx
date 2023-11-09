import React, {useEffect, useState} from 'react';
import axios from "axios";



const Atletpage = () => {
   const [cabors, setCabor] = useState([]);

  useEffect(()=> {
    getCabor();
  }, []);


const getCabor = async () => {
  const response = await axios.get('http://localhost:5000/cabor');
    setCabor(response.data);
};

  return (
    <div>
      <h1 className="title">Atlet</h1>
      <h2 className="subtitle">List Atlet</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Cabang Olahraga</th>
            <th>Jumlah Atlet</th>
          </tr>
        </thead>
        <tbody>
          {cabors.map((cabor, index) => (
            <tr key={cabor.id_cabor}>
              <td>{index + 1}</td>
              <td>{cabor.namaCabor}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Atletpage
