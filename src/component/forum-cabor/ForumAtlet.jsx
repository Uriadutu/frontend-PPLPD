import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoEye } from 'react-icons/io5';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const ForumAtlet = () => {
    
    const {user} = useSelector((state)=> state.auth);
    const [cabors, setCabor] = useState([]);

    const getCabor = async()=> {
        try {
            const response = await axios.get("http://localhost:5000/cabor")
            setCabor(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getCabor();
    },[])
    
    console.log(cabors, "hay");
  return (
    <div>
      <h1 className="title">Forum</h1>
      <h2 className="subtitle">List Cabang Olahraga</h2>
      <Link to={"/dashboard"} className="button mb-3">
        Dashboard
      </Link>
      {user && user.role == "Admin" && (
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Cabor</th>
              <th>Nama Cabor</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cabors.map((cabor, index) => (
              <tr key={cabor && cabor.id_cabor}>
                <td>{index + 1}</td>
                <td>{cabor && cabor.kodeCabor}</td>
                <td>{cabor && cabor.namaCabor}</td>
                <td className="has-text-centered">
                  <Link to={`/forum/cabor/${cabor && cabor.id_cabor}`}>
                    <IoEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ForumAtlet
