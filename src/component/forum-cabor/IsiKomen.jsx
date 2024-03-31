import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { parseAndFormatDateString } from "../../utils/helper";
import { IoTrashSharp } from "react-icons/io5";
import axios from "axios";

const IsiKomen = () => {
  const [forums, setForums] = useState([]);
  const [comments, setComments] = useState([]);
  const { idAtlet } = useParams();
  const { user } = useSelector((state) => state.auth);
  const uuidPenulis = user && user.uuid;
  const idCabor = user && user.Cabor && user.Cabor.id_cabor;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumResponse = await axios.get(
          `http://localhost:5000/forumcabor/atlet/${idAtlet}`
        );
        setForums(forumResponse.data);

        if (forumResponse.data.length > 0) {
          const commentResponse = await axios.get(
            `http://localhost:5000/komentar/uuid/${uuidPenulis}`
          );
          setComments(commentResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [idAtlet, uuidPenulis]);

  const deleteForumKomen = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      try {
        await axios.delete(`http://localhost:5000/forumcabor/${id}`);
        window.location.reload();
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Status showAllComments untuk setiap forum
  const [showAllCommentsStatus, setShowAllCommentsStatus] = useState({});

  const toggleShowAllComments = (forumId) => {
    setShowAllCommentsStatus({
      ...showAllCommentsStatus,
      [forumId]: !showAllCommentsStatus[forumId],
    });
  };

  return (
    <div className="p-3">
      <h1 className="title is-size-6-mobile">Balasan / Komentar</h1>
      <h2 className="subtitle is-size-7-mobile">Postingan Anda</h2>
      <Link to={`/forum/cabor/${idCabor}`} className="button is-dark mb-3">
        Kembali
      </Link>

      {forums.map((forum) => (
        <div className="box card" key={forum.id_ForumCabor}>
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
                <p className="title is-4">{forum && forum.judul_forum}</p>
                <p className="subtitle is-6 mb-3" style={{ maxWidth: "90%" }}>
                  {forum && forum.isi_forum}
                </p>
                {forum && parseAndFormatDateString(forum.createdAt)}
              </div>
            </div>
          </div>
          <div>
            <p>Komentar :</p>
            {comments
              .filter(
                (comment) => comment.id_forumCabor === forum.id_ForumCabor
              )
              .map((comment, index) => (
                <div
                  key={comment.id_komen}
                  className={`box is-flex mb-1 ${
                    showAllCommentsStatus[forum.id_ForumCabor] || index < 2
                      ? ""
                      : "is-hidden"
                  }`}
                >
                  <img
                    className="image is-48x48"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    src={
                      comment &&
                      (comment.Atlet && comment.Atlet.url
                        ? comment.Atlet.url
                        : comment.Pelatih && comment.Pelatih.url
                        ? comment.Pelatih.url
                        : null)
                    }
                    alt=""
                  />
                  <div className="ml-3">
                    <p className="label mb-0">
                      {comment &&
                        (comment.Atlet && comment.Atlet.name_awal
                          ? comment.Atlet.name_awal
                          : comment.Pelatih && comment.Pelatih.name_awal
                          ? comment.Pelatih.name_awal
                          : null)}{" "}
                      {comment &&
                        (comment.Atlet && comment.Atlet.nama_akhir
                          ? comment.Atlet.nama_akhir
                          : comment.Pelatih && comment.Pelatih.nama_akhir
                          ? comment.Pelatih.nama_akhir
                          : null)}
                    </p>
                    <p>{comment.isi_komen}</p>
                  </div>
                </div>
              ))}
          </div>
          {comments.filter(
            (comment) => comment.id_forumCabor === forum.id_ForumCabor
          ).length > 2 && (
            <footer className="card-foot">
              <div className="is-flex is-justify-content-space-between mt-2">
                <button
                  onClick={() => toggleShowAllComments(forum.id_ForumCabor)}
                  className="button is-small mt-2"
                >
                  {showAllCommentsStatus[forum.id_ForumCabor]
                    ? "Tutup"
                    : `Lihat (${
                        comments.filter(
                          (comment) =>
                            comment.id_forumCabor === forum.id_ForumCabor
                        ).length - 2
                      } lainnya)`}
                </button>
              </div>
            </footer>
          )}
          <footer className="card-foot">
            <p className="is-flex is-justify-content-end">
              <button
                onClick={() => deleteForumKomen(forum.id_ForumCabor)}
                className="is-small ml-3 p-2"
              >
                Hapus Post dan Komentar <IoTrashSharp />
              </button>
            </p>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default IsiKomen;
