import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./component/Login";
import Admin from "./pages/Admin";
import Cabor from "./pages/Cabor";
import Pelatih from "./pages/Pelatih";
import Atlet from "./pages/Atlet";
import Addadmin from "./pages/Addadmin";
import Editadmin from "./pages/Editadmin";
import PanduanPelaksanaan from "./pages/PanduanPelaksanaan";
import AtletCaborlist from "./pages/AtletCaborlist";
import Akun from "./pages/Akun";
import Perkembangan from "./pages/latihan/Perkembangan";
import PageIndikator from "./pages/latihan/komponen/PageIndikator";
import PengaturanIndikator from "./pages/latihan/komponen/Pengaturanindikator";
import RecordLatihan from "./pages/latihan/RecordLatidan";
import IndikatorList from "./pages/latihan/komponen/IndikatorList";
import AkunHak from "./pages/AkunHak";
import Program from "./pages/Program";
import DataDiri from "./pages/latihan/Atlet/DataDiri";
import ListPelatihCabor from "./pages/Pelatih/ListPelatihCabor";
import PageForum from "./pages/Forum-Pages/PageForum";
import DataForum from "./pages/Forum-Pages/DataForum";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forum" element={<PageForum />} />
          <Route path="/forum/:id" element={<DataForum />} />
          <Route path="/daftaradmin" element={<Admin />} />
          <Route path="/datadiriatlet" element={<DataDiri />} />
          <Route path="/cabor" element={<Cabor />} />
          <Route path="/daftarpelatih" element={<Pelatih />} />
          <Route path="/cabor/atlet/:id" element={<Atlet />} />
          <Route path="/cabor/pelatih/:id" element={<ListPelatihCabor />} />
          <Route path="/daftaradmin/tambah" element={<Addadmin />} />
          <Route path="/daftaradmin/edit/:id" element={<Editadmin />} />
          <Route path="/panduan" element={<PanduanPelaksanaan />} />
          <Route path="/daftaratlet" element={<AtletCaborlist />} />
          <Route path="/akunsaya" element={<Akun />} />
          <Route path="/kontrolatlet" element={<AkunHak />} />
          <Route path="/cabor/program/:id" element={<Program />} />
          <Route path="/cabor/atlet/:id/:id" element={<Perkembangan />} />
          <Route path="/cabor/komponen-indikator" element={<PageIndikator />} />
          <Route
            path="/cabor/komponen-indikator/atur/:id"
            element={<PengaturanIndikator />}
          />
          <Route 
            path="/cabor/atlet/:id/:id/tambah-perkembangan-latihan/:id"
            element={<RecordLatihan />}
          />
          <Route 
            path="cabor/komponen-indikator/atur/:id/cabor/komponen-indikator/atur/:id"
            element={<IndikatorList />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
