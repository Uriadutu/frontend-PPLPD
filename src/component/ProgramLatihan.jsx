import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProgramModal from './modal/ProgramModal';
import { useSelector } from 'react-redux';

const ProgramLatihan = () => {
    const [cabors, setCabor] = useState([]);
    const [programs, setProgram]= useState([]);
    const {id} = useParams();

    const [modalUsersAktif, setModalUsersAktif] = useState(false);
    const {user} = useSelector((state)=> state.auth);
    
    useEffect(()=> {
        getCaborById(id);
        getProgrambyId(id);

    },[id])
    const getCaborById = async (id)=> {
        try {
            const response = await axios.get(`http://localhost:5000/cabor/${id}`)
            setCabor(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const hapusProgram = async (id)=> {
        if (window.confirm("Apakah Anda yakin ingin menghapus file ini?")) {
        try {
            await axios.delete(`http://localhost:5000/program/${id}`)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        }
    }

    const getProgrambyId = async (id)=> {
        try {
            const response = await axios.get(`http://localhost:5000/program/cabor/${id}`)
            setProgram(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const bukaModal = () => {
    setModalUsersAktif(true); // Buka modal
  };

  const tutupModal = () => {
    setModalUsersAktif(false);
  };

  return (
    <div className='p-3'>
      <h1 className="title is-size-6-mobile">Program Latihan</h1>
      <h2 className="subtitle is-size-7-mobile">
        List Program Latihan {cabors && cabors.namaCabor}
      </h2>
      {user && user.role === "Admin" && (
        <div className="is-flex">
          <Link to={"/cabor"} className="button is-dark mr-3">
            Kembali
          </Link>
          <button className="button is-success" onClick={() => bukaModal()}>
            Tambah Program Latihan
          </button>
        </div>
      )}
      {user && user.role === "Atlet" && (
        <Link to={"/dashboard"} className="button">
          Dashboard
        </Link>
      )}
      <table
        className="table is-fullwidth is-striped mt-3 is-narrow"
        style={{ overflowX: "auto" }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Program</th>
            <th>File</th>
            <th colspan="2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, index) => (
            <tr key={program && program.id_program}>
              <td>{index + 1}</td>
              <td>{program && program.nama_Program}</td>
              <td>{program && program.File}</td>
              {user && user.role === "Atlet" && (
                <td>
                  <Link
                    className="button is-small is-primary"
                    to={program && program.url}
                  >
                    Lihat
                  </Link>
                </td>
              )}
              {user && user.role === "Admin" && (
                <td>
                  {" "}
                  <button
                    className="is-small button is-dark has-text-light"
                    onClick={() => hapusProgram(program.id_program)} // Perbaikan di sini, kirim ID ke fungsi hapusKomponen
                  >
                    Hapus
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ProgramModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
}

export default ProgramLatihan
