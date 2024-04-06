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
    <div className="p-3">
      <h1 className="title is-size-6-mobile">List Lisensi</h1>
      <h2 className="subtitle is-size-7-mobile">
        {Pelatih && Pelatih.name_awal} {Pelatih && Pelatih.nama_tengah}{" "}
        {Pelatih && Pelatih.nama_akhir}
      </h2>
      <Link to={"/dashboard"} className="button">
        Dashboard
      </Link>
      <div className="mt-3">
        <div className="box">

        <div className="columns is-multiline is-mobile is-justify-content-space-between is-size-7-mobile">
          <div className="column is-full-mobile p-5-desktop is-half-tablet is-half-desktop">
            <div class="columns is-flex is-justify-content-space-between">
              <div class="field column is-half-mobile is-half-desktop is-full-tablet">
                <p>Nama</p>
                <p>Temp/Tgl Lahir</p>
                <p>ID</p>
              </div>
              <div class="isi column is-full">
                <p>
                  : {Pelatih && Pelatih.name_awal} {Pelatih && Pelatih.nama_tengah}{" "}
                  {Pelatih && Pelatih.nama_akhir}
                </p>
                <p>
                  : {Pelatih && Pelatih.tmp_lahir}/{Pelatih && Pelatih.tgl_lahir}
                </p>
                <p>: {Pelatih && Pelatih.username}</p>
              </div>
            </div>
          </div>
          <div className="column is-full-mobile p-5-desktop is-half-tablet is-half-desktop">
            <div className="columns is-flex is-justify-content-space-between">
              <div className="field column is-half-mobile is-half-desktop is-full-tablet">
                <p>Tahun Bergabung</p>
                <p>Cabang Olahraga</p>
                <p>Jenis Kelamin</p>
              </div>
              <div className="column">
                <p>: {Pelatih && Pelatih.tahun_daftar}</p>
                <p>: {Pelatih && Pelatih.Cabor && Pelatih.Cabor.namaCabor}</p>
                <p>: {Pelatih && Pelatih.kelamin}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="box" style={{ borderRadius: "0" }}>
          <div className="overflow-x-scroll-mobile">

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
    </div>
  );
}

export default ListLisensi
