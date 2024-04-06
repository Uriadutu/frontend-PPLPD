import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useMediaQuery } from "react-responsive";
import BackgroundTop from "../img/BgTop.png";
import Logopplpd from "../img/PPLPDlogo.png";

const Layout = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6 p-0" style={{ minHeight: "100vh" }}>
        {isMobile ? null : (
          <div
            className="column is-2 "
            style={{
              width: "240px",
              // backgroundColor :"black",
              // color : "white"
              // boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.3)",
              borderRight: "1px solid rgb(220, 220, 220)",
            }}
          >
            <Sidebar />
          </div>
        )}

        <div
          className="column p-0 m-0 pl-3 pr-3 is-hidden-mobile"
          style={{
            backgroundImage: `url(${BackgroundTop})`,
            //   backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
          }}
        >
          <main className="" style={{ minHeight: "100vh", maxWidth: "100%" }}>
            {children}
          </main>
        </div>
        <div
          className="column p-0 m-0 pl-3 is-hidden-desktop"
          style={{
            background: "white",
          }}
        >
          <main className="" style={{ minHeight: "100vh", maxWidth: "100%" }}>
            {children}
          </main>
        </div>
      </div>
      <div
        className="m-0 mt-5 p-0"
        style={{
          // minHeight: "10vh",
          width: "100%",

          backgroundColor: "#20212F",
        }}
      >
        {/* <div className="content has-text-centered is-size-7-mobile is-size-6-desktop is-size-6-tablet p-0 m-0">
          <p>
            © 2023-{currentYear}{" "}
            <strong>Dinas Pemuda Dan Olahraga Kota Manado</strong>
          </p>
        </div> */}
        <div
          className="columns p-3 mb-0"
          style={{ paddingBottom: "0px", alignItems: "center" }}
        >
          <div className="column is-one-third-desktop is-one-third-tablet is-full-mobile ">
            <div className="is-flex is-justify-content-center">
              <div className="">
                <div className="is-flex is-justify-content-center">
                  <img src={Logopplpd} alt="" style={{ width: "100px" }} />
                </div>
                <label htmlFor="" className="has-text-grey">
                  Sistem Informasi Atlet PPLPD
                </label>
              </div>
            </div>
          </div>
          <div className="column">
            <p className="label has-text-grey-light">Tentang Kami</p>
            <ul className="has-text-grey ml-2 ">
              <li>Anisya Rengkuan - Project Manager</li>
              <li>Gwent Labada - System Analyst</li>
              <li>Julinda Rondunuwu - Designer</li>
              <li>Uria Dutu - Programmer</li>
            </ul>
          </div>
          <div className="column">
            <p className="label has-text-grey-light">Kontak Kami</p>
            <ul className="has-text-grey ml-2 ">
              <li>Nisa</li>
              <li>Gwent</li>
              <li>Inda</li>
              <li>Uria</li>
            </ul>
          </div>
        </div>
        <div className="p-3 pt-0">
          <p className="has-text-grey">
            © 2023-{currentYear}{" "}
            <strong className="has-text-grey">
              Dinas Pemuda Dan Olahraga Kota Manado
            </strong>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
