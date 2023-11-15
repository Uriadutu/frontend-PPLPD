import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PengaturanAtlet = () => {

    const [atlets, setAtlet] = useState([]);
    
    useEffect(()=> {
        getAtlet();
    },[])
    const getAtlet = async()=> {
       try {
         const response = await axios.get("http://localhost:5000/atlet");
         setAtlet(response.data);
       } catch (error) {
        console.log(error);
       }
    }
  return (
    <div>
      <h1 className="title">Pengaturan Akun</h1>
      <h2 className="subtitle">Kontrol Akun</h2>
      <div className="card">
        <header className="card-header">
            <p className="card-header-title">Atur Hak Akses Atlet</p>
        </header>
        <div className="card-content">
            <div className="content">
                <select name="" id="" className="select">
                    <option value=""></option>
                    {atlets.map((atlet)=> (
                        <option key={atlet && atlet.id_atlet}>{atlet && atlet.nama}</option>
                    ))}
                </select>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PengaturanAtlet