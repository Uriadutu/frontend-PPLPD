import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const PerkembanganLatihan = () => {
  const {user} = useSelector((state) => state.auth);
  const [rekams, setRekam] = useState([]);
  const [msg, setMsg] = useState("");
  const idLogin = user && user.id_atlet
  

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

  useEffect(()=>{getPerkembangan(idLogin)},[idLogin])


const getIndikators = () => {
  const indikators = {};
  rekams.forEach((item) => {
    const { hasilTes, Indikator } = item;
    const { namaIndikator } = Indikator;
    if (!indikators[namaIndikator]) {
      indikators[namaIndikator] = [];
    }
    indikators[namaIndikator].push(hasilTes);
  });
  return indikators;
};

const renderTableData = () => {
  const indikators = getIndikators();
  return rekams.map((item) => (
    <tr key={item.id_indikator}>
      <td>{item.id_atlet}</td>
      <td>{item.id_indikator}</td>
      <td>{item.tgl}</td>
      {Object.keys(indikators).map((namaIndikator) => (
        <td key={namaIndikator}>
          {item.Indikator.namaIndikator === namaIndikator
            ? indikators[namaIndikator].join(", ")
            : null}
        </td>
      ))}
    </tr>
  ));
};





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
        <div className="mt-2 box" key={komponen}>
          <h1 className="subtitle mt-2">{komponen}</h1>
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
                    {Object.keys(tableData[komponen][indikator]).map((tgl) => (
                      <td
                        className="has-text-centered"
                        key={`${komponen}-${indikator}-${tgl}`}
                      >
                        {tableData[komponen][indikator][tgl]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
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
      <h2 className="subtitle"></h2>
      <Link to={"/dashboard"} className="button mr-3">
        Dashboard
      </Link>
      <div className="">
        {renderTablesByKomponen()}
      </div>
    </div>
  );
};

export default PerkembanganLatihan;
