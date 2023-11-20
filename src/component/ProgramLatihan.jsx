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
    <div>
      <h1 className="title">Program Latihan</h1>
      <h2 className="subtitle">
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

      <div className="columns is-multiline mt-3">
        {programs.map((program) => (
          <div
            className="column is-one-fifth"
            key={program && program.id_program}
          >
            <div
              className="card"
              style={{ boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="image has-text-centered">
                <h1 className="p-6 has-text-centered">
                  {program && program.nama_Program}
                </h1>
              </div>
              <footer className="card-footer has-background-dark">
                <Link
                  className="card-footer-item  button is-dark"
                  to={program.url}
                >
                  Lihat
                </Link>

                <button
                  className="card-footer-item button is-dark has-text-light"
                  onClick={() => hapusProgram(program.id_program)} // Perbaikan di sini, kirim ID ke fungsi hapusKomponen
                >
                  Hapus
                </button>
              </footer>
            </div>
          </div>
        ))}
      </div>
      <ProgramModal Muncul={modalUsersAktif} tidakMuncul={tutupModal} />
    </div>
  );
}

export default ProgramLatihan
