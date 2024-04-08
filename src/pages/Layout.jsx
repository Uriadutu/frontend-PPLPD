import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useMediaQuery } from "react-responsive";
import BackgroundTop from "../img/bgDs.png";
import bghp from "../img/bgHp.png";
import Footer from "../component/Footer";

const Layout = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
          className="column p-0 m-0 pl-3 is-hidden-mobile"
          style={{
            backgroundImage: `url(${BackgroundTop})`,
            //   backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
          }}
        >
          <main className="" style={{ minHeight: "100vh", Width: "100%" }}>
            {children}
          </main>
        </div>
        <div
          className="column p-0 m-0 pl-3 is-hidden-desktop"
          style={{
            backgroundImage: `url(${bghp})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            // background: "white",
            backgroundPosition: "center",
          }}
        >
          <main
            className=""
            style={{
              minHeight: "100vh",
              Width: "100%",

            }}
          >
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
