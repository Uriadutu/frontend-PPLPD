import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiSpeakerphone } from "react-icons/hi";
import {
  IoPerson,
  IoHome,
  IoLogOut,
  IoBook,
  IoAlbums,
  IoChatbox,
  IoSettings,
  IoFootball,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { useMediaQuery } from "react-responsive";
import { GiSprint } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";
import { MdContactPage } from "react-icons/md";

const Sidebarres = () => {
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

  const idCabor = user && user.Cabor && user.Cabor.id_cabor;

  return (
    <div>
      <aside
        className={`menu pl-3 pt-2 has-shadow`}
      >
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
                  <IoPerson /> Data Atlet
                </NavLink>
                <NavLink to={"/clubatlet"}>
                  <IoFootball /> Club
                </NavLink>
                <NavLink to={`/perkembangan-latihan/${user && user.id_atlet}`}>
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
              <NavLink to={"/clubatlet"}>
                <IoFootball /> Club
              </NavLink>
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
                      <NavLink to={`/cabor/komponen-indikator/atur/${idCabor}`}>
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
            <button onClick={logout} className="button is-white pl-0">
              <IoLogOut /> Log Out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebarres;
