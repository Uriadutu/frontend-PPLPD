import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {IoPerson, IoHome, IoLogOut, IoBook, IoAlbums} from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { useMediaQuery } from 'react-responsive';


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const isDesktop = useMediaQuery({ minWidth: 769 });

  if (!isDesktop) {
    // Sidebar hanya ditampilkan untuk layar desktop
    return null;
  }

  return (
    <div>
      <aside
        className={`menu pl-3 pt-2 has-shadow`}
        style={{
          position: "fixed",
        }}
      >
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>

            <p className="pl-3 is-size-9" style={{ padding: "10px 0px 5px" }}>
              PPLPD
            </p>
          </li>
          <ul className="menu-list pl-2">
            <li>
              <NavLink to={"/cabor"}>
                <IoAlbums /> Cabang Olahraga
              </NavLink>
              {user && user.role === "Admin" && (
                <NavLink to={"/panduan"}>
                  <IoBook /> Panduan Pelaksanaan
                </NavLink>
              )}
            </li>
          </ul>
        </ul>
        {user && user.role === "Admin" && (
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
                  <NavLink to={"/daftarpelatih"}>
                    <IoPerson /> Pelatih
                  </NavLink>
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
                        <IoPerson /> Pengaturan Akun
                      </NavLink>
                    </li>
                  </ul>
                </ul>
              </ul>
            </ul>
          </div>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          {user && user.role === "Atlet" && (
            <div className="">
              <li>
                <p className="pl-3 is-size-9">Privasi</p>
              </li>
              <ul className="menu-list pl-2">
                <li>
                  <NavLink to={"/akunsaya"}>
                    <IoPerson /> Akun saya
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <li className="pl-3">
            <button onClick={logout} className="button is-white pl-0">
              <IoLogOut /> Log Out
            </button>
          </li>
        </ul>
      </aside>
     
    </div>
  );
};

export default Sidebar
