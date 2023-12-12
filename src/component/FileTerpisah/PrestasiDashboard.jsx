import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const PrestasiDashboard = () => {
    const [prestasis, setPrestasi] = useState([])

    const {user} = useSelector((state)=>state.auth)

    const getPrestasi = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/prestasi/${user.id_atlet}`)
            setPrestasi(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPrestasi(user.id_atlet)
    })

  return (
    <div>
        <table className="table is-fullwidth is-hoverable">
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
                {prestasis.slice(5).map((prestasi, index) => (
                    <tr key={index}>
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
  )
}

export default PrestasiDashboard
