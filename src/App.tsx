import { Routes, Route, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import ConvertSection from "./components/ConvertSection/ConvertSection";
import {
  base64Converter,
  hexConverter,
  urlConverter,
} from "./utils/converters";
import GenerateSection from "./components/GenerateSection/GenerateSection";
import FormatSection from "./components/FormatSection/FormatSection";
import HashSection from "./components/HashSection/HashSection";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app-body">
        <SideMenu />

        <Routes>
          <Route
            path="/"
            element={
              <h2 style={{ color: "var(--light-gray)" }}>
                Choose a Tool to Get Started
              </h2>
            }
          />
          <Route
            path="/sha1"
            element={<HashSection key="sha1" algorithm="SHA-1" />}
          />
          <Route
            path="/sha256"
            element={<HashSection key="sha256" algorithm="SHA-256" />}
          />
          <Route path="/key" element={<GenerateSection />} />
          <Route path="/json" element={<FormatSection />} />

          <Route
            path="/hex"
            element={
              <ConvertSection title="Convert Hex" convertFn={hexConverter} />
            }
          />
          <Route
            path="/base64"
            element={
              <ConvertSection
                title="Convert Base64"
                convertFn={base64Converter}
              />
            }
          />
          <Route
            path="/url"
            element={
              <ConvertSection title="Convert URL" convertFn={urlConverter} />
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
