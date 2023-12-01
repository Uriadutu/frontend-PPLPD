import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const IsiClub = () => {
  const { idCabor } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const getClub = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/club/${id}`);
        setClub(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getClub(idCabor);
  }, [idCabor]);

  return (
    <div className="mt-5 p-3">
      <Navbar />
      <h1 className="title mt-5">Club {club && club.nama_club}</h1>
      <Link to={`/cabor/club/${idCabor}`} className="button is-dark">
        Kembali
      </Link>
    </div>
  );
};

export default IsiClub;
