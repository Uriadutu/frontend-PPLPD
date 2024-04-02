import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddPanduan from "./modal/AddPanduan";
import { BsFileEarmarkPdf, BsFileEarmarkRichtext, BsFileEarmarkWord } from "react-icons/bs";
import { namaSingkat } from "../utils/helper";

const Panduan = () => {
  const navigate = useNavigate();
  const [panduanP, setPanduan] = useState([]);
  //modal
  const [modalAktif, setmodalAktif] = useState(false);

  const TutupModal = () => {
    setmodalAktif(false);
    navigate("/panduan");
  };

  const bukaModal = () => {
    setmodalAktif(true);
  };

  useEffect(() => {
    getPanduan();
  }, []);

  const deletePanduan = async (panduanid) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus file ini?")) {
      try {
        await axios.delete(`http://localhost:5000/panduan/${panduanid}`);
        getPanduan();
      } catch (error) {
        console.error("Error deleting panduan:", error);
      }
    }
  };

  const getPanduan = async () => {
    const response = await axios.get("http://localhost:5000/panduan");
    setPanduan(response.data);
  };

  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Panduan Pelaksanaan</h1>
      <h2 className="subtitle is-size-7-mobile">Daftar Panduan Pelaksanaan</h2>
      <button className="button is-success mb-3" onClick={bukaModal}>
        Tambah File
      </button>
      <div className="container card overflow-x-scroll-mobile">
        <table className="table is-hovered is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama File</th>
              <th>Format</th>
              <th>FIle</th>
              <th colSpan={2} className="has-text-centered">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {panduanP.map((item, index) => (
              <tr key={item && item.id_panduan}>
                <td>{index + 1}</td>
                <td>{item && item.nama}</td>
                <td>{item && item.format}</td>
                <td>{item && namaSingkat(item.file)}</td>
                <td className="has-text-centered">
                  <Link
                    className="button is-primary is-small"
                    to={item && item.url}
                  >
                    Lihat
                  </Link>
                </td>
                <td className="has-text-centered">
                  <Link
                    className="button is-danger is-small"
                    onClick={() => deletePanduan(item && item.id_panduan)}
                  >
                    Hapus
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ... */}
      <AddPanduan Muncul={modalAktif} TidakMuncul={TutupModal} />
    </div>
  );
};

export default Panduan;
