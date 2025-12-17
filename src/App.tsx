import { Routes, Route, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import SHA256Section from "./components/SHA256Section/SHA256Section";
import SHA1Section from "./components/SHA1Section/SHA1Section";
import ConverterSection from "./components/ConverterSection/ConverterSection";
import {
  base64Converter,
  hexConverter,
  urlConverter,
} from "./utils/converters";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app-body">
        <SideMenu />

        <Routes>
          <Route path="/" element={<p>Please select</p>} />
          <Route path="/sha1" element={<SHA1Section />} />
          <Route path="/sha256" element={<SHA256Section />} />

          <Route
            path="/hex"
            element={
              <ConverterSection title="Hex" converterFn={hexConverter} />
            }
          />
          <Route
            path="/base64"
            element={
              <ConverterSection title="Base64" converterFn={base64Converter} />
            }
          />
          <Route
            path="/url"
            element={
              <ConverterSection title="URL" converterFn={urlConverter} />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />

      <ToastContainer
        position="top-right"
        theme="dark"
        transition={Bounce}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}

export default App;
