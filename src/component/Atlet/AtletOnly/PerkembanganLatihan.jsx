import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logoDinas from "../../../img/LogoPemkot.png";
import {useReactToPrint} from 'react-to-print'

const PerkembanganLatihan = () => {
  const {user} = useSelector((state) => state.auth);
  const [rekams, setRekam] = useState([]);
  const [msg, setMsg] = useState("");
  const ComponentToPDF = useRef();
  const [atlets, setAtlet] = useState([]);
  const {idAtlet} = useParams()
  let idLogin = null;
  if(user && user.role === "Admin") {
    idLogin = idAtlet;
  } else {
    idLogin = user && user.id_atlet;
  }

  const getPerkembangan = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/perkembangan/atlet/${id}`
      );
      setRekam((prevRekams) => [...prevRekams, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(rekams);
  const getAtletById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/atlet/${id}`);
      setAtlet(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{getPerkembangan(idLogin); 
    getAtletById(idAtlet)},[idLogin, idAtlet])

const Nama = atlets && atlets.name_awal + "_" + atlets && atlets.name_akhir
const handleExportPDF = useReactToPrint({
  content: ()=>ComponentToPDF.current,
  documentTitle: `Perkembangan_Latihan(SiAtlet).pdf`,
  })

const renderTablesByKomponen = () => {
  const uniqueKomponen = [
    ...new Set(rekams.map((item) => item.Indikator.Komponen.namaKomponen)),
  ];

  const tableData = {};

  uniqueKomponen.forEach((komponen) => {
    const filteredRekam = rekams.filter(
      (item) => item.Indikator.Komponen.namaKomponen === komponen
    );

    const uniqueIndikator = [
      ...new Set(filteredRekam.map((item) => item.Indikator.namaIndikator)),
    ];
    const uniqueDates = [...new Set(filteredRekam.map((item) => item.tgl))];

    tableData[komponen] = {};

    uniqueIndikator.forEach((indikator) => {
      tableData[komponen][indikator] = {};

      uniqueDates.forEach((tgl) => {
        const data = filteredRekam.find(
          (item) =>
            item.Indikator.namaIndikator === indikator && item.tgl === tgl
        );

        tableData[komponen][indikator][tgl] = data ? data.hasilTes : "-";
      });
    });
  });

  return (
    <div>
      {uniqueKomponen.map((komponen) => (
        <div>
          <div className="mt-1 box tutup-print" key={komponen}>
            <h1 className="subtitle mt-1">
              {" "}
              {komponen.slice(0, -7)}
            </h1>
            <table
              className="table is-fullwidth is-striped is-hoverable "
              style={{ border: "1px solid #ccc" }}
            >
              <thead className="has-background-primary ">
                <tr>
                  <th style={{ color: "white" }}>Indikator</th>
                  {tableData[komponen] &&
                    Object.keys(tableData[komponen]).length > 0 &&
                    Object.keys(
                      tableData[komponen][Object.keys(tableData[komponen])[0]]
                    ).map((tgl) => (
                      <th
                        className="has-text-centered"
                        style={{ color: "white" }}
                        key={tgl}
                      >
                        {tgl}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableData[komponen] &&
                  Object.keys(tableData[komponen]).map((indikator) => (
                    <tr key={`${komponen}-${indikator}`}>
                      <td>{indikator}</td>
                      {Object.keys(tableData[komponen][indikator]).map(
                        (tgl) => (
                          <td
                            className="has-text-centered"
                            key={`${komponen}-${indikator}-${tgl}`}
                          >
                            {tableData[komponen][indikator][tgl]}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 pl-5 pr-5 pb-5 mt-0 pt-0 none" key={komponen}>
            <h1 className="subtitle mt-2">
              {komponen.slice(0, -7)}
            </h1>
            <table
              className="table is-fullwidth is-bordered "
              style={{ border: "1px solid #ccc" }}
            >
              <thead>
                <tr>
                  <th style={{ color: "" }}>Indikator</th>
                  {tableData[komponen] &&
                    Object.keys(tableData[komponen]).length > 0 &&
                    Object.keys(
                      tableData[komponen][Object.keys(tableData[komponen])[0]]
                    ).map((tgl) => (
                      <th
                        className="has-text-centered"
                        style={{ color: "" }}
                        key={tgl}
                      >
                        {tgl}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableData[komponen] &&
                  Object.keys(tableData[komponen]).map((indikator) => (
                    <tr key={`${komponen}-${indikator}`}>
                      <td>{indikator}</td>
                      {Object.keys(tableData[komponen][indikator]).map(
                        (tgl) => (
                          <td
                            className="has-text-centered"
                            key={`${komponen}-${indikator}-${tgl}`}
                          >
                            {tableData[komponen][indikator][tgl]}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

  return (
    <div
      className="has-background-light p-3 mt-5"
      style={{ minHeight: "100vh" }}
    >
      <h1 className=" title mt-5">Perkembangan</h1>
      <h2 className="subtitle mb-5">
        {atlets && atlets.name_awal} {atlets && atlets.nama_tengah}{" "}
        {atlets && atlets.nama_akhir}
      </h2>
      <Link to={"/dashboard"} className="button mr-3">
        Dashboard
      </Link>
      <button className="button mb-3" onClick={handleExportPDF}>
        Cetak
      </button>
      <div   ref={ComponentToPDF}>
        <div className="print-ini">
          <div className=" pr-5 pl-5 pt-5 pb-0 none mb-1">
            <div className="headerprint p-3 is-flex">
              <img src={logoDinas} />
              <div className="sub-print">
                <h1 className="title is-5">
                  Dinas Pemuda Dan Olahraga Kota Manado
                </h1>
                <h2 className="subtitle is-6">
                  JL. Balikota, Tikala, Tikala Kumaraka, Kec. Wanang,
                  <br />
                  Kota Manado, Sulawesi, Indonesia
                  <br />
                  <p>
                    Telp. (0432) 845215
                    <br />
                    Fax. (0432) 845220
                    <br />
                  </p>
                </h2>
              </div>
            </div>
            <div className="is-flex is-justify-content-center">
              <p className="title-print title is-4 mt-2 mb-2">Perkembangan Latihan Atlet</p>
            </div>
            <div className="cont-print mt-2 mb-0">
              <div className="is-flex is-justify-content-space-between">

              <div className="is-flex">
                <div className="field">
                  <p>Nama</p>
                  <p>Temp/Tgl Lahir</p>
                  <p>ID</p>
                </div>
                <div className="isi ml-3">
                  <p>
                    : {atlets && atlets.name_awal}{" "}
                    {atlets && atlets.nama_tengah} {atlets && atlets.nama_akhir}
                    <p>
                      : {atlets && atlets.tmp_lahir}/
                      {atlets && atlets.tgl_lahir}
                    </p>
                    <p>: {atlets && atlets.username}</p>
                  </p>
                </div>
              </div>
              <div className="is-flex">
                <div className="field">
                  <p>Tahun Bergabung</p>
                  <p>Cabang Olahraga</p>
                  <p>Jenis Kelamin</p>
                </div>
                <div className="isi ml-3">
                  <p>
                    : {atlets && atlets.tahun_daftar}
                    <p>
                      : {atlets && atlets.Cabor && atlets.Cabor.namaCabor}
                    </p>
                    <p>: {atlets && atlets.kelamin}</p>
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
          {renderTablesByKomponen()}
        </div>
      </div>
    </div>
  );
};

export default PerkembanganLatihan;
