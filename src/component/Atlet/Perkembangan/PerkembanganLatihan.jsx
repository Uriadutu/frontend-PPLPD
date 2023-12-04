import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import IndikatorEdit from "./IndikatorEdit";
import TabelPerkembangan from "../../FileTerpisah/TabelPerkemabangan";
import { IoTrashBin, IoTrashSharp } from "react-icons/io5";

const PerkembanganLatihan = () => {
  const [komponens, setKomponen] = useState([]);
  const [komponennya, setKomponennya] = useState([]);
  const [indikators, setIndikator] = useState([]);
  const [atlets, setAtlet] = useState([]);
  const [modalUsersAktif, setModalUsersAktif] = useState(false);
  const { id } = useParams();
  const [selectedPeriode, setSelectedPeriode] = useState(""); // State untuk menyimpan periode yang dipilih
  const idCabor = atlets && atlets.id_cabor;
  const [hasils, setHasil] = useState([]);
  const [hapusdata, setDatahapus] =useState([])

  const { idKomp, setIdKomp } = useState([]);
  const handleSelectChange = (e) => {
    setSelectedPeriode(e.target.value);
  };
  const getKomponenByPeriodeAndCabor = async (id, periode) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/komponen/periode/${id}/${periode}`
      );
      setKomponen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIndibyCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/indikator/cabor/${id}`
      );
      setIndikator(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKomponenByCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/komponen/cabor/${id}`
      );
      setKomponennya(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  const idk = komponennya.length > 0 ? komponennya[0].id_komponen : null;
  useEffect(() => {
    getIndibyCabor(idCabor);
    getKomponenByCabor(idCabor);
    if (selectedPeriode !== "") {
      getKomponenByPeriodeAndCabor(idCabor, selectedPeriode);
    }
  }, [idCabor, selectedPeriode]);

  const uniquePeriodes = [
    ...new Set(komponennya.map((komponen) => komponen && komponen.periode)),
  ];

  useEffect(() => {
    getAtlet(id);
    getHasilByAtlet(id);
  }, [id]);

  const getAtlet = async (idatlet) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/atlet/${idatlet}`
      );
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bukaModal = () => {
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
  };
  const getHasilByAtlet = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/perkembangan/atlet/${id}`
      );
      setHasil(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  //  const groupHasilByTanggal = (hasilList) => {
  //    const groupedHasil = {};
  //    hasilList.forEach((hasil) => {
  //      const { tgl } = hasil;
  //      if (!groupedHasil[tgl]) {
  //        groupedHasil[tgl] = [];
  //      }
  //      groupedHasil[tgl].push(hasil);
  //    });
  //    return groupedHasil;
  //  };

  //  // Mendapatkan semua indikator yang unik
  //  const uniqueIndikators = Array.from(
  //    new Set(hasils.map((hasil) => hasil.Indikator.namaIndikator))
  //  );
  const groupHasilByKomponen = (hasilList) => {
    const groupedHasil = {};
    hasilList.forEach((hasil) => {
      const komponenId = hasil.Indikator.Komponen.id_komponen;
      if (!groupedHasil[komponenId]) {
        groupedHasil[komponenId] = [];
      }
      groupedHasil[komponenId].push(hasil);
    });
    return groupedHasil;
  };

  //  // Mendapatkan semua komponen yang unik
  const uniqueKomponen = Array.from(
    new Set(hasils.map((hasil) => hasil.Indikator.Komponen.namaKomponen))
  );
  const groupHasilByTanggal = (hasilList) => {
    const groupedHasil = {};
    hasilList.forEach((hasil) => {
      const { tgl } = hasil;
      if (!groupedHasil[tgl]) {
        groupedHasil[tgl] = [];
      }
      groupedHasil[tgl].push(hasil);
    });
    return groupedHasil;
  };

  // Mendapatkan semua indikator yang unik
  const uniqueIndikators = Array.from(
    new Set(hasils.map((hasil) => hasil.Indikator.namaIndikator))
  );


  const hapusPerkembangan = async (datahapus) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/perkembangan/${datahapus}`
      );
      const hapusData = response.data;
      const hapusku = hapusData && hapusData.datahapus;

      if (hapusku) {
        try {
          await axios.delete(`http://localhost:5000/perkembangan/${hapusku}`);
          window.location.reload();
        } catch (error) {
          console.error("Gagal menghapus data", error);
        }
      } else {
        console.error("Data hapus tidak ditemukan");
      }
    } catch (error) {
      console.error("Gagal mengambil data untuk dihapus", error);
    }
  };


  // useEffect(()=>{
  //   getdataHapusbyId(datahapus)
  // },[])
  return (
    <div className=" p-3 mt-5" style={{ background: "#f5f5f5" }}>
      <div className="mb-3">
        <Navbar />
      </div>
      <h1 className="title mt-5">Perkembangan latihan</h1>
      <h2 className="subtitle">Input Perkembangan Latihan Atlet</h2>
      <div className="is-flex is-align-items-center mb-3">
        <Link
          to={`/cabor/atlet/${idCabor}/${atlets && atlets.uuid}`}
          className="button is-dark"
        >
          Kembali
        </Link>
        <div className="is-flex is-align-items-center ml-3">
          <label className="mr-2 label">Periode :</label>
          <select className="select" onChange={handleSelectChange}>
            <option value={komponennya.periode}></option>
            {uniquePeriodes.map((periode, index) => (
              <option key={index} value={periode}>
                {periode}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="card latihan-card"
        style={{ maxWidth: "100%", border: "1px solid #ccc" }}
      >
        <header className="card-header column">
          <p className="card-header-title">Input Perkembangan</p>
        </header>
        <div
          className="card-content"
          // style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <div className="content">
            <div>
              <p>
                Nama : {atlets && atlets.name_awal}{" "}
                {atlets && atlets.nama_tengah} {atlets && atlets.nama_akhir}
              </p>
              <p>Jenis Kelamin : {atlets.kelamin}</p>
              <p>Cabor : {atlets && atlets.Cabor && atlets.Cabor.namaCabor}</p>

              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Komponen</th>
                      <th className="has-text-centered">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {komponens.map((komponen, index) => (
                      <tr key={komponen && komponen.id_komponen}>
                        <td>{index + 1}</td>
                        <td>{komponen && komponen.namaKomponen}</td>
                        <td className="has-text-centered">
                          <Link
                            className="button is-small"
                            onClick={() => bukaModal()}
                            to={`?id=${komponen && komponen.id_komponen}`}
                          >
                            Atur
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IndikatorEdit Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
      <div className="box card mt-3">
        {uniqueKomponen.map((komponen, index) => (
          <div key={index} className="content">
            <h3 className="subtitle">{komponen}</h3>
            {hasils.length > 0 ? (
              <table className="table is-bordered is-fullwidth">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    {/* Menampilkan kolom indikator yang unik untuk setiap komponen */}
                    {uniqueIndikators
                      .filter((indikator) =>
                        hasils.find(
                          (hasil) =>
                            hasil.Indikator.Komponen.namaKomponen ===
                              komponen &&
                            hasil.Indikator.namaIndikator === indikator
                        )
                      )
                      .map((indikator, index) => (
                        <th key={index}>{indikator}</th>
                      ))}
                    <th className="has-text-centered">Aksi</th> {/* Kolom untuk tombol delete */}
                  </tr>
                </thead>
                <tbody>
                  {/* Menampilkan hasil tes untuk setiap indikator pada setiap tanggal */}
                  {Object.entries(groupHasilByTanggal(hasils)).map(
                    ([tgl, hasilByTanggal], index) => {
                      const hasTanggal = hasilByTanggal.find(
                        (hasil) =>
                          hasil.Indikator.Komponen.namaKomponen === komponen &&
                          hasil.tgl === tgl
                      );
                      // Menampilkan baris hanya jika tanggal ada pada komponen tertentu
                      if (hasTanggal) {
                        return (
                          <tr key={index}>
                            <td>{tgl}</td>
                            {/* Menampilkan hasil tes untuk setiap indikator pada setiap tanggal */}
                            {uniqueIndikators
                              .filter((indikator) =>
                                hasilByTanggal.find(
                                  (hasil) =>
                                    hasil.Indikator.Komponen.namaKomponen === komponen &&  hasil.Indikator.namaIndikator === indikator &&
                                    hasil.tgl === tgl 
                                )
                              )
                              .map((indikator, index) => (
                                <td key={index}>
                                  {hasilByTanggal
                                    .filter(
                                      (hasil) =>
                                        hasil.Indikator.Komponen
                                          .namaKomponen === komponen &&
                                        hasil.Indikator.namaIndikator ===
                                          indikator &&
                                        hasil.tgl === tgl
                                    )
                                    .map((hasil, index) => (
                                      <div key={index}>{hasil.hasilTes}</div>
                                    ))}
                                </td>
                              ))}
                            <td className="has-text-centered">
                              <button
                                onClick={() =>
                                  hapusPerkembangan(hasTanggal.id_perkem)
                                }
                                className="button is-small is-danger"
                              >
                                <IoTrashSharp />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      return null; // Jika tidak ada tanggal pada komponen ini, lewati baris
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <p>Tidak ada data yang tersedia.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerkembanganLatihan;
