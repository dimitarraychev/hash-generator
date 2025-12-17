import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Sha256 from "./components/Sha256/Sha256";
import Sha1 from "./components/Sha1/Sha1";

function App() {
  return (
    <div className="app">
      <Header />

      <SideMenu />

      <div className="app-body">
        <Routes>
          <Route path="/sha1" element={<Sha1 />} />
          <Route path="/sha256" element={<Sha256 />} />
          <Route path="/" element={<p>Please select</p>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
