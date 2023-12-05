import React from 'react';
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import {useMediaQuery} from "react-responsive";
const Layout = ({children}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        {isMobile ? null : (
          <div
            className="column is-2 "
            style={{
              width: "240px",
              boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Sidebar />
          </div>
        )}

        <div
          className="column pl-3"
          style={{
            background: "#e7e7e7",
          }}
        >
          <main className="" style={{ minHeight: "100vh", maxWidth: "100%" }}>
            {children}
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout
