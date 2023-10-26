import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./component/Login";
import Admin from "./pages/Admin";
import Cabor from "./pages/Cabor";
import Pelatih from "./pages/Pelatih";
import Atlet from "./pages/Atlet";
import Addadmin from "./pages/Addadmin";
import Editadmin from "./pages/Editadmin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daftaradmin" element={<Admin />} />
          <Route path="/cabor" element={<Cabor />} />
          <Route path="/daftarpelatih" element={<Pelatih />} />
          <Route path="/daftaratlet" element={<Atlet />} />
          <Route path="/daftaradmin/tambah" element={<Addadmin />} />
          <Route path="/daftaradmin/edit/:id" element={<Editadmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
