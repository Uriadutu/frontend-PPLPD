import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAdd, IoArrowBack, IoTrashSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarForum = () => {
  const [forums, setForum] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getForum();
  }, []);
  const getForum = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forum");
      setForum(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusForum = async (id_forum) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus forum ini?")){
      try {
        await axios.delete(`http://localhost:5000/forum/${id_forum}`);
        getForum();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        margin: "0",
        left: "0",
        // width : "250px"
      }}
    >
      <header
        className="card-header is-fullwitdh"
        style={
          {
            //   width: "100%",
          }
        }
      >
        <div
          className="navbar-brand pl-2 pr-2 is-flex is-align-items-center is-justify-content-space-between is-fullwidth"
          style={{
            width: "100%",
          }}
        >
          {/* Tombol Kembali */}
          <div className="is-flex is-align-items-center ">
            <Link to="/dashboard" className="navbar-item is-arrow-back">
              <IoArrowBack size={24} />
            </Link>

            {/* Gambar Profil Forum dan Nama Forum */}
            <div className="navbar-item is-fixed">
              <span className="has-text-weight-semibold">Forum</span>
            </div>
          </div>
          {user && user.role === "Admin" && (
            <button className="button is-small" title="Tambah Forum">
              <IoAdd size={20} />
            </button>
          )}
        </div>
      </header>
      <aside
        className={`menu has-shadow`}
        style={{
          paddingTop: "10px",
          marginLeft: "10px",
          margin: "0",
        }}
      >
        {forums.map((Forum) => (
          <div className="is-flex is-justify-content-space-between" key={Forum && Forum.id_forum}>
            <Link
              to={`/pengumuman/${Forum && Forum.id_forum}`}
              className="button mb-1 forumku p-5 has-text-left is-justify-content-flex-start is-align-items-center"
            >
              <div>{Forum && Forum.namaForum} </div>
            </Link>
            <button onlclick={() => hapusForum(Forum && Forum.id_forum)}>
              <IoTrashSharp />
            </button>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default SidebarForum;
