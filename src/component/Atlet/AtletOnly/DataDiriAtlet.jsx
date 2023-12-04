import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DataDiriAtlet = () => {
    const [atlets, setAtlet]= useState("");
    const [activeTab, setActiveTab] = useState("dataDiri");
    const toggleTab = (tab) => {
      setActiveTab(tab);
    };
     const toggleShowAll = () => {
       setShowAll(!showAll);
     };
    const [showAll, setShowAll] = useState(false);

    const {user} = useSelector((state)=> state.auth)

    const idAtlet = user && user.id_atlet;

    const getAtlet = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/atlet/${id}`);
            setAtlet(response.data);

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getAtlet(idAtlet);
    },[idAtlet])
  return (
    <div className="has-background-grey-light p-3 mt-5">
      <h1 className="title mt-5">Data Atlet</h1>
      <h2 className="subtitle">
        {atlets && atlets.name_awal} {atlets && atlets.nama_tengah}{" "}
        {atlets && atlets.nama_akhir}
      </h2>
      <Link to={"/dashboard"} className="button mr-3">
        Dashboard
      </Link>

      <div className="card mt-3">
        <header className="card-header">
          <p className="card-header-title">Data Diri</p>
        </header>
        <div className="card-content">
          <div className="column content">
            <div className=" is-flex is-justify-content-space-between">
              <div className="is-flex">
                <div className="field mr-5">
                  <p>Nama</p>
                  <p>Nama Panggilan</p>
                  <p>Cabang Olahraga</p>
                  <p>Tagun Bergabung</p>
                  <p>Tempat Lahir</p>
                  <p>Tanggal Lahir</p>
                  <p>Agama</p>
                  <p>Alamat</p>
                </div>
                <div className="isi">
                  <p>
                    : {atlets && atlets.name_awal}{" "}
                    {atlets && atlets.nama_tengah} {atlets && atlets.nama_akhir}
                  </p>
                  <p>: {atlets && atlets.nama_panggil}</p>
                  <p>: {atlets && atlets.Cabor && atlets.Cabor.namaCabor}</p>
                  <p>: {atlets && atlets.tahun_daftar}</p>
                  <p>: {atlets && atlets.tmp_lahir}</p>
                  <p>: {atlets && atlets.tgl_lahir}</p>
                  <p>: {atlets && atlets.agama}</p>
                  <p>
                    : {atlets && atlets.provinsi}, {atlets && atlets.kota},{" "}
                    {atlets && atlets.kecamatan}, {atlets && atlets.kelurahan},{" "}
                    {atlets && atlets.desa}, {atlets && atlets.nama_jalan}
                  </p>
                </div>
              </div>
              <div  >
                <figure className=" image is-128x128">
                  <img
                    src={atlets && atlets.url}
                    alt="Foto Atlet"
                    className="gambar-atlet"
                  />
                  {/* Tambahkan Link sesuai kebutuhan */}
                </figure>
              </div>
            </div>
            {showAll && (
              <div className="mt-5 cont-tabs" style={{ overflowX: "auto" }}>
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
                    <li
                      className={
                        activeTab === "dataPendidikan" ? "is-active" : ""
                      }
                    >
                      <a onClick={() => toggleTab("dataPendidikan")}>
                        Data Pendidikan
                      </a>
                    </li>
                  </ul>
                </div>
                {activeTab === "dataDiri" && (
                  <div className="is-flex is-justify-content-space-between p-3">
                    <div className="isi">
                      <div className="is-flex">
                        <div className="field mr-5">
                          <p>NO HP/Mobile</p>
                          <p>NO Telepon</p>
                          <p>Email</p>
                          <p className="mt-3">Golongan Darah</p>
                          <p>Jenis Kelamanin</p>
                          <p>Tinggi Badan</p>
                          <p>Berat Badan</p>
                        </div>
                        <div className="isi">
                          <p>: {atlets && atlets.hp_mobile}</p>
                          <p>: {atlets && atlets.no_telp}</p>
                          <p>: {atlets && atlets.email}</p>
                          <p className="mt-3">: {atlets && atlets.gol_darah}</p>
                          <p>: {atlets && atlets.kelamin}</p>
                          <p>: {atlets && atlets.tinggi_badan}</p>
                          <p>: {atlets && atlets.berat_badan}</p>
                        </div>
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
                          </div>
                          <div className="isi">
                            <p>: {atlets && atlets.nama_ayah}</p>
                            <p>: {atlets && atlets.tmpLahir_ayah}</p>
                            <p>: {atlets && atlets.tglLahir_ayah}</p>
                            <p>: {atlets && atlets.agama_ayah}</p>
                            <p>: {atlets && atlets.pekerjaan_ayah}</p>
                            <p>: {atlets && atlets.noHp_ayah}</p>
                            <p>: {atlets && atlets.notlp_ayah}</p>
                            <p>: {atlets && atlets.email_ayah}</p>
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
                          </div>
                          <div className="isi">
                            <p>: {atlets && atlets.nama_ibu}</p>
                            <p>: {atlets && atlets.tmpLahir_ibu}</p>
                            <p>: {atlets && atlets.tglLahir_ibu}</p>
                            <p>: {atlets && atlets.agama_ibu}</p>
                            <p>: {atlets && atlets.pekerjaan_ibu}</p>
                            <p>: {atlets && atlets.noHp_ibu}</p>
                            <p>: {atlets && atlets.notlp_ibu}</p>
                            <p>: {atlets && atlets.email_ibu}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "dataPendidikan" && (
                  <div className="is-flex is-justify-content-space-between p-3">
                    <div className="isi">
                      <label className="label">Pendidikan Formal</label>
                      <p>Pendidikan sekarang</p>
                      <div className="is-flex">
                        <div className="isi">
                          <div className="is-flex">
                            <div className="field mr-5">
                              <p>Pendidikan</p>
                              <p>Nama Sekolah</p>
                              <p>Jika sudah lulus</p>
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
    </div>
  );
}

export default DataDiriAtlet
