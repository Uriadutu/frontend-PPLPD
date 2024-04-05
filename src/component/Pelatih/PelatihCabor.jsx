import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoAdd, IoTrashSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import AddPelatihModal from "../modal/AddPelatihModal";

const PelatihCabor = () => {
  const [atlets, setAtlets] = useState([]);
  const [cabors, setCabor] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams(); // Mengambil idCabor dari parameter URL
  const [modalUsersAktif, setModalUsersAktif] = useState(false);

  console.log(id);
  useEffect(() => {
    getAtletsbyCabor(id);
    getCaborById(id);
  }, [id]);

  const getCaborById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`);
      setCabor(response.data);
    } catch (error) {}
  };

  const getAtletsbyCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pelatih/cabor/${id}`
      );
      setAtlets(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAtlet = async (atletId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pelatih ini?")) {
      try {
        await axios.delete(`http://localhost:5000/pelatih/${atletId}`);
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
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Pelatih</h1>

      <h2 className="subtitle is-size-7-mobile">List Pelatih {cabors && cabors.namaCabor}</h2>

      <div className="is-flex  mb-3">
        <Link to={"/cabor"} className="mr-2">
          <a className="button is-dark">Kembali</a>
        </Link>
        {user && user.role === "Admin" && (
          <Link
            onClick={() => bukaModal()}
            to={`/cabor/pelatih/${id}`}
            className="button is-success"
          >
            <IoAdd /> Tambah Pelatih
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
              <th colSpan={2} className="has-text-centered">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        {atlets.map((atlet, index) => (
          <tbody style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}>
            <tr key={atlet && atlet.id_pelatih}>
              <td>{index + 1}</td>
              <Link
                to={`/cabor/pelatih/${
                  atlet && atlet.Cabor && atlet.Cabor.id_cabor
                }/${atlet.uuid}`}
              >
                <td>
                  {atlets && atlet.name_awal} {atlet && atlet.nama_tengah}{" "}
                  {atlets && atlet.nama_akhir}
                </td>
              </Link>
              <td>{atlet && atlet.hp_mobile}</td>
              <td>{atlet && atlet.email}</td>
              <td className="has-text-centered">
                <Link
                  className="button is-primary is-small"
                  to={`/cabor/pelatih/${id}/edit/${atlet && atlet.id_pelatih}`}
                >
                  Edit
                </Link>
              </td>
              <td className="has-text-centered">
                <Link
                  className="button is-danger is-small"
                  onClick={() => deleteAtlet(atlet && atlet.id_pelatih)}
                >
                  Hapus
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <AddPelatihModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
};

export default PelatihCabor;
