import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../img/Logosiatlet.png";
import Dispora from "../img/Dispora.png";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import Sidebarres from "./SidebarRes";

import {
  IoAlbums,
  IoBook,
  IoChatbox,
  IoFootball,
  IoHome,
  IoLogOut,
  IoPerson,
  IoSettings,
} from "react-icons/io5";
import { GiSprint } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";
import { LogOut, reset } from "../features/authSlice";
import { MdContactPage } from "react-icons/md";

const Navbar = () => {
  const isMobile = useMediaQuery({ query: "(max-device-width: 768px)" });
  const { user } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  const idCabor = user && user.Cabor && user.Cabor.id_cabor;

  return (
    <div>
      <nav
        className={`navbar is-fixed-top has-shadow`}
        role="navigation"
        aria-label="main navigation"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="navbar-brand">
          {isMobile && (
            <div
              className="is-flex is-justify-content-space-between "
              style={{ minWidth: "100%" }}
            >
              <div className="">
                <button
                  className={`navbar-burger burger ${
                    isActive ? "is-active" : ""
                  }`}
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={handleBurgerClick} //
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div
                id="navbarBasicExample"
                className={`navbar-menu ${isActive ? "is-active" : ""}`}
              >
                <div className="navbar-start">
                  <aside className={`menu pl-3 pt-2 has-shadow`}>
                    <p className="menu-label">General</p>
                    <ul className="menu-list">
                      <li>
                        <NavLink to={"/dashboard"}>
                          <IoHome /> Dashboard
                        </NavLink>
                        {/* {user && user.role !== "SuperAdmin" && (
              <NavLink to={"/pengumuman"}>
                <HiSpeakerphone /> Pengumuman
              </NavLink>
            )} */}
                        {user && user.role !== "SuperAdmin" && (
                          <NavLink to={"/forum"}>
                            <IoChatbox /> Forum
                          </NavLink>
                        )}
                        {user && user.role === "Pelatih" && (
                          <NavLink to={`/lisensi/${user && user.uuid}`}>
                            <MdContactPage /> Lisensi
                          </NavLink>
                        )}
                      </li>
                      <ul className="menu-list">
                        {user && user.role === "Admin" && (
                          <li>
                            <NavLink to={"/cabor"}>
                              <IoAlbums /> Cabang Olahraga
                            </NavLink>
                          </li>
                        )}
                        {user && user.role === "Atlet" && (
                          <li>
                            <NavLink to={"/datadiriatlet"}>
                              <IoPerson /> Data Atleth
                            </NavLink>
                            {/* <NavLink to={"/clubatlet"}>
                  <IoFootball /> Club
                </NavLink> */}
                            <NavLink
                              to={`/perkembangan-latihan/${
                                user && user.id_atlet
                              }`}
                            >
                              <GiSprint /> Perkembangan Latihan
                            </NavLink>
                            <NavLink
                              to={`/cabor/program/${
                                user && user.Cabor && user.Cabor.id_cabor
                              }`}
                            >
                              <TbBarbell /> Program Latihan
                            </NavLink>
                          </li>
                        )}
                      </ul>
                    </ul>
                    {user && user.role === "Admin" && (
                      <div>
                        <p className="menu-label">Admin</p>
                        <ul className="menu-list">
                          <li>
                            <NavLink to={"/panduan"}>
                              <IoBook /> Panduan Pelaksanaan
                            </NavLink>
                            <p className="pl-3 is-size-9">Users</p>
                          </li>
                          <ul className="menu-list pl-2">
                            <li>
                              {user && user.role !== "Pelatih" && (
                                <div className="">
                                  <NavLink to={"/daftaradmin"}>
                                    <IoPerson /> Admin
                                  </NavLink>

                                  <NavLink to={"/daftarpelatih"}>
                                    <IoPerson /> Pelatih
                                  </NavLink>
                                </div>
                              )}
                              <NavLink to={"/daftaratlet"}>
                                <IoPerson /> Atlet
                              </NavLink>
                            </li>
                            <ul className="menu-list mt-3">
                              <li className="pl-1">
                                <p>Control</p>
                              </li>
                              <ul className="menu-list">
                                <li>
                                  <NavLink to={"/kontrolatlet"}>
                                    <IoSettings /> Pengaturan Akun
                                  </NavLink>
                                </li>
                              </ul>
                            </ul>
                          </ul>
                        </ul>
                      </div>
                    )}
                    {user && user.role === "Pelatih" && (
                      <div>
                        <p className="menu-label">Pelatih</p>
                        <ul className="menu-list">
                          <NavLink to={"/datadiripelatih"}>
                            <IoPerson /> Data Pelatih
                          </NavLink>
                          {/* <NavLink to={"/clubatlet"}>
                <IoFootball /> Club
              </NavLink> */}
                          <li>
                            <p className="pl-3 is-size-9">Users</p>
                          </li>
                          <ul className="menu-list pl-2">
                            <li>
                              <NavLink to={"/daftaratlet-cabor"}>
                                <IoPerson /> Atlet
                              </NavLink>
                            </li>
                            <ul className="menu-list mt-3">
                              <li className="pl-1">
                                <p>Control</p>
                              </li>
                              <ul className="menu-list">
                                <li>
                                  <NavLink
                                    to={`/cabor/komponen-indikator/atur/${idCabor}`}
                                  >
                                    <IoSettings /> Pengaturan Cabor
                                  </NavLink>
                                </li>
                              </ul>
                            </ul>
                          </ul>
                        </ul>
                      </div>
                    )}

                    {user && user.role === "SuperAdmin" && (
                      <div>
                        <p className="menu-label">Admin</p>
                        <ul className="menu-list">
                          <li>
                            <p className="pl-3 is-size-9">Users</p>
                          </li>
                          <ul className="menu-list pl-2">
                            <li>
                              <NavLink to={"/daftaradmin"}>
                                <IoPerson /> Admin
                              </NavLink>
                            </li>
                          </ul>
                        </ul>
                      </div>
                    )}
                    <p className="menu-label">Settings</p>
                    <ul className="menu-list">
                      <li className="pl-3">
                        <button
                          onClick={logout}
                          className="button is-ghost pl-0 text-balck has-text-black"
                        >
                          <IoLogOut /> Log Out
                        </button>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>

              {user && user.role === "Atlet" && (
                <div className="columns is-mobile is-vcentered mr-4">
                  <div className=" is-flex is-align-items-center is-justify-content-end mr-4 is-full-mobile is-hidden-desktop">
                    <Link to="/">
                      <img
                        src={Logo}
                        alt="logoApk"
                        width={70}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                </div>
              )}
              {user && user.role === "Pelatih" && (
                <div className="columns is-mobile is-vcentered mr-4">
                  <div className=" is-flex is-align-items-center is-justify-content-end mr-4 is-full-mobile is-hidden-desktop">
                    <Link to="/">
                      <img
                        src={Logo}
                        alt="logoApk"
                        width={70}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                </div>
              )}

              {user && user.role === "Admin" && (
                <div className=" is-flex is-align-items-center mr-4">
                  <p>{user.nama} -</p>
                  <label htmlFor="" className="label ml-1">
                    {" "}
                    Admin
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="navbar-menu p-0">
            <img
              className="ml-2"
              src={Logo}
              alt=""
              width={80}
              style={{ objectFit: "cover" }}
            />
            <div className="navbar-end">
              <div className="navbar-item is-flex is-align-items-center p-0 pr-3">
                {user && user.role === "Atlet" && (
                  <div className=" is-flex is-align-items-center is-justify-content-end mr-4 is-full-mobile is-hidden-desktop">
                    <img
                      src={Logo}
                      alt="logoApk"
                      width={80}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                {user && user.role === "Admin" && (
                  <div className=" is-flex is-align-items-center mr-4">
                    <p>{user.nama} -</p>
                    <label htmlFor="" className="label ml-1">
                      {" "}
                      Admin
                    </label>
                  </div>
                )}
                <img src={Dispora} alt="" />
              </div>
            </div>
          </div>
        )}
      </nav>
      {isActive && <Sidebarres />}
    </div>
  );
};

export default Navbar;
