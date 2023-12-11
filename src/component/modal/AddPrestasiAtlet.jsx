import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AddPrestasiAtlet = ({ Muncul, TidakMuncul }) => {
  const [namaClub, setNamaClub] = useState("");
  const [namaEvent, setNamaEvent] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [pencapaian, setPencapaian] = useState("");
  const [tahunPrestasi, setTahunPrestasi] = useState("");
  const [msg, setMsg] = useState("");
  const [pelatih, setPelatih] = useState([]);

  const { uuid } = useParams();
  const idPelatih = pelatih && pelatih.id_atlet;

  const getPelatihbyuuid = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/atlet/uuid/${id}`
      );
      setPelatih(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPelatihbyuuid(uuid);
  }, [uuid]);
  const savePrestasi = async () => {
    try {
      await axios.post(`http://localhost:5000/prestasi/`, {
        id_atlet: idPelatih,
        namaClub: namaClub,
        namaEvent: namaEvent,
        Tingkat: tingkat,
        Pencapaian: pencapaian,
        tahunPrestasi: tahunPrestasi,
      });
      TidakMuncul();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={`modal ${Muncul ? "is-active" : ""}`}>
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Tambah Prestasi Atlet</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => {
                  TidakMuncul();
                  setMsg("");
                }}
              ></button>
            </header>
            <form onSubmit={savePrestasi}>
              <section className="modal-card-body">
                <div className="box is-flex columns is-justify-content-space-between">
                  <div className="komp">
                    <div className="field">
                      <label className="label">Nama Club</label>
                      <div className="control">
                        <input
                          autoComplete="off"
                          type="text"
                          className="input"
                          value={namaClub}
                          onChange={(e) => setNamaClub(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Nama Event</label>
                      <div className="control">
                        <input
                          autoComplete="off"
                          type="text"
                          className="input"
                          value={namaEvent}
                          onChange={(e) => setNamaEvent(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Tahun Prestasi</label>
                      <div className="control">
                        <input
                          autoComplete="off"
                          type="text"
                          className="input"
                          value={tahunPrestasi}
                          onChange={(e) => setTahunPrestasi(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Tingkat</label>
                      <div className="control">
                        <select
                          value={tingkat}
                          className="select"
                          onChange={(e) => setTingkat(e.target.value)}
                        >
                          <option value=""></option>
                          <option value="Internasional">Internasional</option>
                          <option value="Nasional">Nasional</option>
                          <option value="Provinsi">Provinsi</option>
                          <option value="Kabupaten">Kabupaten</option>
                          <option value="Kota">Kota</option>
                          <option value="Kecamatan">Kecamatan</option>
                          <option value="Kelurahan">Kelurahan</option>
                          <option value="Desa">Desa</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Pencapaian</label>
                      <div className="control">
                        <select
                          className="select"
                          value={pencapaian}
                          onChange={(e) => setPencapaian(e.target.value)}
                        >
                          <option value=""></option>
                          <option value="Emas">Emas</option>
                          <option value="Perak">Perak</option>
                          <option value="Perunggu">Perunggu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <div className="is-flex">
                  <a
                    className="button"
                    onClick={() => {
                      TidakMuncul();
                      setMsg("");
                    }}
                  >
                    Batal
                  </a>
                  <button className="button is-success ml-4" type="submit">
                    Simpan
                  </button>
                  <p className="ml-3">{msg}</p>
                </div>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrestasiAtlet;
