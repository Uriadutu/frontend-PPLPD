import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddPrestasiAtlet from '../modal/AddPrestasiAtlet';


const DataAtlet = () => {
  const [atlets, setAtlet] = useState();
  const [gambars, setGambar] = useState();
  const [modalAktif, setmodalAktif] = useState(false);
  const {user} = useSelector((state)=>state.auth)
  const {uuid} = useParams();
  const [prestasi, setPrestasi] =useState([])

   const bukaModal = () => {
     setmodalAktif(true);
   };
   const TutupModal = () => {
     setmodalAktif(false);
   };

  const [activeTab, setActiveTab] = useState("dataDiri");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const idAtlet = atlets && atlets.id_atlet;
  useEffect(() => {
      Getatlet(uuid);
      getPrestasibyAtlet(idAtlet)
  }, [uuid, idAtlet]);


  const Getatlet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/atlet/uuid/${id}`);
      setAtlet(response.data);
    } catch (error) {
        console.log(error);
    }
  };

   const getPrestasibyAtlet = async (id) => {
     try {
       const response = await axios.get(`http://localhost:5000/prestasi/${id}`);
       setPrestasi(response.data)
     } catch (error) {}
   };

   const deletePrestasi = async (id) => {
     if (window.confirm("Apa anda yakin ingin menghapus data ini?")) {
       try {
         await axios.delete(`http://localhost:5000/prestasi/${id}`);
         Getatlet(uuid);
         getPrestasibyAtlet(idAtlet)
       } catch (error) {
         console.log(error);
       }
     }
   };

  return (
    <div>
      <h1 className="title">
        Data Atlet - {atlets && atlets.Cabor && atlets.Cabor.namaCabor}
      </h1>
      <h2 className="subtitle mb-5">
        {atlets && atlets.name_awal} {atlets && atlets.nama_tengah}{" "}
        {atlets && atlets.nama_akhir}
      </h2>
      <div className="is-flex">
        <Link
          className="button is-dark mb-3"
          to={`/cabor/atlet/${atlets && atlets.Cabor && atlets.Cabor.id_cabor}`}
        >
          Kembali
        </Link>
        {user && user.role === "Admin" && (
          <div className="is-flex">
            <Link
              className="button ml-3 is-success mr-3"
              to={`/cabor/atlet/${
                atlets && atlets.Cabor && atlets.Cabor.id_cabor
              }/${atlets && atlets.uuid}/tambah-perkembangan-latihan/${
                atlets && atlets.id_atlet
              }`}
            >
              Tambah Perkembangan Latihan
            </Link>
            <Link
              className="button is-success"
              onClick={() => bukaModal(atlets && atlets.id_atlet)}
            >
              Tambah Prestasi
            </Link>
          </div>
        )}
      </div>

      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Biodata</p>
        </header>

        <div className="card-content">
          <div className="column content">
            <div className=" is-flex is-justify-content-space-between">
              <div className="is-flex">
                <div className="field mr-5">
                  <p>Nama</p>
                  <p>Status</p>
                  <p>Atlet</p>
                  <p>Tempat Lahir</p>
                  <p>Tanggal Lahir</p>
                  <p>Agama</p>
                  <p>Alamat</p>
                </div>
                <div className="isi">
                  <p>
                    : {atlets && atlets.name_awal}{" "}
                    {atlets && atlets.nama_tengah} {atlets && atlets.nama_akhir}{" "}
                    ( {atlets && atlets.nama_panggil} )
                  </p>
                  <p>: {atlets && atlets.status}</p>
                  <p>: {atlets && atlets.Cabor && atlets.Cabor.namaCabor}</p>
                  <p>: {atlets && atlets.tmp_lahir}</p>
                  <p>: {atlets && atlets.tgl_lahir}</p>
                  <p>: {atlets && atlets.agama}</p>
                  <p>
                    : {atlets && atlets.nama_jalan}, {atlets && atlets.desa},{" "}
                    {atlets && atlets.kelurahan}, {atlets && atlets.kecamatan},{" "}
                    {atlets && atlets.kota}, {atlets && atlets.provinsi}
                  </p>
                </div>
              </div>
              <div className="column is-one-quarter">
                <figure className="image is-1by1 card gambar-atlet">
                  <img src={atlets && atlets.url} alt="Foto Atlet" />
                </figure>
              </div>
            </div>
            {showAll && (
              <div className="mt-5 cont-tabs">
                <div className="tabs tabs-data">
                  <ul>
                    <li className={activeTab === "dataDiri" ? "is-active" : ""}>
                      <a onClick={() => toggleTab("dataDiri")}>Data Diri</a>
                    </li>
                    <li
                      className={
                        activeTab === "dataOrangTua" ? "is-active" : ""
                      }
                    >
                      <a onClick={() => toggleTab("dataOrangTua")}>
                        Data Orang Tua
                      </a>
                    </li>
                    <li className={activeTab === "datawali" ? "is-active" : ""}>
                      <a onClick={() => toggleTab("datawali")}>Data Wali</a>
                    </li>
                    <li
                      className={
                        activeTab === "dataPendidikan" ? "is-active" : ""
                      }
                    >
                      <a onClick={() => toggleTab("dataPendidikan")}>
                        Data Pendidikan
                      </a>
                    </li>
                    <li
                      className={
                        activeTab === "dataPrestasi" ? "is-active" : ""
                      }
                    >
                      <a onClick={() => toggleTab("dataPrestasi")}>
                        Data Prestasi
                      </a>
                    </li>
                  </ul>
                </div>
                {activeTab === "dataDiri" && (
                  <div className="is-flex is-justify-content-space-between p-3">
                    <div className="is-flex">
                      <div className="field mr-5">
                        <p>NO HP/Mobile</p>
                        <p>NO Telepon</p>
                        <p>Email</p>
                        <p>Golongan Darah</p>
                        <p>Jenis Kelamanin</p>
                        <p>Tinggi Badan</p>
                        <p>Berat Badan</p>
                      </div>
                      <div className="isi">
                        <p>: {atlets && atlets.hp_mobile}</p>
                        <p>: {atlets && atlets.no_telp}</p>
                        <p>: {atlets && atlets.email}</p>
                        <p>: {atlets && atlets.gol_darah}</p>
                        <p>: {atlets && atlets.kelamin}</p>
                        <p>: {atlets && atlets.tinggi_badan}</p>
                        <p>: {atlets && atlets.berat_badan}</p>
                      </div>
                    </div>
                    <div className="isi">
                      <label className="label ">Perlengkapan (Outfit)</label>
                      <div className="is-flex">
                        <div className="field mr-5">
                          <p>Ukuran Baju</p>
                          <p>Ukuran Sepatu</p>
                        </div>
                        <div className="isi">
                          <p>: {atlets && atlets.ukuran_baju}</p>
                          <p>: {atlets && atlets.ukuran_sepatu}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "dataOrangTua" && (
                  <div className="isi p-3">
                    <label className="label">Data Orang Tua Atlet</label>
                    <div className="is-flex is-justify-content-space-between">
                      <div className="isi">
                        <p>Data Ayah</p>
                        <div className="is-flex">
                          <div className="field mr-5">
                            <p>Nama Ayah</p>
                            <p>Tempat Lahir</p>
                            <p>Tanggal Lahir</p>
                            <p>Agama</p>
                            <p>Pekerjaan</p>
                            <p>No HP/Mobile Phone</p>
                            <p>No Telepon</p>
                            <p>Alamat Email</p>
                            <p>Alamat</p>
                          </div>
                          <div className="isi">
                            <p>
                              : {atlets && atlets.nama_ayah} (
                              {atlets && atlets.status_ayah})
                            </p>
                            <p>: {atlets && atlets.tmpLahir_ayah}</p>
                            <p>: {atlets && atlets.tglLahir_ayah}</p>
                            <p>: {atlets && atlets.agama_ayah}</p>
                            <p>: {atlets && atlets.pekerjaan_ayah}</p>
                            <p>: {atlets && atlets.noHp_ayah}</p>
                            <p>: {atlets && atlets.notlp_ayah}</p>
                            <p>: {atlets && atlets.email_ayah}</p>
                            <p>
                              : {atlets && atlets.namaJalan_ortu},{" "}
                              {atlets && atlets.desa_ortu},{" "}
                              {atlets && atlets.kelurahan_ortu},<br />
                              {atlets && atlets.kecamatan_ortu},{" "}
                              {atlets && atlets.kota_ortu},{" "}
                              {atlets && atlets.provinsi_ortu}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="isi">
                        <p>Data Ibu</p>
                        <div className="is-flex">
                          <div className="field mr-5">
                            <p>Nama Ibu</p>
                            <p>Tempat Lahir</p>
                            <p>Tanggal Lahir</p>
                            <p>Agama</p>
                            <p>Pekerjaan</p>
                            <p>No HP/Mobile Phone</p>
                            <p>No Telepon</p>
                            <p>Alamat Email</p>
                            <p>Alamat</p>
                          </div>
                          <div className="isi">
                            <p>
                              : {atlets && atlets.nama_ibu} (
                              {atlets && atlets.status_ibu})
                            </p>
                            <p>: {atlets && atlets.tmpLahir_ibu}</p>
                            <p>: {atlets && atlets.tglLahir_ibu}</p>
                            <p>: {atlets && atlets.agama_ibu}</p>
                            <p>: {atlets && atlets.pekerjaan_ibu}</p>
                            <p>: {atlets && atlets.noHp_ibu}</p>
                            <p>: {atlets && atlets.notlp_ibu}</p>
                            <p>: {atlets && atlets.email_ibu}</p>
                            <p>
                              : {atlets && atlets.namaJalan_ibu},{" "}
                              {atlets && atlets.desa_ibu},{" "}
                              {atlets && atlets.kelurahan_ibu}, <br />
                              {atlets && atlets.kecamatan_ibu},{" "}
                              {atlets && atlets.kota_ibu},{" "}
                              {atlets && atlets.provinsi_ibu}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "dataPendidikan" && (
                  <div className="is-flex is-justify-content-space-between p-3">
                    <div className="isi">
                      <p className="label">Pendidikan sekarang</p>
                      <div className="is-flex">
                        <div className="isi">
                          <div className="is-flex">
                            <div className="field mr-5">
                              <p>Pendidikan</p>
                              <p>Nama Sekolah</p>
                              <p className="label">Jika sudah lulus</p>
                              <p>Pendidikan Terakhir</p>
                              <p>Nama Sekolah</p>
                              <p>Tahun Lulus</p>
                            </div>
                            <div className="isi">
                              <p>: {atlets && atlets.pendidikan}</p>
                              <p>: {atlets && atlets.nama_sklh}</p>
                              <p>
                                <br />
                              </p>
                              <p>: {atlets && atlets.pend_terakhir}</p>
                              <p>: {atlets && atlets.alumni}</p>
                              <p>: {atlets && atlets.tahun_lulus}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "datawali" && (
                  <div className="is-flex is-justify-content-space-between p-3">
                    <div className="isi">
                      <p className="label">Data Wali Atlet</p>
                      <div className="is-flex">
                        <div className="isi">
                          <div className="is-flex">
                            <div className="field mr-5">
                              <p>Nama Wali</p>
                              <p>Hubungan Keluarga</p>
                              <p>Tempat Lahir</p>
                              <p>Tanggal Lahir</p>
                              <p>Agama</p>
                              <p>Jenis Kelamin</p>
                              <p>Pekerjaan</p>
                              <p>Nomor Hp/Mobile</p>
                              <p>Nomor Telepon</p>
                              <p>Email</p>
                              <p>Alamat</p>
                            </div>
                            <div className="isi">
                              <p>: {atlets && atlets.nama_wali}</p>
                              <p>: {atlets && atlets.hubkeluarga_wali}</p>
                              <p>: {atlets && atlets.tempLahir_wali}</p>
                              <p>: {atlets && atlets.tglLahir_wali}</p>
                              <p>: {atlets && atlets.agama_wali}</p>
                              <p>: {atlets && atlets.jeniskelamin_wali}</p>
                              <p>: {atlets && atlets.pekerjaan_wali}</p>
                              <p>: {atlets && atlets.noHp_wali}</p>
                              <p>: {atlets && atlets.notlp_wali}</p>
                              <p>: {atlets && atlets.email_wali}</p>
                              <p>
                                : {atlets && atlets.namaJalan_wali},{" "}
                                {atlets && atlets.desa_wali},{" "}
                                {atlets && atlets.kelurahan_wali},{" "}
                                {atlets && atlets.kecamatan_wali},{" "}
                                {atlets && atlets.kota_wali},{" "}
                                {atlets && atlets.provinsi_wali}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "dataPrestasi" && (
                  <div className="p-3">
                    <label className="label">Prestasi</label>
                    <table className="table is-fullwidth is-bordered">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama Club</th>
                          <th>Nama Event</th>
                          <th>Tahun</th>
                          <th>Tingkat</th>
                          <th>Pencapaian</th>
                          <th className="has-text-centered">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prestasi.map((item, index) => (
                          <tr key={item && item.id_prestasi}>
                            <td>{index + 1}</td>
                            <td>{item && item.namaClub}</td>
                            <td>{item && item.namaEvent}</td>
                            <td>{item && item.tahunPrestasi}</td>
                            <td>{item && item.Tingkat}</td>
                            <td>{item && item.Pencapaian}</td>
                            <td className="has-text-centered">
                              <button
                                className="button is-small is-danger"
                                onClick={() =>
                                  deletePrestasi(item.id_prestasi)
                                }
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="card-footer">
          <a
            href="#"
            className="card-header-icon"
            aria-label="more options"
            onClick={toggleShowAll}
          >
            <span className="icon">
              <i
                className={`fas fa-angle-${showAll ? "up" : "down"}`}
                aria-hidden="true"
              ></i>
            </span>
          </a>
          <a href="#" className="card-footer-item" onClick={toggleShowAll}>
            Show {showAll ? "Less" : "All"}
          </a>
        </footer>
      </div>
      <AddPrestasiAtlet Muncul={modalAktif} TidakMuncul={TutupModal} />
    </div>
  );
};
export default DataAtlet


