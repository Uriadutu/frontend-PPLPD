import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const PrestasiDashboard = () => {
    const [prestasis, setPrestasi] = useState([])

    const {user} = useSelector((state)=>state.auth)

    const idAtlet = user && user.id_atlet;
    const getPrestasi = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/prestasi/${id}`)
            setPrestasi(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPrestasi(idAtlet)
    }, [idAtlet])

  return (
    <div className="is-full-mobile is-full-tablet is-full-desktop overflow-x-scroll-mobile">
      <table
        className="table is-fullwidth is-hoverable is-6 "
        style={{ fontSize: "14px" }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Club</th>
            <th>Nama Event</th>
            <th>Tahun</th>
            <th>Tingkat</th>
            <th>Pencapaian</th>
          </tr>
        </thead>
        <tbody>
          {prestasis.map((prestasi, index) => (
            <tr key={prestasi && prestasi.id_prestasi}>
              <td>{index + 1}</td>
              <td>{prestasi.namaClub}</td>
              <td>{prestasi.namaEvent}</td>
              <td>{prestasi.tahunPrestasi}</td>
              <td>{prestasi.Tingkat}</td>
              <td>{prestasi.Pencapaian}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrestasiDashboard
