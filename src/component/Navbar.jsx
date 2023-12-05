import React from 'react'
import {Link, NavLink} from "react-router-dom";
import Logo from "../img/Logosiatlet.png";
import Dispora from "../img/Dispora.png"
import {useMediaQuery} from "react-responsive";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const {user} = useSelector((state) => state.auth);

  return (
    <div>
      <nav
        className={`navbar is-fixed-top has-shadow has-background-`}
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
        {!isMobile && (
          <div className="navbar-menu ">
            <div className="navbar-end">
              <div className="navbar-item is-flex is-align-items-center p-0">
                {user && user.role === "Atlet" && (
                  <div className=" is-flex is-align-items-center mr-4">
                    <img
                      className="mr-2"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        aspectRatio: "1/1",
                      }}
                      src={user && user.url}
                      alt=""
                    />
                    <Link to={"/datadiriatlet"} className="has-text-dark">
                      {user && user.name_awal} {user && user.nama_tengah}{" "}
                      {user && user.nama_akhir} -{" "}
                    </Link>
                    <label className="label ml-1 "> Atlet</label>
                  </div>
                )}
                <img src={Dispora} alt="" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar
