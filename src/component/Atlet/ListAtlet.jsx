import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoAdd, IoTrashSharp } from "react-icons/io5";
import AddAtletModal from "../modal/addAtletModal";
import { useSelector } from "react-redux";

const ListAtlet = () => {
  const [atlets, setAtlets] = useState([]);
  const [cabors, setCabor] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams(); // Mengambil idCabor dari parameter URL
  const [modalUsersAktif, setModalUsersAktif] = useState(false);

  useEffect(() => {
    getAtletsbyCabor(id);
    getCaborById(id);
  }, [id]);

  const getCaborById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`)
      setCabor(response.data);
    } catch (error) {
      
    }
  }

  const getAtletsbyCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/atlet/${id}`
      );
      setAtlets(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAtlet = async (atletId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus atlet ini?")) {
      try {
        await axios.delete(`http://localhost:5000/atlet/${atletId}`);
        getAtletsbyCabor(id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const bukaModal = (id) => {
    setModalUsersAktif(true);
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
    getAtletsbyCabor(id);

  };

  return (
    <div>
      <h1 className="title">Atlet</h1>

      <h2 className="subtitle">List Atlet {cabors && cabors.namaCabor}</h2>

      <div className="is-flex  mb-3">
        <Link to={"/cabor"} className="mr-2">
          <a className="button is-dark">Kembali</a>
        </Link>
        {user && user.role === "Admin" && (
          <Link
            onClick={() => bukaModal()}
            to={`/cabor/atlet/${id}`}
            className="button is-success"
          >
            <IoAdd /> Tambah Atlet
          </Link>
        )}
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>No HP</th>
            <th>Email</th>
            {user && user.role === "Admin" && (
              <th className="has-text-centered">Aksi</th>
            )}
          </tr>
        </thead>
        {atlets.map((atlet, index) => (
          <tbody style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}>
            <tr key={atlet && atlet.uuid} className="">
              <td>{index + 1}</td>
              <Link
                to={`/cabor/atlet/${
                  atlet && atlet.Cabor && atlet.Cabor.id_cabor
                }/${atlet.uuid}`}
              >
                <td>
                  {atlet && atlet.name_awal} {atlet && atlet.nama_tengah}{" "}
                  {atlet && atlet.nama_akhir}
                </td>
              </Link>
              <td>{atlet && atlet.hp_mobile}</td>
              <td>{atlet && atlet.email}</td>
              {user && user.role === "Admin" && (
                <td className="has-text-centered">
                  <Link onClick={() => deleteAtlet(atlet && atlet.id_atlet)}>
                    <IoTrashSharp />
                  </Link>
                </td>
              )}
            </tr>
          </tbody>
        ))}
      </table>
      <AddAtletModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
};

export default ListAtlet;
