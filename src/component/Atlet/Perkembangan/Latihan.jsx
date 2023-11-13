import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Latihan = () => {
    const {id} = useParams();
    const [tgl, setTanggal] = useState("");
    const [hasilTes, setHasilTes] = useState("");
    const [atlets, setAtlet] = useState("");
    const [indikators, setIndikator] = useState("");
    
    useEffect =(()=> {
        getIndikator();
        getAtlet(id);
    },[id]);

    const getAtlet = async(id) => {
        try {
            const response = await axios.get(`http:localhost:5000/atlet/${id}`);
            setAtlet(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }
    const getIndikator = async()=> {
        try {
            const response = await axios.get(`http://localhost:5000/indikator/id`);
        } catch (error) {
            
        }
    }


    // const savePerkembangan = async ()=> {
    //     try {
    //         await axios.post("http://localhost:5000/perkembangan", {
    //             id_atlet : id,
    //             id_indikator : 
    //             id_komponen :
    //             tgl :
    //             hasilTes:
    //         })
    //     } catch (error) {
            
    //     }
    // }

  return (
    <div>
      <h1 className="title">Perkembangan latihan</h1>
      <h2 className="subtitle">Input Perkembangan Latihan Atlet</h2>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Component    </p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.      <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br/>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">Save</a>
          <a href="#" className="card-footer-item">Edit</a>
          <a href="#" className="card-footer-item">Delete</a>
        </footer>
      </div>
      
    </div>
  )
}

export default Latihan
