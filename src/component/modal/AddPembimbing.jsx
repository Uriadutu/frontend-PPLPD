import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddPembimbing = ({ Muncul, TidakMuncul }) => {
    const [pelatihs, setPelatih] = useState([])
    const {idCabor} = useParams();
    const {idClub} = useParams();
  const navigate = useNavigate();
  
  const clubsnol = idCabor + "0";
  const clubisi = idCabor + "0" + idClub;
  const bimbing = idCabor + "0" + idCabor;

  useEffect(() => {
    getPelatihbyCabor(clubsnol);
  }, [clubsnol]);
  const Ubah = async(id) => {
    try {
         const formData = new FormData();
         formData.append("club", clubisi);

         await axios.patch(`http://localhost:5000/pelatih/${id}`, formData, {
           headers: {
             "Content-type": "multipart/form-data",
           },
         });
         TidakMuncul()

    } catch (error) {
        
    }
  }

 const getPelatihbyCabor = async(id) => {
    try {
        const response = await axios.get(`http://localhost:5000/pelatih/club/${id}`);
        setPelatih(response.data)
    } catch (error) {
        console.log(error);
    }
 }


  return (
    <div className={`modal ${Muncul ? "is-active" : ""}`}>
      <div className="modal-background">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Tambah Pelatih</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                TidakMuncul();
              }}
            ></button>
          </header>
          <form>
            <section className="modal-card-body">
              <div className="box is-flex columns is-justify-content-space-between">
                
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pelatihs.map((pelatih, index) => (
                      <tr key={pelatih.id_pelatih}>
                        <td>{index + 1}</td>
                        <td>
                          {pelatih.name_awal} {pelatih.nama_tengah}{" "}
                          {pelatih.nama_akhir}
                        </td>
                        <td>
                          <a className="button is-small is-info" onClick={()=> Ubah(pelatih && pelatih.id_pelatih)}>
                            Pilih
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="is-flex">
                <a
                  className="button"
                  onClick={() => {
                    TidakMuncul();
                  }}
                >
                  Batal
                </a>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPembimbing;
