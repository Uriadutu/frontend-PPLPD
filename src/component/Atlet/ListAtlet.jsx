import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoAdd, IoTrashSharp } from "react-icons/io5";
import AddAtletModal from "../modal/addAtletModal";

const ListAtlet = () => {
  const [atlets, setAtlets] = useState([]);
  const [cabors, setCabor] = useState({});
  const [gambarr, setGambar] = useState([]);
  const { id } = useParams(); // Mengambil idCabor dari parameter URL
  const [modalUsersAktif, setModalUsersAktif] = useState(false);

  useEffect(() => {
    getAtletsbyCabor(id); // Menggunakan idCabor dalam permintaan
    getCabor();
    getGambar();
  }, [id]);

  const getCabor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`);
      setCabor(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAtletsbyCabor = async (idCabor) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cabor/atlet/${id}`
      );
      setAtlets(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getGambar = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gambar");
      setGambar(response.data);
    } catch (error) {
      
    }

  };

  const deleteAtlet = async (atletId, gambarId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus atlet ini?")) {
      try {
        // Hapus gambar bersamaan dengan atlet
        await axios.delete(`http://localhost:5000/gambar/${gambarId}`);

        // Hapus data atlet
        await axios.delete(`http://localhost:5000/atlet/${atletId}`);

        // Perbarui daftar atlet setelah penghapusan
        setAtlets((prevAtlets) =>
          prevAtlets.filter((atlet) => atlet.uuid !== atletId)
        );
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
      <h1 className="title">Atlet</h1>
      <h2 className="subtitle">List Atlet {cabors.namaCabor}</h2>

      <div className="is-flex  mb-3">
        <Link to={"/cabor"} className="mr-2">
          <a className="button is-dark">Kembali</a>
        </Link>
        <Link
          onClick={() => bukaModal()}
          to={`/cabor/atlet/${id}`}
          className="button is-success"
        >
          <IoAdd /> Tambah Atlet
        </Link>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}>
            {atlets.map((atlet, index) => (
                <tr key={atlet.uuid} className="">
                  <td>{index + 1}</td>
                  <td>{atlet.nama}</td>
                  <td>{atlet.role}</td>
                  <td>
                    <Link
                      onClick={() => deleteAtlet(atlet.uuid, setGambar.id_gambar)}
                    >
                      <IoTrashSharp />
                    </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      <AddAtletModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
};

export default ListAtlet;
