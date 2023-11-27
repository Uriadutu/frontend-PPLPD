import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {loginUser, reset} from "../features/authSlice";
import Bg from "../img/Background.png";
import Logo_pl from "../img/PPLPDlogo.png";
import Dispora from "../img/Dispora.png";


const lebar = 100; 
const tinggi = lebar * (9 / 16);
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {user, isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.auth
  );

  useEffect(()=>{
    if(user || isSuccess){
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) =>{
  e.preventDefault();
  dispatch(loginUser({username, password}));

  };

  return (
    <section
      className="hero is-fullheight is-fullwidth"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="judul mb-6">
            <div className="is-flex">
              <img
                className="mt-0"
                src={Dispora}
                alt=""
                style={{ width: `${lebar}px`, height: `${tinggi}px` }}
              />
            </div>
            <p className="" style={{ color: "white", fontSize: "30px" }}>
              Dinas Pemuda Dan Olahraga
            </p>
          </div>
          <div className="columns is-center">
            <div className="column is-4">
              <form
                onSubmit={Auth}
                className="box "
                style={{
                  background:
                    "rgba(255, 255, 255, 0.2)" /* Latar belakang transparan */,
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5)" /* Efek bayangan */,
                  borderRadius: "10px" /* Sudut elemen */,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="logo has-text-centered">
                  <img src={Logo_pl} alt="" style={{ width: "150px" }} />
                  <p style={{ color: "white" }}>Sistem Informasi Atlet PPLPD</p>
                </div>
                {isError && (
                  <div className="erro is-flex is-justify-content-center">
                    <p
                      className=""
                      style={{
                        padding: "1px 5px",
                        background: "red",
                        color: "white",
                        position: "absolute",
                        fontSize: "15px",
                      }}
                    >
                      {message}
                    </p>
                  </div>
                )}
                <div className="field mt-6">
                  <label
                    htmlFor=""
                    className="label"
                    style={{ color: "white" }}
                  >
                    Username
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label
                    htmlFor=""
                    className="label"
                    style={{ color: "white" }}
                  >
                    Password
                  </label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-6">
                  <button
                    type="submit"
                    className="button is-danger is-fullwidth"
                    style={{ background: "#FC0101" }}
                  >
                    {isLoading ? "Loading..." : "Masuk"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login
