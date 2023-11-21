import React from 'react'
import { Link } from 'react-router-dom';

const PelatihCabor = () => {
  return (
    <div>
      <h1 className="title">Pelatih</h1>
      <h2 className="subtitle">List Pelatih</h2>
      <div className="is-flex mb-3">
         <Link to={"/cabor"} className='button is-dark'>Kembali</Link>
         <Link className='button is-success ml-3'>Tambah Lisensi</Link>
      </div>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>No HP</th>
            <th>Email</th>
            <th>Lisensi</th>
            <th>Aksi</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default PelatihCabor
