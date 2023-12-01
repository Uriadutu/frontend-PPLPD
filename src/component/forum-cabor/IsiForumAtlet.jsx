import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Modal from "../modal/Modal-forum/AddForum";
import axios from "axios";
import KomentarModal from "../modal/Modal-forum/KomentarModal";
import { MdMessage } from "react-icons/md";
import { parseAndFormatDateString } from "../../utils/helper";

const IsiForumAtlet = () => {
  const [showModal, setShowModal] = useState(false);
  const [lihatModal, setLihatModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [cabors, setCabor] = useState([]);
  const [forums, setForum] = useState([]);
  const [forumadmin, setForumadmin] = useState([]);
  const { idCabor } = useParams();
  const idCaboratlet = user && user.Cabor && user.Cabor.id_cabor; // Memeriksa apakah user ada sebelum mengakses properti id_cabor

  const getForumByCabor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/forumcabor/cabor/${id}`
      );
      setForum(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getForumByCaboradmin = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/forumcabor/cabor/${id}`
      );
      setForumadmin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCaborbyId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/cabor/${id}`);
      setCabor(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCaborbyId(idCabor)
    getForumByCaboradmin(idCabor);
    getForumByCabor(idCaboratlet);
  }, [idCabor, idCaboratlet]);
  const handleClose = () => {
    setShowModal();
  };
  const tutupmodal = () => {
    setLihatModal();
  };
  return (
    <div>
      <h1 className="title">Forum</h1>
      <h2 className="subtitle">
        Diskusi Cabang Olahraga {cabors && cabors.namaCabor}
      </h2>
      <div className="is-flex is-justify-content-space-between mb-3">
        <div className="">
          <Link className="button is-dark" to={"/forum"}>
            Kembali
          </Link>
          {user && user.role !== "Admin" && (
            <Link
              className="mb-3 button is-success ml-3"
              onClick={() => setShowModal(true)}
            >
              Tambah Post
            </Link>
          )}
        </div>
        {user && user.role !== "Admin" && (
          <Link
            to={`/forum/cabor/komentar/${idCabor}/${
              user && user.id_atlet
                ? user.id_atlet
                : user && user.id_pelatih
                ? user.id_pelatih
                : null
            }`}
            className="button"
          >
            <MdMessage size={20} />
          </Link>
        )}
      </div>
      <div className="">
        <div className="">
          <div className="">
            {user &&
              user.role !== "Admin" &&
              (forums.length === 0 ? (
                <p>Belum ada percakapan</p>
              ) : (
                forums.map((forum) => (
                  <div className="box card" key={forum && forum.id_ForumCabor}>
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-98x98">
                          <img
                            src={
                              forum &&
                              (forum.Atlet && forum.Atlet.url
                                ? forum.Atlet.url
                                : forum.Pelatih && forum.Pelatih.url
                                ? forum.Pelatih.url
                                : null)
                            }
                            alt="Placeholder image"
                            style={{
                              width: "98px",
                              height: "98px",
                              objectFit: "cover",
                            }}
                          />
                          <p className="label has-text-centered">
                            {forum &&
                              (forum.Atlet && forum.Atlet.name_awal
                                ? forum.Atlet.name_awal
                                : forum.Pelatih && forum.Pelatih.name_awal
                                ? forum.Pelatih.name_awal
                                : null)}
                          </p>
                        </figure>
                      </div>
                      <div className="media-content is-flex is-justify-content-space-between is-align-items-end">
                        <div className="pl-3">
                          <p className="title is-4">
                            {forum && forum.judul_forum}
                          </p>
                          <p
                            className="subtitle is-6"
                            style={{ maxWidth: "90%" }}
                          >
                            {forum && forum.isi_forum}
                          </p>
                        </div>
                        <div className="">
                          <Link
                            className="button is-small is-primary"
                            to={`/forum/cabor/${idCabor}?Komen=${forum.id_ForumCabor}`}
                            onClick={() => setLihatModal(true)}
                          >
                            Komentar
                          </Link>
                        </div>
                      </div>
                    </div>
                    <footer className="card-foot">
                      <p className="is-flex is-justify-content-end">
                        {forum && parseAndFormatDateString(forum.createdAt)}
                      </p>
                    </footer>
                  </div>
                ))
              ))}
            {user &&
              user.role === "Admin" &&
              (forumadmin.length === 0 ? (
                <p>Belum ada percakapan</p>
              ) : (
                forumadmin.map((forum) => (
                  <div className="box card" key={forum && forum.id_ForumCabor}>
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-98x98">
                          <img
                            src={
                              forum &&
                              (forum.Atlet && forum.Atlet.url
                                ? forum.Atlet.url
                                : forum.Pelatih && forum.Pelatih.url
                                ? forum.Pelatih.url
                                : null)
                            }
                            alt="Placeholder image"
                            style={{
                              width: "98px",
                              height: "98px",
                              objectFit: "cover",
                            }}
                          />
                          <p className="label has-text-centered">
                            {forum &&
                              (forum.Atlet && forum.Atlet.name_awal
                                ? forum.Atlet.name_awal
                                : forum.Pelatih && forum.Pelatih.name_awal
                                ? forum.Pelatih.name_awal
                                : null)}
                          </p>
                        </figure>
                      </div>
                      <div className="media-content is-flex is-justify-content-space-between">
                        <div className="">
                          <p className="title is-4">
                            {forum && forum.judul_forum}
                          </p>
                          <p className="subtitle is-6">
                            {forum && forum.isi_forum}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} handleClose={handleClose} />
      <KomentarModal Lihat={lihatModal} tutupmodal={tutupmodal} />
    </div>
  );
};

export default IsiForumAtlet;
