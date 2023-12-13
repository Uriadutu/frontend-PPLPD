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
import ListAtletPelatih from "./pages/Pelatih/ListAtletPelatih";
import IndikatorListPage from "./pages/latihan/IndikatorListPage";
import PengaturanAkun from "./pages/Pengaturan/PengaturanAkun";
import Club from "./pages/Club";
import IsiClubAtlet from "./pages/IsiClubAtlet";
import DataDiriPelatih from "./pages/Pelatih/DataDiriPelatih";
import ForumCabor from "./pages/Forum-Cabor/ForumCabor";
import IsiForumPage from "./pages/Forum-Cabor/IsiForumPage";
import PerkembanganAtlet from "./pages/latihan/Atlet/PerkembanganAtlet";
import IsiKomentarPage from "./pages/Forum-Cabor/IsiKomentarPage";
import PageLisensi from "./pages/Pelatih/PageLisensi";
import LisensiPelatih from "./pages/Pelatih/LisensiPelatih";
import DataDiriPelatihPage from "./pages/Pelatih/DataPelatihPage";
import PageEditAtletList from "./pages/PageEditAtletList";
import PageEditPelatihList from "./pages/PageEditPelatihList";
import PageAtletClub from "./pages/PageAtletClub";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pengumuman" element={<PageForum />} />
          <Route path="/forum" element={<ForumCabor />} />
          <Route path="/forum/cabor/:idCabor" element={<IsiForumPage />} />
          <Route path="/forum/cabor/komentar/:idCabor/:idAtlet" element={<IsiKomentarPage />} />
          <Route path="/pengumuman/:id" element={<DataForum />} />
          <Route path="/daftaradmin" element={<Admin />} />
          <Route path="/datadiriatlet" element={<DataDiri />} /> 
          <Route path="/datadiripelatih" element={<DataDiriPelatihPage />} /> 
          <Route path="/cabor" element={<Cabor />} />
          <Route path="/clubatlet" element={<PageAtletClub />} />
          <Route path="/daftarpelatih" element={<Pelatih />} />
          <Route path="/cabor/atlet/:id" element={<Atlet />} />
          <Route path="/cabor/atlet/:id/edit/:idAtlet" element={<PageEditAtletList />} />
          <Route path="/cabor/pelatih/:id/edit/:idAtlet" element={<PageEditPelatihList />} />
          <Route path="/cabor/pelatih/:id" element={<ListPelatihCabor />} />
          <Route path="/daftaradmin/tambah" element={<Addadmin />} />
          <Route path="/daftaradmin/edit/:id" element={<Editadmin />} />
          <Route path="/panduan" element={<PanduanPelaksanaan />} />
          <Route path="/daftaratlet" element={<AtletCaborlist />} />
          <Route path="/daftaratlet-cabor" element={<ListAtletPelatih />} />
          <Route path="/akunsaya" element={<Akun />} />
          <Route path="/kontrolatlet" element={<AkunHak />} />
          <Route path="/kontrolatlet/:idCabor" element={<PengaturanAkun />} />
          <Route path="/cabor/atlet/:id/:uuid" element={<Perkembangan />} />
          <Route
            path="/cabor/pelatih/:idcabor/:uuid"
            element={<DataDiriPelatih />}
          />
          <Route
            path="/cabor/pelatih/:idcabor/:uuid/lisensi/:idPelatih"
            element={<PageLisensi />}
          />
          <Route
            path="/lisensi/:uuid"
            element={<LisensiPelatih />}
          />
          <Route path="/cabor/program/:id" element={<Program />} />
          <Route path="/cabor/club/:id" element={<Club />} />
          <Route
            path="/cabor/club/:idCabor/:idClub"
            element={<IsiClubAtlet />}
          />
          <Route path="/cabor/komponen-indikator" element={<PageIndikator />} />
          <Route
            path="/perkembangan-latihan/:idAtlet"
            element={<PerkembanganAtlet />}
          />
          <Route
            path="/cabor/komponen-indikator/atur/:id"
            element={<PengaturanIndikator />}
          />
          <Route
            path="/cabor/atlet/:idCabor/:uuid/tambah-perkembangan-latihan/:id"
            element={<RecordLatihan />}
          />
          <Route
            path="cabor/komponen-indikator/atur/:id/cabor/komponen-indikator/atur/:id"
            element={<IndikatorList />}
          />
          <Route
            path="/komponen-indikator/:uuid/:idAtlet/:id"
            element={<IndikatorListPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
