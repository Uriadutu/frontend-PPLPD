import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useMediaQuery } from "react-responsive";

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
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        {isMobile ? null : (
          <div
            className="column is-2 "
            style={{
              width: "240px",
              // boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Sidebar />
          </div>
        )}

        <div
          className="column pl-3 p-0"
          style={{
            background: "#e7e7e7",
          }}
        >
          <main className="" style={{ minHeight: "100vh", maxWidth: "100%" }}>
            {children}
          </main>
        </div>
      </div>
      

      <div className="mt-5"
          style={{
            minHeight: "10vh",
            maxWidth: "100%",
            background: "white",
          }}>
        <div className="content has-text-centered is-size-7-mobile is-size-6-desktop is-size-6-tablet">
          <p>
          © 2023-{currentYear} <strong>Dinas Pemuda Dan Olahraga Kota Manado</strong> 

          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
