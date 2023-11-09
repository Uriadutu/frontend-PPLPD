import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddPanduan from "./modal/AddPanduan";
import { BsFileEarmarkPdf, BsFileEarmarkRichtext, BsFileEarmarkWord } from "react-icons/bs";

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
    <div>
      <h1 className="title">Panduan Pelaksanaan</h1>
      <h2 className="subtitle">Daftar Panduan Pelaksanaan</h2>
      <button className="button is-success mb-3" onClick={bukaModal}>
        Tambah File
      </button>
      <div className="container card">
        <div className="column ">
          <div className="column">
            <div className="columns is-multiline">
              {panduanP.map((panduan) => (
                <div className="column is-one-quarter" key={panduan.id_panduan}>
                  <div
                    className=""
                    style={{
                      boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
                      border: "solid 1px black",
                    }}
                  >
                    <div className="header pt-3 m-0">
                      <p className="has-text-centered subtitle">
                        <div>
                          {panduan.nama}.{panduan.format}
                        </div>
                      </p>
                    </div>
                    <figure className="image is-centered is-flex is-justify-content-center p-4">
                      {panduan.format === "pdf" && (
                        // Menampilkan ikon PDF jika format adalah PDF
                        <BsFileEarmarkPdf size={64} color="#777" />
                      )}
                      {panduan.format === "docx" && (
                        // Menampilkan ikon PDF jika format adalah PDF
                        <BsFileEarmarkWord size={64} color="#777" />
                      )}
                      {panduan.format === ("jpg", "jpeg", "png") && (
                        // Menampilkan ikon PDF jika format adalah PDF
                        <BsFileEarmarkRichtext size={64} color="#777" />
                      )}
                    </figure>
                    <div className=" is-flex">
                      <Link
                        to={panduan.url}
                        className="card-footer-item button is-dark m-0"
                        style={{ borderRadius: "0px" }}
                      >
                        Lihat
                      </Link>
                      <button
                        onClick={() => deletePanduan(panduan.id_panduan)}
                        className="card-footer-item button is-dark m-0"
                        style={{ borderRadius: "0px" }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ... */}
      <AddPanduan Muncul={modalAktif} TidakMuncul={TutupModal} />
    </div>
  );
};

export default Panduan;
