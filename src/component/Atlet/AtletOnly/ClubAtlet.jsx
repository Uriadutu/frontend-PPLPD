import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ClubAtlet = () => {
    const {user} = useSelector((state)=>state.auth)
    const idCabor = user && user.id_cabor
    const [listclub, setListClub] = useState([])
  const [pelatihs, setPelatih] = useState([]);

    const [club, setClub] = useState([])
    const idClub = user && user.club

    
    const atletclub = user &&user.club.slice(-2);
    const clubdaftar = idCabor + "0" + atletclub;

    
    const getPelatihbyClub = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/pelatih/club/${id}`
                );
                setPelatih(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {
        getPelatihbyClub(clubdaftar);
        }, [clubdaftar]);
    const getAtletByClub = async (id)=> {
        try {
            const response = await axios.get(`http://localhost:5000/atlet/club/isi/${id}`);
            setClub(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getClub = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/club/id/${id}`);
            setListClub(response.data);
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(()=>{
        getClub(atletclub)
        getAtletByClub(clubdaftar)
    },[clubdaftar, atletclub])


  return (
    <div className='p-3'>
      <h1 className="title is-size-6-mobile">Club {listclub && listclub.nama_club}</h1>
      <h2 className="subtitle is-size-7-mobile">List Atlet</h2>
      <Link to={`/dashboard`} className="button mb-3">
        Dashboard
      </Link>
      <div
        className="column box mb-0 mt-3 pb-3"
        style={{ borderRadius: "0px" }}
      >
        <label htmlFor="" className="label">
          Data Pelatih
        </label>
        {user && user.role === "Atlet" && (

        <table className="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pelatih</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
            </tr>
          </thead>
          <tbody>
            {pelatihs && pelatihs.length > 0 ? (
              pelatihs.map((pelatih, index) => (
                <tr key={pelatih && pelatih.id_pelatih}>
                  <td>{index + 1}</td>
                  <td>
                    {pelatih.name_awal} {pelatih.nama_tengah}{" "}
                    {pelatih.nama_akhir}
                  </td>
                  <td>{pelatih && pelatih.hp_mobile}</td>
                  <td>{pelatih && pelatih.email}</td>
                  <td>{pelatih && pelatih.kelamin}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="has-text-centered">
                  Belum Ada Pelatih Di Club Ini
                </td>
              </tr>
            )}
          </tbody>
        </table>
        )}
        {user && user.role === "Pelatih" && (

        <table className="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pelatih</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
            </tr>
          </thead>
          <tbody>
            {pelatihs && pelatihs.length > 0 ? (
              pelatihs.map((pelatih, index) => (
                <tr key={pelatih && pelatih.id_pelatih}>
                  <td>{index + 1}</td>
                  <td>
                    {pelatih.name_awal} {pelatih.nama_tengah}{" "}
                    {pelatih.nama_akhir}
                  </td>
                  <td>{pelatih && pelatih.hp_mobile}</td>
                  <td>{pelatih && pelatih.email}</td>
                  <td>{pelatih && pelatih.kelamin}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="has-text-centered">
                  Anda Belum Terdaftar DiClub ini
                </td>
              </tr>
            )}
          </tbody>
        </table>
        )}
      </div>
      {user && user.role === "Atlet" && (

      <div className="column box" style={{ borderRadius: "0px" }}>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Atlet</th>
              <th>Jenis Kelamin</th>
            </tr>
          </thead>
          <tbody>
            {club && club.length > 0 ? (
              club.map((atlet, index) => (
                <tr key={atlet.id_atlet}>
                  <td>{index + 1}</td>
                  <td>
                    {atlet && atlet.name_awal} {atlet && atlet.nama_tengah}{" "}
                    {atlet && atlet.nama_akhir}
                  </td>
                  <td>{atlet && atlet.kelamin}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="has-text-centered">
                  Anda Tidak Terdaftar Di Club
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
      {user && user.role === "Pelatih" && (

      <div className="column box" style={{ borderRadius: "0px" }}>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Atlet</th>
              <th>Jenis Kelamin</th>
            </tr>
          </thead>
          <tbody>
            {club && club.length > 0 ? (
              club.map((atlet, index) => (
                <tr key={atlet.id_atlet}>
                  <td>{index + 1}</td>
                  <td>
                    {atlet && atlet.name_awal} {atlet && atlet.nama_tengah}{" "}
                    {atlet && atlet.nama_akhir}
                  </td>
                  <td>{atlet && atlet.kelamin}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="has-text-centered">
                  Tidak Ada Atlet DiClub Ini
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

export default ClubAtlet
