import React, { useEffect, useState } from "react";
import SidebarForum from "../../component/Forum/SidebarForum";
import { useParams } from "react-router-dom";
import { IoImageOutline, IoSend } from "react-icons/io5";
import axios from "axios";

const LayoutForum = ({ children }) => {
  const [forums, setForum] = useState([]);
  const [pesan, setPesan] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getForum(id);
  }, [id]);

  const getForum = async (idforum) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/forum/${idforum}`
      );
      setForum(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProgram = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const sendPesan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", pesan);
    formData.append("id_forum", id);

    try {
      await axios.post("http://localhost:5000/chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getForum();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="columns pt-1" style={{ minHeight: "100vh" }}>
        <div
          className="column is-2 p-0"
          style={{
            width: "350px",
            boxShadow: "4px 0px 3px rgba(0, 0, 0, 0.1)",
            zIndex: "2",
            left: "0",
            margin: "0",
          }}
        >
          <SidebarForum />
        </div>

        <div
          className="column p-0 m-0"
          style={{
            background: "#D5D5D5",
            zIndex: "1",
          }}
        >
          <div
            className="navbar"
            style={{
              top: "0",
              boxShadow: "4px 0px 3px rgba(0, 0, 0, 0.3)",
              position: "sticky",
            }}
          >
            <div className="navbar-item" style={{}}>
              <span
                className="has-text-weight-semibold
              "
              >
                {forums && forums.namaForum}
              </span>
            </div>
          </div>
          <main
             
            style={{
              minHeight: "100vh",
              maxWidth: "100%",
            }}
          >
            <div className="p-2 ">{children}</div>
          </main>
          <div
            className="bottom-fixed-component is-fixed-bottom has-background-white p-3"
            style={{
              position: "sticky",
              bottom: "0",
            }}
          >
            <form onSubmit={sendPesan}>
              {preview && (
                <figure className="image mb-5 is-128x128">
                  <img src={preview} alt="gambar" />
                </figure>
              )}
              <div className="is-flex pl-2 pr-2 is-align-items-center">
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        name="file"
                        className="file-input"
                        onChange={loadProgram}
                      />
                      <span className="file-cta">
                        <IoImageOutline size={30} />
                      </span>
                    </label>
                  </div>
                </div>

                <input
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  type="text"
                  className="input is-fullwidth mr-4 ml-3"
                  placeholder="Ketik pesan..."
                />
                <button type="submit">
                  <IoSend size={30} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LayoutForum;
