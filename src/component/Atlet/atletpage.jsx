import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoTrashSharp } from "react-icons/io5";

const Atletpage = () => {
  const [atlets, setAtlet] = useState([]);
  const [sortBy, setSortBy] = useState("name_awal");
  const [searchText, setSearchText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [atletsPerPage] = useState(10);

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

  const filteredAndSortedAtlets = atlets
    .filter((atlet) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      return (
        atlet.name_awal.toLowerCase().includes(lowerCaseSearchText) ||
        (atlet.username &&
          atlet.username.toLowerCase().includes(lowerCaseSearchText))
      );
    })
    .sort((a, b) => {
      if (sortBy === "name_awal") {
        return a.name_awal.localeCompare(b.name_awal);
      } else if (sortBy === "username") {
        const usernameA = a.username || "";
        const usernameB = b.username || "";
        return usernameA.localeCompare(usernameB);
      }
      return 0;
    });

  const indexOfLastAtlet = currentPage * atletsPerPage;
  const indexOfFirstAtlet = indexOfLastAtlet - atletsPerPage;
  const currentAtlets = filteredAndSortedAtlets.slice(
    indexOfFirstAtlet,
    indexOfLastAtlet
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAndSortedAtlets.length / atletsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Atlet</h1>
      <h2 className="subtitle is-size-7-mobile">List Atlet</h2>

      <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <div className="is-flex is-align-items-center">
          <Link to={"/dashboard"} className="button mr-3">
            Dashboard
          </Link>

          <div className="is-flex is-align-items-center">
            <label className="mr-2 is-size-7-mobile is-hidden-desktop">Urut:</label>
            <label className="mr-2 is-size-7-mobile is-hidden-mobile">Urut Berdasarkan:</label>
            <select
              className="is-normal select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="name_awal">Nama</option>
              <option value="username">Username</option>
            </select>
          </div>
        </div>

        <div>
          <input
            type="text"
            className="input is-normal"
            placeholder="Cari Nama / ID Username"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-scroll-mobile">

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Create By</th>
            <th>Cabang Olahraga</th>
            <th>Status</th>
            <th className="has-text-centered">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentAtlets.map((atlet, index) => {
            const namaLengkap = capitalizeWords(
              `${atlet.name_awal || ""} ${atlet.nama_tengah || ""} ${
                atlet.nama_akhir || ""
              }`
            );

            return (
              <tr key={atlet.id_atlet}>
                <td>{index + 1}</td>
                <td>{namaLengkap}</td>
                <td>{atlet.username}</td>
                <td>{atlet?.Admin?.nama}</td>
                <td>{atlet?.Cabor?.namaCabor}</td>
                <td>{capitalizeWords(atlet.status)}</td>
                <td className="has-text-centered">
                  <Link
                    className="button is-danger is-small"
                    onClick={() => deleteAtlet(atlet && atlet.id_atlet)}
                  >
                    Hapus
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <nav
        className="pagination is-centered is-small"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                className={`pagination-link ${
                  currentPage === number ? "is-current" : ""
                }`}
                aria-label={`Page ${number}`}
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Atletpage;
