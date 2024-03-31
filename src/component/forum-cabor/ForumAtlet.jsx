import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoEye } from 'react-icons/io5';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const ForumAtlet = () => {
    
    const {user} = useSelector((state)=> state.auth);
    const [cabors, setCabor] = useState([]);
    const [caborsaja, setCaborSaja] = useState([]);
    const [countforum, setCountForum] = useState([]);
    const idCabor = user && user.id_cabor;

    const getCabor = async()=> {
        try {
            const response = await axios.get(`http://localhost:5000/cabor`)
            setCabor(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCountForum = async()=> {
        try {
            const response = await axios.get(`http://localhost:5000/forumcabor/cabor/count`)
            setCountForum(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getCaborbyId = async()=> {
        try {
            const response = await axios.get(`http://localhost:5000/cabor/${idCabor}`)
            setCaborSaja(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getCabor();
        getCaborbyId(idCabor);
        getCountForum();
    },[idCabor])
    
    const [searchTerm, setSearchTerm] = useState("");

    // ... (state dan useEffect lainnya)

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };


    const filteredCabors = cabors.filter((cabor) =>
      cabor.namaCabor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <div className='p-3'>
      <h1 className="title is-size-6-mobile">Forum</h1>
      <h2 className="subtitle is-size-7-mobile">
        Cabang Olahraga {cabors && cabors.namaCabor}
      </h2>
      <div className="is-flex is-justify-content-space-between is-align-items-center  mb-3">
        <Link to="/dashboard" className="button">
          Dashboard
        </Link>
        {user && user.role === "Admin" && (
          <div className="search-container">
            <input
              className="input"
              type="text"
              placeholder="Cari Cabor..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        )}
      </div>
      {user && user.role === "Admin" && (
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Cabor</th>
              <th>Nama Cabor</th>
              <th className="has-text-centered">Jumlah Post</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCabors.map((cabor, index) => (
              <tr key={cabor && cabor.id_cabor}>
                <td>{index + 1}</td>
                <td>{cabor && cabor.kodeCabor}</td>
                <td>{cabor && cabor.namaCabor}</td>
                <td className="has-text-centered">
                  {countforum[cabor.id_cabor] || 0}
                </td>
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
      {user && user.role !== "Admin" && (
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Cabor</th>
              <th>Nama Cabor</th>
              <th className="has-text-centered">Jumlah Aksi</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr key={caborsaja && caborsaja.id_cabor}>
              <td>1</td>
              <td>{caborsaja && caborsaja.kodeCabor}</td>
              <td>{caborsaja && caborsaja.namaCabor}</td>
              <td className="has-text-centered">
                {countforum[caborsaja.id_cabor] || 0}
              </td>
              <td className="has-text-centered">
                <Link to={`/forum/cabor/${caborsaja && caborsaja.id_cabor}`}>
                  <IoEye />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ForumAtlet
