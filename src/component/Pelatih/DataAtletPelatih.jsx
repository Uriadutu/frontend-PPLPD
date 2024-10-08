import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {shortenName} from "../../utils/helper.js"

const DataAtletPelatih = () => {
  const [atlets, setAtlet] = useState("");
  const [prestasi, setPrestasi] = useState([]);
  const [activeTab, setActiveTab] = useState("dataDiri");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const { idAtlet } = useParams();
  const [showAll, setShowAll] = useState(false);

  const { user } = useSelector((state) => state.auth);


  const getAtlet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/atlet/${id}`);
      setAtlet(response.data);
    } catch (error) {}
  };

  console.log(idAtlet);
  console.log(atlets.id_atlet);

  useEffect(() => {
    getAtlet(idAtlet);
    getPrestasibyAtlet(idAtlet);
  }, [idAtlet]);

  const getPrestasibyAtlet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/prestasi/${id}`);
      setPrestasi(response.data);
    } catch (error) {}
  };
  return (
    <div className="has-background-light p-3 mt-5">
      <h1 className="title mt-5 is-size-6-mobile">Data Atlet</h1>
      <h2 className="subtitle is-size-7-mobile">
        {atlets && atlets.name_awal} {atlets && atlets.nama_tengah}{" "}
        {atlets && atlets.nama_akhir}
      </h2>
      <Link to={"/daftaratlet-cabor"} className="button is-dark mr-3 mb-3">
        Kembali
      </Link>

      <Link
        to={`/pelatih/perkembangan/atlet/${atlets && atlets.id_atlet}`}
        className="button is-success"
      >
        Perkembangan Atlet
      </Link>

      <div className="card">
        <header className="card-header ">
          <p className="card-header-title">Data Diri Atlet</p>
        </header>

        <div className="card-content is-size-7-mobile is-size-4-tablet is-size-6-desktop p-0">
          <div className=" content p-0">
            <div className="columns is-full-desktop is-full-tablet is-full-mobile  is-multiline is-flex is-justify-content-space-between p-5">
              <div className="is-flex is-justify-content-space-between columns is-full-mobile is-half-desktop is-full-tablet p-0">
                <div className="field column is-one-third-mobile ">
                  <p>Nama</p>
                  <p>Status</p>
                  <p>Atlet</p>
                  <p>Tempat Lahir</p>
                  <p>Tanggal Lahir</p>
                  <p>Agama</p>
                  <p>Alamat</p>
                </div>
                <div className="isi column">
                  <p className="">
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
              <div className="column p-0 is-flex is-justify-content-center">
                <div className="columns m-0 p-0 is-flex is-justify-content-center">
                  <div className="p-0">
                    <div
                      className=""
                      style={{
                        width: "240px",
                        height: "300px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        className=""
                        src={atlets && atlets.url}
                        alt="Foto Atlet"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showAll && (
              <div className="mt-5 cont-tabs ">
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
                  <div className="column is-size-7-mobile is-full-desktop">
                    <div className="isi">
                      <div className="is-flex">
                        <div className="field mr-6">
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
                    </div>
                    <div className="isi">
                      <div className="mt-3">
                        <label className="label ">Perlengkapan (Outfit)</label>
                        <div className="is-flex">
                          <div className="field mr-6">
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
                  </div>
                )}
                {activeTab === "dataOrangTua" && (
                  <div className="scrol">
                    <div className="isi p-3">
                      <div className="columns is-full-desktop">
                        <div className="isi column is-half-desktop">
                          <p className="label">Data Ayah</p>
                          <div className="is-flex">
                            <div className="field mr-2">
                              <p>Nama Ayah</p>
                              <p>Status</p>
                              <p>Tempat Lahir</p>
                              <p>Tanggal Lahir</p>
                              <p>Agama</p>
                              <p>Pekerjaan</p>
                              <p>No HP</p>
                              <p>No Telepon</p>
                              <p>Alamat Email</p>
                              <p>Alamat</p>
                            </div>
                            <div className="isi">
                              <p className="is-hidden-desktop is-hidden-tablet">
                                : {atlets && shortenName(atlets.nama_ayah)}
                              </p>
                              <p className="is-hidden-mobile">
                                : {atlets && atlets.nama_ayah}
                              </p>
                              <p>: {atlets && atlets.status_ayah}</p>
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
                        <div className="isi column">
                          <p className="label">Data Ibu</p>
                          <div className="is-flex">
                            <div className="field mr-2">
                              <p>Nama Ibu</p>
                              <p>Status</p>
                              <p>Tempat Lahir</p>
                              <p>Tanggal Lahir</p>
                              <p>Agama</p>
                              <p>Pekerjaan</p>
                              <p>No HP</p>
                              <p>No Telepon</p>
                              <p>Alamat Email</p>
                              <p>Alamat</p>
                            </div>
                            <div className="isi">
                              <p className="is-hidden-desktop is-hidden-tablet">
                                : {atlets && shortenName(atlets.nama_ibu)}
                              </p>
                              <p className="is-hidden-mobile">
                                : {atlets && atlets.nama_ibu}
                              </p>
                              <p>: {atlets && atlets.status_ibu}</p>
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
                  <div className="column is-size-7-mobile is-full-desktop">
                    <div className="isi">
                      <div className="is-hidden-desktop">
                        <div className="is-flex columns">
                          <div className="field column mr-5 is-half">
                            <p>Nama Wali</p>
                            <p>Hubungan Kel.</p>
                            <p>Tempat Lahir</p>
                            <p>Tanggal Lahir</p>
                            <p>Agama</p>
                            <p>Jenis Kelamin</p>
                            <p>Pekerjaan</p>
                            <p>Nomor Hp</p>
                            <p>Nomor Telepon</p>
                            <p>Email</p>
                            <p>Alamat</p>
                          </div>
                          <div className="isi column">
                            <p className="is-hidden-desktop is-hidden-tablet">
                              : {atlets && shortenName(atlets.nama_wali)}
                            </p>
                            <p className="is-hidden-mobile">
                              : {atlets && atlets.nama_wali}
                            </p>
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
                      <div className="is-hidden-mobile">
                        <div className="is-flex ">
                          <div className="field mr-6">
                            <p>Nama Wali</p>
                            <p>Hubungan Kel.</p>
                            <p>Tempat Lahir</p>
                            <p>Tanggal Lahir</p>
                            <p>Agama</p>
                            <p>Jenis Kelamin</p>
                            <p>Pekerjaan</p>
                            <p>Nomor Hp</p>
                            <p>Nomor Telepon</p>
                            <p>Email</p>
                            <p>Alamat</p>
                          </div>
                          <div className="isi ">
                            <p className="is-hidden-desktop is-hidden-tablet">
                              : {atlets && atlets.nama_wali}
                            </p>
                            <p className="is-hidden-mobile">
                              : {atlets && atlets.nama_wali}
                            </p>
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
                )}
                {activeTab === "dataPrestasi" && (
                  <div className="">
                    <div className=" is-full-mobile is-full-tablet is-full-desktop overflow-x-scroll-mobile p-3">
                      <table className="table is-fullwidth is-bordered">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Club</th>
                            <th>Nama Event</th>
                            <th>Tahun</th>
                            <th>Tingkat</th>
                            <th>Pencapaian</th>
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="card-footer">
          {/* <a
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
          </a> */}
          <a href="#" className="card-footer-item" onClick={toggleShowAll}>
            Show {showAll ? "Less" : "All"}
          </a>
        </footer>
      </div>
    </div>
  );
};

export default DataAtletPelatih;
