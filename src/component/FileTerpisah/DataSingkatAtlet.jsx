import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const DataSingkatAtlet = () => {
    const [atlets, setAtlet] = useState([])
    const {user} = useSelector((state)=>state.auth)
    const getAtlet = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/atlet/${user.id_atlet}`)
            setAtlet(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getAtlet(user.id_atlet)
    },[user.id_atlet])
  return (
    <div>
      <div className="cont-print mt-2 mb-0">
        <div className="is-flex is-justify-content-space-between">
          <div className="is-flex">
            <div className="field">
              <p>Nama</p>
              <p>Temp/Tgl Lahir</p>
              <p>ID</p>
            </div>
            <div className="isi ml-3">
              <p>
                : {atlets && atlets.name_awal} {atlets && atlets.nama_tengah}{" "}
                {atlets && atlets.nama_akhir}
                <p>
                  : {atlets && atlets.tmp_lahir}/{atlets && atlets.tgl_lahir}
                </p>
                <p>: {atlets && atlets.username}</p>
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
                : {atlets && atlets.tahun_daftar}
                <p>: {atlets && atlets.Cabor && atlets.Cabor.namaCabor}</p>
                <p>: {atlets && atlets.kelamin}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataSingkatAtlet
