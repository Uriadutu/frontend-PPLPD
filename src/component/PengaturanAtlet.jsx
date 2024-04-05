import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PengaturanAtlet = () => {

    const [atlets, setAtlet] = useState([]);
    const [cabors, setCabor] = useState([]);
    
    useEffect(()=> {
        getAtlet();
        getCabor();
    },[])
    const getAtlet = async()=> {
       try {
         const response = await axios.get("http://localhost:5000/atlet");
         setAtlet(response.data);
       } catch (error) {
        console.log(error);
       }
    }

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
  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Pengaturan Akun</h1>
      <h2 className="subtitle is-size-7-mobile">
        Kontrol Akun Pelatih dan Atlet
      </h2>
      <Link to={"/dashboard"} className="button mb-3">
        Dashboard
      </Link>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Cabang Olahraga</th>
                  <th className="has-text-centered">Jumlah Atlet</th>
                  <th className="has-text-centered">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cabors.map((cabor, index) => (
                  <tr key={cabor && cabor.id_cabor}>
                    <td>{index + 1}</td>
                    <td>{cabor && cabor.namaCabor}</td>
                    <td className="has-text-centered">{cabor.jumlahAtlet}</td>
                    <td className="has-text-centered">
                      <Link
                        to={`/kontrolatlet/${cabor.id_cabor}`}
                        className="button is-small is-primary"
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengaturanAtlet