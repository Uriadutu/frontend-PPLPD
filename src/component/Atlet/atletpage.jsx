import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoTrashSharp } from "react-icons/io5";

const Atletpage = () => {
  const [atlets, setAtlet] = useState([]);
  const [sortBy, setSortBy] = useState("nama");
  const [searchText, setSearchText] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
      getAtlet();
  }, []);

  const getAtlet = async () => {
    try {
        const response = await axios.get("http://localhost:5000/atlet");
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
      <h1 className="title">Atlet</h1>
      <h2 className="subtitle">List Atlet</h2>

      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <div className="is-flex is-align-items-center">
          <Link to={"/dashboard"} className="button mr-3">
            Dashboard
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

        <div  >
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
          <th>Ctreate By</th>
          <th>Cabang Olahraga</th>
          <th>Status</th>
          <th className="has-text-centered">Aksi</th>
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
              <td>{atlet?.Admin?.nama}</td>
              <td>{atlet?.Cabor?.namaCabor}</td>
              <td>{capitalizeWords(atlet.status)}</td>
              <td className="has-text-centered">
                <Link onClick={() => deleteAtlet(atlet && atlet.id_atlet)}>
                  <IoTrashSharp />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>
    </div>
  );
};

export default Atletpage;
