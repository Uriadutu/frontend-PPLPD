import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DataSingkatAtlet = () => {
  const [atlets, setAtlet] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const getAtlet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/atlet/${user.id_atlet}`
      );
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAtlet(user.id_atlet);
  }, [user.id_atlet]);
  return (
    <div>
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
                : {atlets && atlets.name_awal} {atlets && atlets.nama_tengah}{" "}
                {atlets && atlets.nama_akhir}
              </p>
              <p>
                : {atlets && atlets.tmp_lahir}/{atlets && atlets.tgl_lahir}
              </p>
              <p>: {atlets && atlets.username}</p>
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
              <p>: {atlets && atlets.tahun_daftar}</p>
              <p>: {atlets && atlets.Cabor && atlets.Cabor.namaCabor}</p>
              <p>: {atlets && atlets.kelamin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSingkatAtlet;
