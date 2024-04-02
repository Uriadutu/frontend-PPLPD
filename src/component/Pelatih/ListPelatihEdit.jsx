import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoAdd, IoEye, IoPencil, IoTrashSharp } from "react-icons/io5";
import AddAtletModal from "../modal/addAtletModal";
import { useSelector } from "react-redux";
import EditAtletModal from "../modal/EditAtletModal";
import EditPelatihModal from "../modal/EditPelatihModal";

const ListPelatihEdit = () => {
  const [atlets, setAtlets] = useState([]);
  const [cabors, setCabor] = useState("");
  const { user } = useSelector((state) => state.auth);
  

  const { id } = useParams(); // Mengambil idCabor dari parameter URL
  const [modalUsersAktif, setModalUsersAktif] = useState(false);
  const [modalEdit, setModalEdit] = useState(true);

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
        `http://localhost:5000/cabor/pelatih/${id}`
      );
      setAtlets(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAtlet = async (atletId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus atlet ini?")) {
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

  const navigate = useNavigate();

  const bukaModalEdit = (id) => {
    setModalEdit(true);
  };

  const tutupModalEdit = () => {
        navigate(`/cabor/pelatih/${id}`);

  };

  return (
    <div className="p-3">
      <h1
        className="title 
is-size-6-mobile"
      >
        Pelatihhh
      </h1>
      <h2
        className="subtitle 
is-size-7-mobile"
      >
        List Pelatih {cabors && cabors.namaCabor}
      </h2>
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
            <IoAdd /> Tambah Pelatih
          </Link>
        )}
        {/* <Link className="button is-success ml-2" to={"/prestasi/atlet"}>Prestasi</Link> */}
      </div>
      <div className="overflow-x-scroll-mobile">

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
            <tr key={atlet && atlet.uuid}>
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
              <td className="has-text-centered">
                <Link
                  className="button is-primary is-small"
                  onClick={() => bukaModalEdit(atlet && atlet.id_pelatih)}
                  to={`?id=${atlet && atlet.id_pelatih}`}
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
      </div>
      <EditPelatihModal Muncul={modalEdit} tidakMuncul={tutupModalEdit} />
    </div>
  );
};

export default ListPelatihEdit;
