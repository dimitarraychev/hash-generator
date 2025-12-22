import { Routes, Route, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
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
      <div className="app-body">
        <SideMenu />

        <Routes>
          <Route
            path="/"
            element={
              <h3 style={{ color: "var(--light-gray)" }}>
                Choose a Tool to Get Started
              </h3>
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
          <Route
            path="/sha512"
            element={<HashSection key="sha512" algorithm="SHA-512" />}
          />
          <Route path="/key" element={<GenerateSection />} />
          <Route path="/json" element={<FormatSection />} />

          <Route
            path="/hex"
            element={
              <ConvertSection
                key="hex"
                title="Convert Hex"
                convertFn={hexConverter}
              />
            }
          />
          <Route
            path="/base64"
            element={
              <ConvertSection
                key="base64"
                title="Convert Base64"
                convertFn={base64Converter}
              />
            }
          />
          <Route
            path="/url"
            element={
              <ConvertSection
                key="url"
                title="Convert URL"
                convertFn={urlConverter}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        theme="dark"
        transition={Bounce}
        autoClose={2000}
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
