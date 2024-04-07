import React, { useEffect, useState } from 'react'
import Logopplpd from "../img/PPLPDlogo.png";


const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentYear(new Date().getFullYear());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);
  return (
    <div
      className="m-0 mt-5"
      style={{
        padding: "0",
      }}
    >
      {/* <div className="content has-text-centered is-size-7-mobile is-size-6-desktop is-size-6-tablet p-0 m-0">
          <p>
            © 2023-{currentYear}{" "}
            <strong>Dinas Pemuda Dan Olahraga Kota Manado</strong>
          </p>
        </div> */}
      <div
        className=" mb-0"
        style={{
          paddingBottom: "0px",
          alignItems: "center",
        }}
      >
        <div
          className="p-3 pt-0 columns has-text-centered is-flex is-justify-content-center"
          style={{
            backgroundColor: "#ffff",
          }}
        >
          <p className="has-text-grey is-size-7-mobile">
            © 2023-{currentYear}{" "}
            <strong className="has-text-grey is-size-7-mobile">
              Dinas Pemuda Dan Olahraga Kota Manado
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer
