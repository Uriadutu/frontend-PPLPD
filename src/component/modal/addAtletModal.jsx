import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const AddAtletModal = ({ Muncul, tidakMuncul }) => {

  const [activeTab, setActiveTab] = useState("data-diri");
  const [msg, setMsg] = useState("");
  const [cabors, setCabor] = useState("");
  const { id } = useParams();

  const [NamaDepan, setNamaDepan] = useState("");
  const [NamaTengah, setNamaTengah] = useState("");
  const [NamaBelakang, setNamaBelakang] = useState("");
  const [NamaPanggilan, setNamaPanggilan] = useState("");
  const [TempatLahiratlet, setTempatLahiratlet] = useState("");
  const [TglLahiratlet, setTglLahiratlet] = useState("");
  const [AgamaAtlet, setAgamaAtlet] = useState("");
  const [JenisKelaminAtlet, setJenisKelaminAtlet] = useState("");
  const [GolonganDarahAtlet, setGolonganDarahAtlet] = useState("");
  const [ProvinsiAtlet, setProvinsiAtlet] = useState("");
  const [KotaAtlet, setKotaAtlet] = useState("");
  const [KecamatanAtlet, setKecamatanAtlet] = useState("");
  const [KelurahanAtlet, setKelurahanAtlet] = useState("");
  const [DesaAtlet, setDesaAtlet] = useState("");
  const [NamaJalanAtlet, setNamaJalanAtlet] = useState("");
  const [NotelpAtlet, setNotelpAtlet] = useState("");
  const [NohpAtlet, setNohpAtlet] = useState("");
  const [EmailAtlet, setEmailAtlet] = useState("");
  const [TinggiBadanAtlet, setTinggiBadanAtlet] = useState("");
  const [BeratBadanAtlet, setBeratBadanAtlet] = useState("");
  const [TahunGabungAtlet, setTahunGabungAtlet] = useState("");
  const [UkuranBaju, setUkuranBaju] = useState("");
  const [UkuranSepatu, setUkuranSepatu] = useState("");
  const [Pendidikan, setPendidikan] = useState("");
  const [NamaSekolahAtlet, setNamaSekolahAtlet] = useState("");
   const [PendidikanTerakhirAtlet, setPendidikanTerakhirAtlet] = useState("");
   const [NamaAlumniAtlet, setNamaAlumniAtlet] = useState("");
   const [TahunLulusAtlet, setTahunLulusAtlet] = useState("");
  const [NamaAyah, setNamaAyah] = useState("");
  const [TempatLahirAyah, setTempatLahirAyah] = useState("");
  const [TglLahirAyah, setTglLahirAyah] = useState("");
  const [AgamaAyah, setAgamaAyah] = useState("");
  const [PekerjaanAyah, setPekerjaanAyah] = useState("");
  const [NotelpAyah, setNotelpAyah] = useState("");
  const [NohpAyah, setNohpAyah] = useState("");
  const [EmailAyah, setEmailAyah] = useState("");
  const [NamaIbu, setNamaIbu] = useState("");
  const [TempatLahirIbu, setTempatLahirIbu] = useState("");
  const [TglLahirIbu, setTglLahirIbu] = useState("");
  const [AgamaIbu, setAgamaIbu] = useState("");
  const [PekerjaanIbu, setPekerjaanIbu] = useState("");
  const [NotelpIbu, setNotelpIbu] = useState("");
  const [NohpIbu, setNohpIbu] = useState("");
  const [EmailIbu, setEmailIbu] = useState("");
  const [ProvinsiOrtu, setProvinsiOrtu] = useState("");
  const [KotaOrtu, setKotaOrtu] = useState("");
  const [KecamatanOrtu, setKecamatanOrtu] = useState("");
  const [KelurahanOrtu, setKelurahanOrtu] = useState("");
  const [DesaOrtu, setDesaOrtu] = useState("");
  const [NamaJalanOrtu, setNamaJalanOrtu] = useState("");
  const [NamaWali, setNamaWali] = useState("");
  const [HubKeluargaWali, setHubKeluargaWali] = useState("");
  const [TempatLahirWali, setTempatLahirWali] = useState("");
  const [TglLahirWali, setTglLahirWali] = useState("");
  const [AgamaWali, setAgamaWali] = useState("");
  const [JenisKelaminWali, setJenisKelaminWali] = useState("");
  const [PekerjaanWali, setPekerjaanWali] = useState("");
  const [NotelpWali, setNotelpWali] = useState("");
  const [NohpWali, setNohpWali] = useState("");
  const [EmailWali, setEmailWali] = useState("");
  const [ProvinsiWali, setProvinsiWali] = useState("");
  const [KotaWali, setKotaWali] = useState("");
  const [KecamatanWali, setKecamatanWali] = useState("");
  const [KelurahanWali, setKelurahanWali] = useState("");
  const [DesaWali, setDesaWali] = useState("");
  const [NamaJalanWali, setNamaJalanWali] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const handleRadioChange = (e) => {
    setPendidikan(e.target.value); // Mengatur nilai radio yang dipilih ke state
  };
const handleRadioChanges = (e) => {
  setPendidikanTerakhirAtlet(e.target.value);
};
  const LoadImage = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const saveAtlet = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_awal", NamaDepan);
    formData.append("id_cabor", id);
    formData.append("nama_tengah", NamaTengah);
    formData.append("nama_akhir", NamaBelakang);
    formData.append("nama_panggil", NamaPanggilan);
    formData.append("tgl_lahir", TglLahiratlet);
    formData.append("tmp_lahir", TempatLahiratlet);
    formData.append("agama", AgamaAtlet);
    formData.append("nama_jalan", NamaJalanAtlet);
    formData.append("desa", DesaAtlet);
    formData.append("kelurahan", KelurahanAtlet);
    formData.append("kecamatan", KecamatanAtlet);
    formData.append("kota", KotaAtlet);
    formData.append("provinsi", ProvinsiAtlet);
    formData.append("no_telp", NotelpAtlet);
    formData.append("hp_mobile", NohpAtlet);
    formData.append("email", EmailAtlet);
    formData.append("kelamin", JenisKelaminAtlet);
    formData.append("gol_darah", GolonganDarahAtlet);
    formData.append("tinggi_badan", TinggiBadanAtlet);
    formData.append("berat_badan", BeratBadanAtlet);
    // pendidikan
    formData.append("pendidikan", Pendidikan);
    formData.append("nama_sklh", NamaSekolahAtlet);
    formData.append("pend_terakhir", PendidikanTerakhirAtlet);
     formData.append("alumni", NamaAlumniAtlet);
     formData.append("tahun_lulus", TahunLulusAtlet);
     formData.append("ukuran_baju", UkuranBaju);
    formData.append("ukuran_baju", UkuranBaju);

    formData.append("ukuran_sepatu", UkuranSepatu);
    formData.append("tahun_daftar", TahunGabungAtlet);
    // ayah
    formData.append("nama_ayah", NamaAyah);
    formData.append("tmpLahir_ayah", TempatLahirAyah);
    formData.append("tglLahir_ayah", TglLahirAyah);
    formData.append("agama_ayah", AgamaAyah);
    formData.append("pekerjaan_ayah", PekerjaanAyah);
    formData.append("noHp_ayah", NohpAyah);
    formData.append("notlp_ayah", NotelpAyah);
    formData.append("email_ayah", EmailAyah);
    // ibu
    formData.append("nama_ibu", NamaIbu);
    formData.append("tmpLahir_ibu", TempatLahirIbu);
    formData.append("tglLahir_ibu", TglLahirIbu);
    formData.append("agama_ibu", AgamaIbu);
    formData.append("pekerjaan_ibu", PekerjaanIbu);
    formData.append("noHp_ibu", NohpIbu);
    formData.append("notlp_ibu", NotelpIbu);
    formData.append("email_ibu", EmailIbu);

    formData.append("provinsi_ortu", ProvinsiOrtu);
    formData.append("kota_ortu", KotaOrtu);
    formData.append("kecamatan_ortu", KecamatanOrtu);
    formData.append("kelurahan_ortu", KelurahanOrtu);
    formData.append("desa_ortu", DesaOrtu);
    formData.append("namaJalan_ortu", NamaJalanOrtu);
    //wali
    formData.append("nama_wali", NamaWali);
    formData.append("hubkeluarga_wali", HubKeluargaWali);
    formData.append("tempLahir_wali", TempatLahirWali);
    formData.append("tglLahir_wali", TglLahirWali);
    formData.append("agama_wali", AgamaWali);
    formData.append("jeniskelamin_wali", JenisKelaminWali);
    formData.append("pekerjaan_wali", PekerjaanWali);
    formData.append("noHp_wali", NohpWali);
    formData.append("notlp_wali", NotelpWali);
    formData.append("email_wali", EmailWali);
    formData.append("provinsi_wali", ProvinsiWali);
    formData.append("kota_wali", KotaWali);
    formData.append("kecamatan_wali", KecamatanWali);
    formData.append("kelurahan_wali", KelurahanWali);
    formData.append("desa_wali", DesaWali);
    formData.append("namaJalan_wali", NamaJalanWali);
    formData.append("file", file);
    try {

      await axios.post("http://localhost:5000/atlet", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      tidakMuncul();
      window.location.reload();

    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    getCabor();
  }, [id]);

  const getCabor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`);
      setCabor(response.data);
    } catch (error) {}
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={`modal ${Muncul ? "is-active" : ""}`}>
      <form onSubmit={saveAtlet}>
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                Tambah Atlet {cabors.namaCabor}
              </p>
              <Link
                className="delete"
                aria-label="close"
                onClick={() => {
                  tidakMuncul();
                  setMsg("");
                }}
              ></Link>
            </header>
            <section className="modal-card-body p-0">
              <div className=" p-0">
                <div className="tabs is-boxed is-fixed">
                  <ul>
                    <li
                      className={activeTab === "data-diri" ? "is-active" : ""}
                      onClick={() => handleTabClick("data-diri")}
                    >
                      <a>Data Atlet</a>
                    </li>
                    <li
                      className={
                        activeTab === "data-pendidikan" ? "is-active" : ""
                      }
                      onClick={() => handleTabClick("data-pendidikan")}
                    >
                      <a>Data Pendidikan</a>
                    </li>
                    <li
                      className={
                        activeTab === "data-orang-tua" ? "is-active" : ""
                      }
                      onClick={() => handleTabClick("data-orang-tua")}
                    >
                      <a>Data Orang Tua</a>
                    </li>
                    <li
                      className={activeTab === "data-wali" ? "is-active" : ""}
                      onClick={() => handleTabClick("data-wali")}
                    >
                      <a>Data Wali</a>
                    </li>
                    <li
                      className={
                        activeTab === "data-prestasi" ? "is-active" : ""
                      }
                      onClick={() => handleTabClick("data-prestasi")}
                    >
                      <a>Data Prestasi</a>
                    </li>
                  </ul>
                </div>
                {activeTab === "data-diri" && (
                  <div>
                    <div className="container">
                      <div className="column">
                        <p className="label">Data Diri :</p>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Nama Depan<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="text"
                            value={NamaDepan}
                            onChange={(e) => setNamaDepan(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Nama Tengah</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaTengah}
                            onChange={(e) => setNamaTengah(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Nama Belakang<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaBelakang}
                            onChange={(e) => setNamaBelakang(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Nama Panggilan</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaPanggilan}
                            onChange={(e) => setNamaPanggilan(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Tempat Lahir<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={TempatLahiratlet}
                            onChange={(e) =>
                              setTempatLahiratlet(e.target.value)
                            }
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Tanggal Lahir<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={TglLahiratlet}
                            onChange={(e) => setTglLahiratlet(e.target.value)}
                            type="date"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Agama<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <select
                            className="is-small input "
                            value={AgamaAtlet}
                            onChange={(e) => setAgamaAtlet(e.target.value)}
                          >
                            <option value=""></option>
                            <option value="Kristen Protestan">
                              Kristen Protestan
                            </option>
                            <option value="Kristen Katolik">
                              Kristen Katolik
                            </option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Konghucu">Konghucu</option>
                            <option value="Budha">Budha</option>
                          </select>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Jenis Kelamin<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <select
                            className="is-small input "
                            value={JenisKelaminAtlet}
                            onChange={(e) =>
                              setJenisKelaminAtlet(e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Golongan Darah</label>
                        <div className="control">
                          <select
                            className="is-small input"
                            value={GolonganDarahAtlet}
                            onChange={(e) =>
                              setGolonganDarahAtlet(e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B">B</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O">O</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB">AB</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                      </div>

                      <div className="column">
                        <p className="label">Alamat :</p>
                      </div>
                      <div className="is-justify-content-space-between is-flex">
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">
                            Provinsi<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <input
                              className="input is-small"
                              value={ProvinsiAtlet}
                              onChange={(e) => setProvinsiAtlet(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">
                            Kota<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <input
                              className="input is-small"
                              value={KotaAtlet}
                              onChange={(e) => setKotaAtlet(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="is-justify-content-space-between is-flex">
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">
                            Kecamatan<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <input
                              className="input is-small"
                              value={KecamatanAtlet}
                              onChange={(e) =>
                                setKecamatanAtlet(e.target.value)
                              }
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">Kelurahan</label>
                          <div className="control">
                            <input
                              className="input is-small"
                              value={KelurahanAtlet}
                              onChange={(e) =>
                                setKelurahanAtlet(e.target.value)
                              }
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="is-justify-content-space-between is-flex">
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">Desa</label>
                          <div className="control">
                            <input
                              className="input is-small"
                              value={DesaAtlet}
                              onChange={(e) => setDesaAtlet(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">Nama Jalan</label>
                          <div className="control">
                            <input
                              className="input is-small"
                              value={NamaJalanAtlet}
                              onChange={(e) =>
                                setNamaJalanAtlet(e.target.value)
                              }
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="column">
                        <label className="label">Kontak</label>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No Telepon</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NotelpAtlet}
                            onChange={(e) => setNotelpAtlet(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          No HP / Mobile<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NohpAtlet}
                            onChange={(e) => setNohpAtlet(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Email</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={EmailAtlet}
                            onChange={(e) => setEmailAtlet(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="column">
                        <label className="label">Data Lainnya</label>
                      </div>
                      <div className="is-justify-content-space-between is-flex">
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">
                            Tinggi Badan<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <input
                              className="input is-small"
                              placeholder="Cm"
                              type="text"
                              value={TinggiBadanAtlet}
                              onChange={(e) =>
                                setTinggiBadanAtlet(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="field is-justify-content-space-between is-flex column">
                          <label className="">
                            Berat Badan<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <input
                              className="input is-small"
                              placeholder="Kg"
                              type="text"
                              value={BeratBadanAtlet}
                              onChange={(e) =>
                                setBeratBadanAtlet(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">
                          Tahun Bergabung<wajib>*</wajib>
                        </label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="text"
                            value={TahunGabungAtlet}
                            onChange={(e) =>
                              setTahunGabungAtlet(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="is-justify-content-space-between is-flex">
                        <div className="field is-half is-justify-content-space-between is-flex column">
                          <label className="">
                            Ukuran Baju<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <select
                              className="is-small input "
                              value={UkuranBaju}
                              onChange={(e) => setUkuranBaju(e.target.value)}
                            >
                              <option value=""></option>
                              <option value="M">M</option>
                              <option value="S">S</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                              <option value="3XL">3XL</option>
                              <option value="4XL">4XL</option>
                            </select>
                          </div>
                        </div>
                        <div className="field is-half is-justify-content-space-between is-flex column">
                          <label className="">
                            Ukuran Sepatu<wajib>*</wajib>
                          </label>
                          <div className="control">
                            <select
                              className="is-small input "
                              value={UkuranSepatu}
                              onChange={(e) => setUkuranSepatu(e.target.value)}
                            >
                              <option value=""></option>
                              <option value="37">37</option>
                              <option value="38">38</option>
                              <option value="39">39</option>
                              <option value="40">40</option>
                              <option value="41">41</option>
                              <option value="42">42</option>
                              <option value="43">43</option>
                              <option value="44">44</option>
                              <option value="45">45</option>
                              <option value="46">46</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="column label">
                        Gambar<wajib>*</wajib>
                      </div>
                      <div className="control">
                        <div className="file">
                          <label className="file-label">
                            <input
                              type="file"
                              name="file"
                              className="file-input"
                              onChange={LoadImage}
                            />
                            <span className="file-cta">
                              <span className="file-label">Pilih Gambar</span>
                            </span>
                          </label>
                          <p>jpg, png, jpeg</p>
                        </div>
                      </div>
                      {file && (
                        <figure className="image is-128x128">
                          <img src={preview} alt="Foto Atlet" />
                        </figure>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "data-pendidikan" && (
                  <div>
                    <div className="container">
                      <div className="column">
                        <p className="label">Pendidikan Formal :</p>
                      </div>
                      <div className=" is-full is-justify-content-space-between is-flex column">
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="sekolah"
                            value="SD"
                            checked={Pendidikan === "SD"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChange}
                          />
                          <label className="">SD</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="sekolah"
                            value="SMP"
                            checked={Pendidikan === "SMP"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChange}
                          />
                          <label className="">SMP</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="sekolah"
                            value="SMA"
                            checked={Pendidikan === "SMA"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChange}
                          />
                          <label className="">SMA</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="sekolah"
                            value="SMK"
                            checked={Pendidikan === "SMK"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChange}
                          />
                          <label className="">SMK</label>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Nama Sekolah</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaSekolahAtlet}
                            onChange={(e) =>
                              setNamaSekolahAtlet(e.target.value)
                            }
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <label className="column label">Jika Sudah lulus</label>
                    <label className="column">Pendidikan Terakhir :</label>
                    <div className="field is-full is-justify-content-space-between is-flex column">
                      <div className=" is-full is-justify-content-space-between is-flex column">
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="alumni"
                            value="TK"
                            checked={PendidikanTerakhirAtlet === "TK"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChanges}
                          />
                          <label className="">TK</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="alumni"
                            value="SD"
                            checked={PendidikanTerakhirAtlet === "SD"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChanges}
                          />
                          <label className="">SD</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="alumni"
                            value="SMP"
                            checked={PendidikanTerakhirAtlet === "SMP"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChanges}
                          />
                          <label className="">SMP</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="alumni"
                            value="SMA"
                            checked={PendidikanTerakhirAtlet === "SMA"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChanges}
                          />
                          <label className="">SMA</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="alumni"
                            value="SMK"
                            checked={PendidikanTerakhirAtlet === "SMK"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChanges}
                          />
                          <label className="">SMK</label>
                        </div>
                        <div
                          className="is-flex"
                          style={{ alignItems: "center", gap: "10px" }}
                        >
                          <input
                            type="radio"
                            name="alumni"
                            value="S1"
                            checked={PendidikanTerakhirAtlet === "S1"} // Mengecek apakah radio ini yang dipilih
                            onChange={handleRadioChanges}
                          />
                          <label className="">S1</label>
                        </div>
                      </div>
                    </div>
                    <div className="field is-full is-justify-content-space-between is-flex column">
                      <label className="">Nama Sekolah / Universitas</label>
                      <div className="control">
                        <input
                          className="input is-small"
                          type="text"
                          value={NamaAlumniAtlet}
                          onChange={(e) => setNamaAlumniAtlet(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field is-full is-justify-content-space-between is-flex column">
                      <label className="">Tahun Lulus</label>
                      <div className="control">
                        <input
                          className="input is-small"
                          value={TahunLulusAtlet}
                          onChange={(e) => setTahunLulusAtlet(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "data-orang-tua" && (
                  <div>
                    <div className="container">
                      <div className="column">
                        <p className="label">Data Ayah :</p>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Nama</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaAyah}
                            onChange={(e) => setNamaAyah(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Tempat / Tanggal Lahir</label>
                        <div
                          className="control is-flex"
                          style={{ gap: "10px" }}
                        >
                          <input
                            className="input is-small"
                            value={TempatLahirAyah}
                            onChange={(e) => setTempatLahirAyah(e.target.value)}
                            type="text"
                          />
                          <input
                            className="input is-small"
                            value={TglLahirAyah}
                            onChange={(e) => setTglLahirAyah(e.target.value)}
                            type="date"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Agama</label>
                        <div className="control">
                          <select
                            className="is-small input "
                            value={AgamaAyah}
                            onChange={(e) => setAgamaAyah(e.target.value)}
                          >
                            <option value=""></option>
                            <option value="Kristen Protestan">
                              Kristen Protestan
                            </option>
                            <option value="Kristen Katolik">
                              Kristen Katolik
                            </option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Konghucu">Konghucu</option>
                            <option value="Budha">Budha</option>
                          </select>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Pekerjaan</label>
                        <div className="control is-flex">
                          <input
                            className="input is-small"
                            value={PekerjaanAyah}
                            onChange={(e) => setPekerjaanAyah(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No Telepon</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NotelpAyah}
                            onChange={(e) => setNotelpAyah(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No HP / Mobile</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NohpAyah}
                            onChange={(e) => setNohpAyah(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Email</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={EmailAyah}
                            onChange={(e) => setEmailAyah(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="column">
                        <p className="label">Data Ibu :</p>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Nama</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaIbu}
                            onChange={(e) => setNamaIbu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Tempat / Tanggal Lahir</label>
                        <div
                          className="control is-flex"
                          style={{ gap: "10px" }}
                        >
                          <input
                            className="input is-small"
                            value={TempatLahirIbu}
                            onChange={(e) => setTempatLahirIbu(e.target.value)}
                            type="text"
                          />
                          <input
                            className="input is-small"
                            value={TglLahirIbu}
                            onChange={(e) => setTglLahirIbu(e.target.value)}
                            type="date"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Agama</label>
                        <div className="control">
                          <select
                            className="is-small input "
                            value={AgamaIbu}
                            onChange={(e) => setAgamaIbu(e.target.value)}
                          >
                            <option value=""></option>
                            <option value="Kristen Protestan">
                              Kristen Protestan
                            </option>
                            <option value="Kristen Katolik">
                              Kristen Katolik
                            </option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Konghucu">Konghucu</option>
                            <option value="Budha">Budha</option>
                          </select>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Pekerjaan</label>
                        <div className="control is-flex">
                          <input
                            className="input is-small"
                            value={PekerjaanIbu}
                            onChange={(e) => setPekerjaanIbu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No Telepon</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NotelpIbu}
                            onChange={(e) => setNotelpIbu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No HP / Mobile</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NohpIbu}
                            onChange={(e) => setNohpIbu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Email</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={EmailIbu}
                            onChange={(e) => setEmailIbu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <p className="label">Alamat :</p>
                    </div>
                    <div className="is-justify-content-space-between is-flex">
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Provinsi</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={ProvinsiOrtu}
                            onChange={(e) => setProvinsiOrtu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Kota</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={KotaOrtu}
                            onChange={(e) => setKotaOrtu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="is-justify-content-space-between is-flex">
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Kecamatan</label>
                        <div className="control">
                          <input
                            className="input is-small "
                            value={KecamatanOrtu}
                            onChange={(e) => setKecamatanOrtu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Kelurahan</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={KelurahanOrtu}
                            onChange={(e) => setKelurahanOrtu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="is-justify-content-space-between is-flex">
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Desa</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={DesaOrtu}
                            onChange={(e) => setDesaOrtu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Nama Jalan</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaJalanOrtu}
                            onChange={(e) => setNamaJalanOrtu(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "data-wali" && (
                  <div>
                    <div className="container">
                      <div className="column">
                        <label className="label">Data Wali :</label>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Nama</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaWali}
                            onChange={(e) => setNamaWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Hubungan Keluarga</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={HubKeluargaWali}
                            onChange={(e) => setHubKeluargaWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Tempat / Tanggal Lahir</label>
                        <div
                          className="control is-flex"
                          style={{ gap: "10px" }}
                        >
                          <input
                            className="input is-small"
                            value={TempatLahirWali}
                            onChange={(e) => setTempatLahirWali(e.target.value)}
                            type="text"
                          />
                          <input
                            className="input is-small"
                            value={TglLahirWali}
                            onChange={(e) => setTglLahirWali(e.target.value)}
                            type="date"
                          />
                        </div>
                      </div>

                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Agama</label>
                        <div className="control">
                          <select
                            className="is-small input "
                            value={AgamaWali}
                            onChange={(e) => setAgamaWali(e.target.value)}
                          >
                            <option value=""></option>
                            <option value="Kristen Protestan">
                              Kristen Protestan
                            </option>
                            <option value="Kristen Katolik">
                              Kristen Katolik
                            </option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Konghucu">Konghucu</option>
                            <option value="Budha">Budha</option>
                          </select>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Jenis Kelamin</label>
                        <div className="control">
                          <select
                            className="is-small input "
                            value={JenisKelaminWali}
                            onChange={(e) =>
                              setJenisKelaminWali(e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Pekerjaan</label>
                        <div className="control is-flex">
                          <input
                            className="input is-small"
                            value={PekerjaanWali}
                            onChange={(e) => setPekerjaanWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No Telepon</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NotelpWali}
                            onChange={(e) => setNotelpWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">No HP / Mobile</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NohpWali}
                            onChange={(e) => setNohpWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-full is-justify-content-space-between is-flex column">
                        <label className="">Email</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={EmailWali}
                            onChange={(e) => setEmailWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <p className="label">Alamat :</p>
                    </div>
                    <div className="is-justify-content-space-between is-flex">
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Provinsi</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={ProvinsiWali}
                            onChange={(e) => setProvinsiWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Kota</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={KotaWali}
                            onChange={(e) => setKotaWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="is-justify-content-space-between is-flex">
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Kecamatan</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={KecamatanWali}
                            onChange={(e) => setKecamatanWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Kelurahan</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={KelurahanWali}
                            onChange={(e) => setKelurahanWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="is-justify-content-space-between is-flex">
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Desa</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={DesaWali}
                            onChange={(e) => setDesaWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="field is-justify-content-space-between is-flex column">
                        <label className="">Nama Jalan</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            value={NamaJalanWali}
                            onChange={(e) => setNamaJalanWali(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "data-prestasi" && <div className=""></div>}
              </div>
            </section>
            <footer className="modal-card-foot">
              <Link
                to={`/cabor/atlet/${id}`}
                className="button is-dark"
                onClick={() => {
                  getCabor();
                  tidakMuncul();
                  setMsg(""); // Mengatur pesan menjadi string kosong saat tombol ditutup
                }}
              >
                Batal
              </Link>
              <button className="button is-success" type="submit">
                Simpan
              </button>
              <p>{msg}</p>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAtletModal;
