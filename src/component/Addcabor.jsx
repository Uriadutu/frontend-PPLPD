import React, { useEffect } from "react";

function Addcabor() {
  useEffect(() => {
    const image = document.querySelector(".gambar img");
    const input = document.querySelector(".masukan");

    input.addEventListener("change", () => {
      image.src = URL.createObjectURL(input.files[0]);
    });
  }, []);

  return (
    <div className="is-flex is-justify-content-center is-align-items-center is-vcentered">
      <div
        className="card-content has-background-white"
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: "200px",
          width: "800px",
        }}
      >
        <div className="content">
          <form>
            <p>Tambah Cabang Olahraga</p>
            <div className="box is-flex columns is-justify-content-space-between">
              <div className="komp">
                <div className="field">
                  <label htmlFor="namaCabang" className="label">
                    Nama Cabang Olahraga
                  </label>
                  <div className="control">
                    <input type="text" className="input" id="namaCabang" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="iconCabang" className="label">
                    Kode Cabang Olahraga
                  </label>
                  <div className="control">
                    <input type="text" className="input" id="kodeCabang" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="iconCabang" className="label">
                    Icon Cabang Olahraga
                  </label>
                  <div className="control">
                    <input type="file" className=" masukan" id="iconCabang" />
                  </div>
                </div>
              </div>
              <div className="gambar">
                <div className="">
                  <label className="label">Logo : png</label>
                </div>
                <img
                  src=""
                  className=""
                  style={{
                    objectFit: "cover",
                    width: "220px",
                    height: "220px",
                    borderRadius: "10px",
                  }}
                  alt="Logo"
                />
              </div>
            </div>
            <div className="">
              <button className="button is-dark" style={{ height: "30px" }}>
                Batal
              </button>
              <button
                className="button is-success ml-4"
                style={{ height: "30px" }}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addcabor;
