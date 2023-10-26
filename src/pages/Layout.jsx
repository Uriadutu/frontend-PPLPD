import React from 'react';
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div
          className="column is-2 "
          style={{ width: "240px", boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.3)" }}
        >
          <Sidebar />
        </div>
        <div
          className="column "
          style={{
            background: "#D5D5D5",
          }}
        >
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout
