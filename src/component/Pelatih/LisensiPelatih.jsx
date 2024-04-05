import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoAdd, IoEye, IoTrashBinSharp } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddLisensi from '../modal/AddLisensi';

const LisensiPelatih = () => {
  const {idPelatih} = useParams();
  const [modalAktif, setmodalAktif] = useState(false);
  const [lisensi, setlisensi] = useState([])
  const [Pelatih, seetPelatih] = useState([])
  const {uuid} = useParams();
  const {idcabor} =useParams();
  const navigate = useNavigate();

const bukaModal = () => {
  setmodalAktif(true);
};

  const TutupModal = () => {
    setmodalAktif(false);
    navigate(`/cabor/pelatih/${idcabor}/${uuid}/lisensi/${idPelatih}`);
  };
  const getLisensiByPelatih = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/lisensi/pelatih/${id}`)
      setlisensi(response.data)
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

  const hapusLisensi = async(id_Lisensi)=> {
    if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/lisensi/${id_Lisensi}`)
        getLisensiByPelatih(idPelatih)
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(()=> {
    getLisensiByPelatih(idPelatih)
    getpelatihbyid(idPelatih)
  },[idPelatih])
  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Lisensi Pelatih</h1>
      <h2 className="subtitle is-size-7-mobile">
        {Pelatih && Pelatih.name_awal} {Pelatih && Pelatih.nama_tengah}{" "}
        {Pelatih && Pelatih.nama_akhir}
      </h2>
      <Link className="button is-dark" to={`/cabor/pelatih/${idcabor}/${uuid}`}>
        Kembali
      </Link>
      <button className="button is-success ml-3" onClick={() => bukaModal()}>
        <IoAdd /> Tambah Lisensi
      </button>

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
        <div className="box" style={{ borderRadius: "0" }}>
          <table className="table is-fullwidth is-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Lisensi</th>
                <th>File</th>
                <th colSpan={2} className="has-text-centered">
                  Aksi
                </th>
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
                  <td className="has-text-centered">
                    <Link onClick={() => hapusLisensi(item && item.id_Lisensi)}>
                      <IoTrashBinSharp />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <AddLisensi Muncul={modalAktif} TidakMuncul={TutupModal} />
    </div>
  );
}

export default LisensiPelatih
