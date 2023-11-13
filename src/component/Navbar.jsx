import React from 'react'
import {NavLink} from "react-router-dom";
import Logo from "../img/Logosiatlet.png";
import Dispora from "../img/Dispora.png"
import {useMediaQuery} from "react-responsive";

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div>
      <nav
        className={`navbar is-fixed-top has-shadow`}
        role="navigation"
        aria-label="main navigation"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="navbar-brand">
          <div className="logo" style={{ paddingLeft: "50px" }}>
            {isMobile ? (
              <button
                className={`navbar-burger burger`}
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </button>
            ) : (
              <img
                src={Logo}
                alt=""
                width={80}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </div>
{!isMobile &&
        <div className="navbar-menu ">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                  <img src={Dispora} alt="" />
              </div>
            </div>
          </div>
        </div>
}
      </nav>
    </div>
  );
};

export default Navbar
