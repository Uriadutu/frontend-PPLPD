import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { UseSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Formaddadmin = () => {
  const [nama, setNama] = useState("");
  const [noHp, setnoHp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Kembali = ()=> {
    navigate("/daftaradmin");
  }

  const saveAdmin = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/admin', {
        nama : nama,
        no_hp : noHp,
        username : username,
        password : password,
        confPassword : confPassword
      });
      navigate("/daftaradmin");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      <h1 className="title">Admin</h1>
      <h2 className="subtitle">Tambah Admin</h2>
      <div className="card is-shadowless">
        <div
          className="card-content"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
        >
          <div className="content">
            <form onSubmit={saveAdmin}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label htmlFor="" className="label">
                  Nama
                </label>
                <div className="control">
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Nomor Handphone
                </label>
                <div className="control">
                  <input
                    value={noHp}
                    onChange={(e) => setnoHp(e.target.value)}
                    type="text"
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Username
                </label>
                <div className="control">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Konfirmasi Password
                </label>
                <div className="control">
                  <input
                    value={confPassword}
                    onChange={(e) => setconfPassword(e.target.value)}
                    type="password"
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button onClick={Kembali} className="button is-dark mr-3">Batal</button>
                  <button type='submit' className="button is-success">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formaddadmin
