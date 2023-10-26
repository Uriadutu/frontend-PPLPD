import React, { useState } from "react";
import Addcabor from "./Addcabor.jsx";
import { useSelector } from "react-redux";

const Caborlist = () => {
  const [tampilkanAddCabor, setTampilkanCabor] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleAddCabor = () => {
    
    setTampilkanCabor(true);
  };

  return (

    <div>
      <h1 className="title">Cabang Olahraga</h1>
      <h2 className="subtitle">List Cabang Olahraga</h2>
      {user && user.role === "Admin" &&(
      <div className="">
        <button onClick={handleAddCabor} className=" button is-success">Tambah Cabor</button>
      </div>
      )}

      {tampilkanAddCabor && <Addcabor />}
    </div>
  );
};

export default Caborlist;
