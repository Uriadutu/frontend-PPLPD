import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { parseAndFormatDateString } from "../../utils/helper";
import { IoTrashSharp } from "react-icons/io5";

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
    if(window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {

      try {
        await axios.delete(`http://localhost:5000/forumcabor/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      <h1 className="title">Balasan / Komentar</h1>
      <h2 className="subtitle">Postingan Anda</h2>
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
                <p className="subtitle is-6" style={{ maxWidth: "90%" }}>
                  {forum && forum.isi_forum}
                </p>
                {forum && parseAndFormatDateString(forum.createdAt)}
              </div>
            </div>
          </div>
          <div className="box">
            <p>Komentar :</p>
            {comments
              .filter(
                (comment) => comment.id_forumCabor === forum.id_ForumCabor
              )
              .map((comment) => (
                <div className="">
                  <p key={comment.id_komen}>{comment.isi_komen}</p>
                </div>
              ))}
          </div>
          <footer className="card-foot">
            <p className="is-flex is-justify-content-end">
              <button
                onClick={() => deleteForumKomen(forum.id_ForumCabor)}
                className=" is-small ml-3"
              >
                <IoTrashSharp />
              </button>
            </p>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default IsiKomen;
