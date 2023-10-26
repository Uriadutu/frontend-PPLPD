import React from "react";

const Formeditadmin = () => {
  return (
    <div>
      <h1 className="title">Admin</h1>
      <h2 className="subtitle">Perbaharui Admin</h2>
      <div className="card is-shadowless">
        <div
          className="card-content"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
        >
          <div className="content">
            <form>
              <div className="field">
                <label htmlFor="" className="label">
                  Nama
                </label>
                <div className="control">
                  <input type="text" className="input" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Username
                </label>
                <div className="control">
                  <input type="text" className="input" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Password
                </label>
                <div className="control">
                  <input type="password" className="input" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Konfirmasi Password
                </label>
                <div className="control">
                  <input type="password" className="input" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-dark mr-3">Batal</button>
                  <button className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formeditadmin;
