import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Adminlist = () => {
  const [adminn, setAdmin] = useState([]);

  useEffect(()=>{
    getAdmin();
  }, []);

  const getAdmin = async () => {
    const response = await axios.get('http://localhost:5000/admin');
    setAdmin(response.data);
  };

  const deleteAdmin = async (adminId) =>{ 
    await axios.delete(`http://localhost:5000/admin/${adminId}`);
    getAdmin();
  }

  return (
    <div>
      <h1 className="title">Admin</h1>
      <h2 className="subtitle">List Admin</h2>
      <div className="is-flex">
        <Link to={"/daftaradmin/tambah"} className="button mb-3 is-success">
          Tambah
        </Link>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}>
          {adminn.map((admin, index) => (
            <tr key={admin.uuid} className="">
              <td>{index + 1}</td>
              <td>{admin.nama}</td>
              <td>{admin.no_hp}</td>
              <td>
                <Link
                  to={`/daftaradmin/edit/${admin.uuid}`}
                  className="is-info is-small button mr-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteAdmin(admin.uuid)}
                  className="is-info is-small button"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adminlist
