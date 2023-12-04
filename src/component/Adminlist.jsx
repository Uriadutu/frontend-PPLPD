import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  IoTrashSharp,
} from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Adminlist = () => {
  const [adminn, setAdmin] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    const response = await axios.get("http://localhost:5000/admin");
    setAdmin(response.data);
  };

  const deleteAdmin = async (adminId) => {
    await axios.delete(`http://localhost:5000/admin/${adminId}`);
    getAdmin();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };



  const filteredAdmin = adminn.filter((admin) => {
    return (
      admin.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.no_hp.includes(searchText)
    );
  });

  return (
    <div>
      <h1 className="title">Admin</h1>
      <h2 className="subtitle">List Admin</h2>
      <div className="is-flex is-justify-content-space-between mb-3 ">
        {user && user.role === "SuperAdmin" && (
          <Link to={"/daftaradmin/tambah"} className="button is-success">
            Tambah
          </Link>
        )}
        <div className="search-bar">
          <input
            className="input"
            type="text"
            placeholder="Cari admin..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>No HP</th>
            {user && user.role === "SuperAdmin" && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}>
          {filteredAdmin.map((admin, index) => (
            <tr key={admin.uuid} >
              <td>{index + 1}</td>
              <td>{admin.nama}</td>
              <td>{admin.no_hp}</td>
              {user && user.role === "SuperAdmin" && (
                <td>
                  <Link to={`/daftaradmin/edit/${admin.uuid}`} className="mr-3">
                    <FaPencil />
                  </Link>
                  <Link onClick={() => deleteAdmin(admin.uuid)}>
                    <IoTrashSharp />
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminlist;
