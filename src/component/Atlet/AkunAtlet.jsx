import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AkunAtlet = () => {
  const { user } = useSelector((state) => state.auth);
  const [atlet, setAtlet] = useState(null);

  useEffect(() => {
    const fetchAtletData = async () => {
      try {
        // Lakukan pemanggilan API untuk mendapatkan data atlet berdasarkan ID atlet
        const response = await axios.get(
          `http://localhost:5000/atlet/${user.id_atlet}`
        );
        setAtlet(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchAtletData();
    }
  }, [user]);

  return (
    <div>
      <h1 className="title">Akun Anda</h1>
      <h2 className="subtitle">{user && user.nama}</h2>
      <div className="card mt-3">
        <div className="columns is-multiple">
          <div className="column">
            <div className="card-header">
              <p>Hai, {user && user.nama}</p>
              {atlet && (
                <div>
                  <p>ID Atlet: {atlet.nama}</p>
                  {/* Tambahkan informasi lainnya tentang atlet sesuai kebutuhan */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AkunAtlet;
