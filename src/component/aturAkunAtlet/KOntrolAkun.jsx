import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const KontrolAkun = () => {
    const [atlets, setAtlet] = useState([]);
    const [sortBy, setSortBy] = useState("nama");
    const [searchText, setSearchText] = useState("");
    const { user } = useSelector((state) => state.auth);
    const {idCabor} = useParams();

    useEffect(() => {
      getAtlet(idCabor);
    }, [idCabor]);

    const getAtlet = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/cabor/atlet/${id}`);
        setAtlet(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleSortChange = (e) => {
      setSortBy(e.target.value);
    };

    const filteredAndSortedAtlets = atlets
      .filter((atlet) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        return (
          atlet.nama.toLowerCase().includes(lowerCaseSearchText) ||
          (atlet.username &&
            atlet.username.toLowerCase().includes(lowerCaseSearchText))
        );
      })
      .sort((a, b) => {
        if (sortBy === "nama") {
          return a.nama.localeCompare(b.nama);
        } else if (sortBy === "username") {
          const usernameA = a.username || "";
          const usernameB = b.username || "";
          return usernameA.localeCompare(usernameB);
        }
        return 0;
      });

    function capitalizeWords(sentence) {
      return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    const deleteAtlet = async (atletId) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus atlet ini?")) {
        try {
          await axios.delete(`http://localhost:5000/atlet/${atletId}`);
          getAtlet();
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    
  return (
    <div>
      <h1 className="title">Pengaturan Akun</h1>
      <h2 className="subtitle">Kontrol Akun</h2>
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <div className="is-flex is-align-items-center">
          <Link to={"/kontrolatlet"} className="button mr-3 is-dark">
            Kembali
          </Link>

          <div className="is-flex is-align-items-center">
            <label className="mr-2">Sort By:</label>
            <select
              className="is-normal select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="nama">Nama</option>
              <option value="username">Username</option>
            </select>
          </div>
        </div>

        <div className="">
          <input
            type="text"
            className="input is-normal"
            placeholder="Cari Nama / ID Username"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Status</th>
            <td className="has-text-centered">Aksi</td>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAtlets.map((atlet, index) => {
            // Memformat nama lengkap di setiap iterasi
            const namaLengkap = capitalizeWords(
              `${atlet.name_awal || ""} ${atlet.nama_tengah || ""} ${
                atlet.nama_akhir || ""
              }`
            );

            return (
              <tr key={atlet.id_atlet}>
                <td>{index + 1}</td>
                {/* Menggunakan variabel 'namaLengkap' langsung di sini */}
                <td>{namaLengkap}</td>
                <td>{atlet.username}</td>
                <td>
                  <select className="select is-small">
                    <option value="">Aktif</option>
                    <option value="">Tidak Aktif</option>
                  </select>
                </td>
                <td className="has-text-centered">
                  <button className="is-success button is-small ">
                    Simpan
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KontrolAkun;
