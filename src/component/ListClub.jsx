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
    getClub(id)
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

  const hapusClub = async(id)=> {
    if(window.confirm("Apakah Anda yakin ingin menghapus data ini?")){
      try {
        await axios.delete(`http://localhost:5000/club/${id}`)
        getClub(id)
      } catch (error) {
        console.log(error);
      }
    }
    
  }
 
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
        <table className="table is- is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Club</th>
              <th>Jumlah Atlet</th>
              <th colSpan={2} className="has-text-centered">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{club && club.nama_club}</td>
                <td></td>
                <td className="has-text-centered">
                  <Link
                    to={`/cabor/club/${id}/${club && club.id_club}`}
                    onClick={() => club && club.id_club}
                    className="button is-small is-primary"
                  >
                    Atur
                  </Link>
                </td>
                <td className="has-text-centered">
                  <Link
                    className="button is-danger is-small"
                    onClick={() => hapusClub(club && club.id_club)}
                  >
                    Hapus
                  </Link>
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
