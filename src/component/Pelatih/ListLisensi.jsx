import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoEye } from 'react-icons/io5';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ListLisensi = () => {
    const {user} = useSelector((state)=>state.auth)
    const idPelatih = user && user.id_pelatih;
    const [lisensi, setLisensi] = useState([])
    const [Pelatih, seetPelatih] = useState([])


    const getLisensiByPelatih = async (id)=> {
        try {
            const response = await axios.get(`http://localhost:5000/lisensi/pelatih/${id}`);
            setLisensi(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getpelatihbyid = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/pelatih/${id}`);
      seetPelatih(response.data);
    } catch (error) {
      
    console.log(error);
    }
  }
    useEffect(()=> {
        getpelatihbyid(idPelatih);
        getLisensiByPelatih(idPelatih);
    },[idPelatih]);
  return (
    <div>
      <h1 className="title">List Lisensi</h1>
      <h2 className="subtitle">
        {Pelatih && Pelatih.name_awal} {Pelatih && Pelatih.nama_tengah}{" "}
        {Pelatih && Pelatih.nama_akhir}
      </h2>
      <Link to={"/dashboard"} className="button">
        Dashboard
      </Link>
      <div className="mt-3">
        <div
          className="is-flex is-justify-content-space-between box mb-0"
          style={{ borderRadius: "0" }}
        >
          <div className="is-flex">
            <div className="field">
              <p>Nama</p>
              <p>Temp/Tgl Lahir</p>
              <p>ID</p>
            </div>
            <div className="isi ml-3">
              <p>
                : {Pelatih && Pelatih.name_awal}{" "}
                {Pelatih && Pelatih.nama_tengah} {Pelatih && Pelatih.nama_akhir}
                <p>
                  : {Pelatih && Pelatih.tmp_lahir}/
                  {Pelatih && Pelatih.tgl_lahir}
                </p>
                <p>: {Pelatih && Pelatih.username}</p>
              </p>
            </div>
          </div>
          <div className="is-flex">
            <div className="field">
              <p>Tahun Bergabung</p>
              <p>Cabang Olahraga</p>
              <p>Jenis Kelamin</p>
            </div>
            <div className="isi ml-3">
              <p>
                : {Pelatih && Pelatih.tahun_daftar}
                <p>: {Pelatih && Pelatih.Cabor && Pelatih.Cabor.namaCabor}</p>
                <p>: {Pelatih && Pelatih.kelamin}</p>
              </p>
            </div>
          </div>
        </div>
        <div className="box" style={{borderRadius: "0"}}>
          <table className="table is-fullwidth is-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Lisensi</th>
                <th>File</th>
                <th className="has-text-centered">Aksi</th>
              </tr>
            </thead>
            {lisensi.map((item, index) => (
              <tbody>
                <tr key={item && item.id_Lisensi}>
                  <td>{index + 1}</td>
                  <td>{item && item.nama}</td>
                  <td>{item.file}</td>
                  <td className="has-text-centered">
                    <Link to={item && item.url}>
                      <IoEye />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListLisensi
