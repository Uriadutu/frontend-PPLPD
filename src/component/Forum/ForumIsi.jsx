import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ForumIsi = () => {
  const [chats, setChat] = useState([]);
  const { id } = useParams();
  const contentRef = useRef(null); // Referensi ke elemen konten

  const { user } = useSelector((state) => state.auth);
  const idAdmin = (user && user.id_admin) || (user && user.id_Super);

  useEffect(() => {
    getChatbyForum(id);
  }, [id]);

  useEffect(() => {
    // Set scroll ke bawah setelah perubahan pada chats
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chats]);

  const getChatbyForum = async (idChat) => {
    try {
      const response = await axios.get(`http://localhost:5000/chat/${idChat}`);
      setChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2">
      {chats.map((chat, index) => (
        <div
          className={
            idAdmin === chat && chat.id_admin
              ? "is-flex is-justify-content-end"
              : "is-flex is-justify-content-start"
          }
        >
          <div
            key={chat && chat.id_isiforum}
            ref={index === chats.length - 1 ? contentRef : null} // Gunakan ref pada elemen terakhir
            className={
              idAdmin === chat && chat.id_admin
                ? "chat-forum-left box mt-4"
                : "chat-forum-right box mt-4"
            }
            style={{ maxWidth: "60%", display: "inline-block" }}
          >
            <div>
              <header>
                <p className="label">{chat && chat.Admin && chat.Admin.nama}</p>
              </header>
              {chat && chat.url ? (
                <Link to={chat.url} className="hover-chat">
                  <img src={chat.url} alt="" className="gambar-chat" />
                </Link>
              ) : null}
              <div className="m-0">
                <p
                  className="has-text-dark"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {chat && chat.pesan}
                </p>
              </div>
              <footer
                className={
                  idAdmin === chat && chat.id_admin
                    ? "is-flex is-justify-content-start"
                    : "is-flex is-justify-content-end"
                }
              >
                <p>{chat && chat.jam}</p>
              </footer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumIsi;
