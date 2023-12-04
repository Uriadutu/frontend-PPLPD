import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import AddClub from "./modal/AddClub";

const ListClub = () => {
  const {id} = useParams();

  const [clubs, setClub]= useState([]);

  const [modalUsersAktif, setModalUsersAktif] = useState(false);
  const bukaModal = () => {
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
  };
  const getClub = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/club/${id}`);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getClub(id);
  },[id])
 
  return (
    <div>
      <h1 className="title">Club</h1>
      <h2 className="subtitle">List Club</h2>
      <Link to={"/cabor"} className="button is-dark mr-3">
        Kembali
      </Link>
      <Link className="button is-success" onClick={() => bukaModal()}>
        {" "}
        <IoAdd />
        Tambah Club
      </Link>
      <div className=" mt-3">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Club</th>
                <th>Jumlah Atlet</th>
                <th  colSpan={3}>Aksi</th>
              </tr>
            </thead>
            <tbody>
        {clubs.map((club, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{club && club.nama_club}</td>
                <td></td>
                <td>
                  <button onClick={() => club && club.id_club} className="button is-small is-primary">Atur</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
      </div>
      <AddClub Muncul={modalUsersAktif} TidakMuncul={tutupModal} />
    </div>
  );
};

export default ListClub;
