import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Atletpage = () => {
  const [atlets, setAtlet] = useState([]);
  const [sortBy, setSortBy] = useState("nama");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAtlet();
  }, []);

  const getAtlet = async () => {
    const response = await axios.get("http://localhost:5000/atlet");
    setAtlet(response.data);
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
            <th>Nama Atlet</th>
            <th>Username</th>
            <th>Cabang Olahraga</th>
            <th className="has-text-centered">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAtlets.map((atlet, index) => (
            <tr key={atlet.id_atlet}>
              <td>{index + 1}</td>
              <td>{atlet.nama}</td>
              <td>{atlet.username}</td>
              <td>{atlet && atlet.Cabor && atlet.Cabor.namaCabor}</td>
              <td className="has-text-centered">
                <a href="#">Lihat</a>
                <a href="#">Hapus</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Atletpage;
