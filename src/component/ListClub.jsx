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
    getAPIProv();
  },[id])

  const [prov, setProv] = useState([]);

  const getAPIProv = async ()=> {
    try {
      await axios.get("https://wilayah.id/api/provinces.json");
      setProv();
    } catch (error) {
      
    }
  }
  console.log(prov);
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
      <select>
      {prov.map((provinsi) => (
          <option key={provinsi.code}> {provinsi && provinsi.data && provinsi.data.nama}</option>
          ))}
          </select>
      <div className="columns is-multiline mt-3">
        {clubs.map((club) => (
          <div className="column is-one-fifth" key={club && club.id_club}>
            <div
              className="card"
              style={{
                boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                border: "1px solid #888",
              }}
            >
              <Link
                to={`/cabor/club/${id}/${club && club.id_club}`}
                className="has-text-dark"
              >
                <div className="image has-text-centered">
                  <h1 className="p-6 has-text-centered label">
                    {club && club.nama_club}
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <AddClub Muncul={modalUsersAktif} TidakMuncul={tutupModal} />
    </div>
  );
};

export default ListClub;
