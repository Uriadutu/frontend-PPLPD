import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const IndikatorEdit = ({ Muncul, tidakMuncul }) => {
  const [komponens, setKomponen] = useState([]);
  const [indikators, setIndikator] = useState([]);
  const { id, uuid, idAtlet } = useParams();
  const [klik, setKlik] = useState("");
  const [tgl, setTgl] = useState("");
  const [hasilTesArray, setHasilTesArray] = useState([]);
  const [atlets, setAtlet] = useState("");
  const location = useLocation();
  const [msg, setMsg] = useState("");
  const getAtletById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/atlet/${id}`);
      setAtlet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const id_atlet = atlets && atlets.id_atlet;
  const JikaKlik = (e, idIndikator) => {
    const hasilTesData = {
      id_indikator: idIndikator,
      hasilTes: e.target.value,
    };

    const updatedHasilTesArray = [...hasilTesArray];
    const existingIndex = updatedHasilTesArray.findIndex(
      (item) => item.id_indikator === idIndikator
    );

    if (existingIndex !== -1) {
      updatedHasilTesArray[existingIndex] = hasilTesData;
    } else {
      updatedHasilTesArray.push(hasilTesData);
    }

    setHasilTesArray(updatedHasilTesArray);
  };

  const idIndikatorArray = hasilTesArray.map((item) => item.id_indikator);
  const hasilTesDataArray = hasilTesArray.map((item) => item.hasilTes);

  const savelatihan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/perkembangan", {
        id_atlet: id_atlet,
        id_latihan: id,
        tgl: tgl,
        id_indikator: idIndikatorArray,
        hasilTes: hasilTesDataArray,
      });

      window.location.reload();
    } catch (error) {
        if (error) {
            setMsg(error.response.data.msg);
        }
      console.log(error);
    }
  };

  const getKomponenByid = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/komponen/${id}`);
      setKomponen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIndikatorByKomponen = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/indikator/komponen/${id}`
      );
      setIndikator(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQueryId = searchParams.get("id");
    if (newQueryId){
        getKomponenByid(newQueryId);
        getIndikatorByKomponen(newQueryId);
    }
    getAtletById(id);
  }, [id, idAtlet, location]);

  return (
    <div className={`modal ${Muncul ? "is-active" : ""}`}>
      <div className="modal-background">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{komponens && komponens.namaKomponen}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                tidakMuncul();
                setMsg(""); 
              }}
            ></button>
          </header>
          <div style={{ overflowX: "auto" }}>
            <form onSubmit={savelatihan}>
              <section className="modal-card-body">
                <table
                  className="table is-bordered is-fullwidth"
                  style={{ minWidth: "800px" }}
                >
                  <thead>
                    <tr>
                      <th className="has-text-centered">Tgl</th>
                      {indikators.map((indi) => (
                        <th
                          key={indi && indi.id_indikator}
                          className="has-text-centered"
                        >
                          {indi && indi.namaIndikator}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="has-text-centered">
                        <input
                          type="date"
                          className="input is-small"
                          value={tgl}
                          onChange={(e) => setTgl(e.target.value)}
                        />
                      </td>
                      {indikators.map((indi) => (
                        <td
                          key={indi && indi.id_indikator}
                          className="has-text-centered"
                        >
                          <input
                            className="input is-small"
                            type="text"
                            onChange={(e) =>
                              JikaKlik(e, indi && indi.id_indikator)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </section>
              <footer className="modal-card-foot">
                <div className="is-flex">
                  <a
                    className="button"
                    onClick={() => {
                      tidakMuncul();
                        setMsg(""); 
                    }}
                  >
                    Batal
                  </a>

                  <button className="button is-success ml-4" type="submit">
                    Simpan
                  </button>
                  <p className="ml-3"></p>
                </div>
                <p>{msg}</p>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndikatorEdit;
