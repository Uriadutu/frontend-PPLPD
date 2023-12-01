import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoAdd, IoTrashSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import AddPelatihModal from "../modal/AddPelatihModal";

const PelatihCabor = () => {
  const [pelatihs, setPelatih] = useState([]);
  const [cabors, setCabor] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams(); // Mengambil idCabor dari parameter URL
  const [modalUsersAktif, setModalUsersAktif] = useState(false);

  useEffect(() => {
    getPelatihbyCabor(id);
    getCaborById(id);
  }, [id]);

  const getCaborById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`);
      setCabor(response.data);
    } catch (error) {}
  };

  const getPelatihbyCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pelatih/cabor/${id}`
      );
      setPelatih(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAtlet = async (idpelatih) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus atlet ini?")) {
      try {
        await axios.delete(`http://localhost:5000/pelatih/${idpelatih}`);
        getPelatihbyCabor();
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
  };

  return (
    <div>
      <h1 className="title">Pelatih</h1>

      <h2 className="subtitle">List Pelatih {cabors && cabors.namaCabor}</h2>

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
              <th className="has-text-centered">Aksi</th>
            )}
          </tr>
        </thead>
        {pelatihs.map((pelatih, index) => (
          <tbody style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}>
            <tr key={pelatih && pelatih.uuid} className="">
              <td>{index + 1}</td>
              <Link
                to={`/cabor/pelatih/${
                  pelatih && pelatih.Cabor && pelatih.Cabor.id_cabor
                }/${pelatih.uuid}`}
              >
                <td>{pelatih && pelatih.nama}</td>
              </Link>
              <td>{pelatih && pelatih.hp_mobile}</td>
              <td>{pelatih && pelatih.email}</td>
              {user && user.role === "Admin" && (
                <td className="has-text-centered">
                  <Link onClick={() => deleteAtlet(pelatih && pelatih.id_pelatih)}>
                    <IoTrashSharp />
                  </Link>
                </td>
              )}
            </tr>
          </tbody>
        ))}
      </table>
      <AddPelatihModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
};

export default PelatihCabor;
